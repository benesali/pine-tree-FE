import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import { apartmentsData } from "@/data/apartments";
import { toast } from "@/hooks/use-toast";
import { authHeader, getToken, removeToken } from "@/lib/auth";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const AdminCalendar = () => {
  const navigate = useNavigate();
  const [apartmentId, setApartmentId] = useState<number | null>(apartmentsData[0]?.id ?? null);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [clearLoading, setClearLoading] = useState(false);

  useEffect(() => {
    if (!getToken()) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleBlock = async () => {
    if (!dateRange?.from || !dateRange?.to || !apartmentId) {
      toast({ title: "Select apartment and date range" });
      return;
    }

    setLoading(true);
    try {
      const body = {
        apartment_id: apartmentId,
        date_from: format(dateRange.from, "yyyy-MM-dd"),
        date_to: format(dateRange.to, "yyyy-MM-dd"),
        note: note || null,
      };

      const res = await fetch("/admin/calendar/block", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...authHeader(),
        },
        body: JSON.stringify(body),
      });

      if (res.status === 401) {
        toast({ title: "Unauthorized", description: "Please login as admin" });
        removeToken();
        navigate("/admin/login");
        return;
      }

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        toast({ title: "Failed", description: data.detail || "Could not block range" });
        return;
      }

      toast({ title: "Blocked", description: `Blocked dates for apartment ${apartmentId}` });
      // Optionally refresh UI or fetch availability — for now navigate back
      navigate(`/apartment/${apartmentsData.find(a => a.id === apartmentId)?.slug}`);
    } catch (err) {
      toast({ title: "Network error" });
    } finally {
      setLoading(false);
    }
  };

  const handleClear = async () => {
    if (!dateRange?.from || !dateRange?.to || !apartmentId) {
      toast({ title: "Select apartment and date range" });
      return;
    }

    setClearLoading(true);
    try {
      const body = {
        apartment_id: apartmentId,
        date_from: format(dateRange.from, "yyyy-MM-dd"),
        date_to: format(dateRange.to, "yyyy-MM-dd"),
      };

      const res = await fetch("/admin/calendar/clear", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...authHeader(),
        },
        body: JSON.stringify(body),
      });

      if (res.status === 401) {
        toast({ title: "Unauthorized", description: "Please login as admin" });
        removeToken();
        navigate("/admin/login");
        return;
      }

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        toast({ title: "Failed", description: data.detail || "Could not clear range" });
        return;
      }

      toast({ title: "Cleared", description: `Cleared availability for apartment ${apartmentId}` });
      navigate(`/apartment/${apartmentsData.find(a => a.id === apartmentId)?.slug}`);
    } catch (err) {
      toast({ title: "Network error" });
    } finally {
      setClearLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-card rounded-2xl p-6 shadow-elevated">
            <h1 className="text-2xl font-semibold mb-4">Admin Calendar</h1>
            <p className="text-sm text-muted-foreground mb-4">Select an apartment and a date range to block (make unavailable).</p>

            <div className="mb-4">
              <label className="block text-sm font-medium text-muted-foreground mb-2">Apartment</label>
              <select value={apartmentId ?? undefined} onChange={(e) => setApartmentId(Number(e.target.value))} className="w-full border border-input rounded-lg p-3">
                {apartmentsData.map((a) => (
                  <option key={a.id} value={a.id}>{a.name}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-muted-foreground mb-2">Date range</label>
              <Calendar mode="range" selected={dateRange} onSelect={setDateRange} numberOfMonths={2} />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-muted-foreground mb-2">Note (optional)</label>
              <input className="w-full border border-input rounded-lg p-3" value={note} onChange={(e) => setNote(e.target.value)} />
            </div>

            <div className="flex items-center gap-4">
              <Button onClick={handleBlock} disabled={loading || clearLoading}>{loading ? "Blocking..." : "Block Range"}</Button>
              <Button variant="outline" onClick={handleClear} disabled={loading || clearLoading}>{clearLoading ? "Clearing..." : "Clear Range"}</Button>
              <Button variant="ghost" onClick={() => { removeToken(); navigate('/admin/login'); }}>Logout</Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default AdminCalendar;
