import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { setToken } from "@/lib/auth";

const FAKE_ADMIN = {
  email: "admin@local.dev",
  password: "admin123",
};

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  // try {
  //   // ✅ DEV fake login
  //   if (import.meta.env.DEV) {
  //     if (email === FAKE_ADMIN.email && password === FAKE_ADMIN.password) {
  //       setToken("fake-dev-token");
  //       toast({ title: "Logged in (DEV)", description: "Fake admin access" });
  //       navigate("/admin/calendar");
  //       return;
  //     }
  //   }
    console.log("ADMIN LOGIN SOURCE FILE LOADED", import.meta.url);

    console.log("LOGIN URL USED:", "/auth/login");

    // ⬇️ reálný backend login
    const res = await fetch("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      toast({
        title: res.status === 401 ? "Invalid credentials" : "Login failed",
      });
      return;
    }

    const data = await res.json();
    if (!data.access_token) {
      toast({ title: "Unexpected response" });
      return;
    }

    setToken(data.access_token);
    toast({ title: "Logged in", description: "Admin access granted" });
    navigate("/admin/calendar");

  } catch {
    toast({ title: "Network error" });
  } finally {
    setLoading(false);
  }
};


  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-card rounded-2xl p-6 shadow-elevated">
            <h1 className="text-2xl font-semibold mb-4">Admin Login</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Email</Label>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                <Label>Password</Label>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="flex items-center justify-between">
                <Button type="submit" disabled={loading}>
                  {loading ? "Logging in..." : "Log in"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default AdminLogin;
