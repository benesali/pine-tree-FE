import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { setToken } from "@/lib/auth";
import { apiPublic } from "@/lib/apiPublic"; 


const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    const data = await apiPublic<{ access_token: string }>(
      "/api/auth/login",
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
      }
    );

    if (!data?.access_token) {
      toast({ title: "Unexpected response from server" });
      return;
    }

    setToken(data.access_token);

    toast({
      title: "Logged in",
      description: "Admin access granted",
    });

    navigate("/admin/calendar");

  } catch (err: any) {
    if (err.message === "401") {
      toast({ title: "Invalid credentials" });
    } else {
      toast({ title: "Login failed" });
    }
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
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <Label>Password</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Logging in..." : "Log in"}
              </Button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default AdminLogin;
