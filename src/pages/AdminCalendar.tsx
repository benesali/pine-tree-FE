import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import { apartmentsData } from "@/data/apartments";
import { toast } from "@/hooks/use-toast";
import { removeToken } from "@/lib/auth";
import { apiAdmin } from "@/lib/apiAdmin";
import { apiPublic } from "@/lib/apiPublic";
import { format } from "date-fns";

// block not available
// reservred waiting payment
// booked paid
// clear cancell or so
type AdminAction = "block" | "reserve" | "book" | "clear";


const AdminCalendar = () => {
  const navigate = useNavigate();

  const [apartmentId, setApartmentId] = useState<number | null>(
    apartmentsData[0]?.id ?? null
  );
  const [action, setAction] = useState<AdminAction>("block");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [note, setNote] = useState("");

  const [blockedDates, setBlockedDates] = useState<Date[]>([]);
  const [loading, setLoading] = useState(false);
  const [calendarKey, setCalendarKey] = useState(0);

  /* ------------------------------------------------------------------ */
  /* CUSTOMER DATA                                    */
  /* ------------------------------------------------------------------ */
  const [customer, setCustomer] = useState({
  name: "",
  email: "",
  email2: "",
  phone: "",
  phone2: "",
  adults: 2,
  children_ages: [] as number[],
  extra_bed: false,
  note: "",
  dogs: 0,
});
const parseChildrenAges = (value: string): number[] =>
  value
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean)
    .map(Number)
    .filter((n) => !isNaN(n) && n >= 0);

  /* ------------------------------------------------------------------ */
  /* LOAD AVAILABILITY (PUBLIC READ)                                     */
  /* ------------------------------------------------------------------ */
  const loadAvailability = async () => {
    if (!apartmentId) return;

    const now = new Date();
    const from = `${now.getFullYear()}-01-01`;
    const to = `${now.getFullYear() + 2}-12-31`;

    try {
      const data = await apiPublic<any[]>(
        `/api/availability/${apartmentId}/availability?from=${from}&to=${to}`
      );

      const dates = data.map((r) => {
        const [y, m, d] = r.date.split("-").map(Number);
        return new Date(y, m - 1, d); // local date
      });

      setBlockedDates(dates);
    } catch {
      toast({ title: "Failed to load availability" });
    }
  };

  useEffect(() => {
    loadAvailability();
    setDateRange(undefined);
    setCalendarKey((k) => k + 1);
  }, [apartmentId]);

  /* ------------------------------------------------------------------ */
  /* VALIDATION + CONFIRM                                                */
  /* ------------------------------------------------------------------ */
  const requireSelection = () => {
    if (!dateRange?.from || !dateRange?.to || !apartmentId) {
      toast({ title: "Select apartment and date range" });
      return false;
    }
    return true;
  };

  const confirmAction = () => {
    const messageMap: Record<AdminAction, string> = {
      block: "Do you really want to BLOCK this date range?",
      clear: "Do you really want to CLEAR this date range?",
      reserve: "Do you really want to RESERVE this date range for this customer?",
      book: "Do you really want to BOOK this date range for this customer?",
    };

    return window.confirm(messageMap[action]);
  };

  /* ------------------------------------------------------------------ */
  /* SUBMIT                                                             */
  /* ------------------------------------------------------------------ */
  const handleSubmit = async () => {
    if (!requireSelection()) return;
    if (!confirmAction()) return;

    setLoading(true);

 
    try {

         const payload: any = {
        apartment_id: apartmentId,
        date_from: format(dateRange!.from!, "yyyy-MM-dd"),
        date_to: format(dateRange!.to!, "yyyy-MM-dd"),
      };

      if (action === "block") {
        payload.note = note || null;
      }

      if (action === "reserve" || action === "book") {
        payload.customer = {
          name: customer.name,
          email: customer.email,
          email2: customer.email2 || null,
          phone: customer.phone || null,
          phone2: customer.phone2 || null,
          adults: customer.adults,
          children_ages: customer.children_ages,
          extra_bed: customer.extra_bed,
          note: customer.note || null,
          dogs: customer.dogs,
        };
      }

      await apiAdmin(
        `/api/admin/calendar/${action}`,
        {
          method: "POST",
          body: JSON.stringify(payload),  
        }
      );

      toast({
          title:
            action === "block"
              ? "Blocked"
              : action === "clear"
              ? "Cleared"
              : action === "reserve"
              ? "Reserved"
              : "Booked",
        });

      await loadAvailability();
      setDateRange(undefined);
      setNote("");
      setCalendarKey((k) => k + 1);
    } catch (err: any) {
      if (err.message === "401") {
        removeToken();
        navigate("/admin/login");
      } else {
        toast({ title: "Action failed" });
      }
    } finally {
      setLoading(false);
    }
  };

  /* ------------------------------------------------------------------ */
  /* RENDER                                                             */
  /* ------------------------------------------------------------------ */
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-card rounded-2xl p-6 shadow-elevated">
            <h1 className="text-2xl font-semibold mb-4">Admin Calendar</h1>

            {/* Apartment */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Apartment
              </label>
              <select
                value={apartmentId ?? undefined}
                onChange={(e) => setApartmentId(Number(e.target.value))}
                className="w-full border rounded-lg p-3"
              >
                {apartmentsData.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Action switch */}
            <div className="flex gap-2 mb-4">
              <Button
                variant={action === "block" ? "default" : "outline"}
                onClick={() => {
                  setAction("block");
                  setDateRange(undefined);
                }}
              >
                Block
              </Button>

              <Button
                variant={action === "clear" ? "default" : "outline"}
                onClick={() => {
                  setAction("clear");
                  setDateRange(undefined);
                }}
              >
                Clear
              </Button>
              <Button
                variant={action === "reserve" ? "default" : "outline"}
                onClick={() => {
                  setAction("reserve");
                  setDateRange(undefined);
                }}
              >
                Reserve
              </Button>

              <Button
                variant={action === "book" ? "default" : "outline"}
                onClick={() => {
                  setAction("book");
                  setDateRange(undefined);
                }}
              >
                Book
              </Button>

              <Button
                variant="ghost"
                onClick={() => {
                  removeToken();
                  navigate("/admin/login");
                }}
              >
                Logout
              </Button>
            </div>

            {/* Calendar */}
            <Calendar
              key={calendarKey}
              mode="range"
              selected={dateRange}
              onSelect={setDateRange}
              modifiers={{ blocked: blockedDates }}
              modifiersClassNames={{
                blocked: "bg-muted text-muted-foreground line-through",
              }}
              numberOfMonths={2}
            />

            {/* Note */}
            {action === "block" && (
              <div className="my-4">
                <label className="block text-sm font-medium mb-2">
                  Note (optional)
                </label>
                <input
                  className="w-full border rounded-lg p-3"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
            )}

            {/* Customer Information */}  
            {(action === "reserve" || action === "book") && (
            <div className="my-6 space-y-4">
              <h2 className="text-lg font-medium">Customer details</h2>

              <input
                className="w-full border rounded-lg p-3"
                placeholder="Full name"
                value={customer.name}
                onChange={(e) =>
                  setCustomer({ ...customer, name: e.target.value })
                }
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  className="w-full border rounded-lg p-3"
                  placeholder="Primary email"
                  value={customer.email}
                  onChange={(e) =>
                    setCustomer({ ...customer, email: e.target.value })
                  }
                />

                <input
                  className="w-full border rounded-lg p-3"
                  placeholder="Secondary email (optional)"
                  value={customer.email2}
                  onChange={(e) =>
                    setCustomer({ ...customer, email2: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  className="w-full border rounded-lg p-3"
                  placeholder="Phone"
                  value={customer.phone}
                  onChange={(e) =>
                    setCustomer({ ...customer, phone: e.target.value })
                  }
                />

                <input
                  className="w-full border rounded-lg p-3"
                  placeholder="Secondary phone (optional)"
                  value={customer.phone2}
                  onChange={(e) =>
                    setCustomer({ ...customer, phone2: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  min={1}
                  className="w-full border rounded-lg p-3"
                  placeholder="Adults"
                  value={customer.adults}
                  onChange={(e) =>
                    setCustomer({ ...customer, adults: Number(e.target.value) })
                  }
                />

                <input
                  type="number"
                  min={0}
                  className="w-full border rounded-lg p-3"
                  placeholder="Dogs"
                  value={customer.dogs}
                  onChange={(e) =>
                    setCustomer({ ...customer, dogs: Number(e.target.value) })
                  }
                />
              </div>

              <input
                className="w-full border rounded-lg p-3"
                placeholder="Children ages (comma separated)"
                value={customer.children_ages.join(", ")}
                onChange={(e) =>
                  setCustomer({
                    ...customer,
                    children_ages: parseChildrenAges(e.target.value),
                  })
                }
              />

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={customer.extra_bed}
                  onChange={(e) =>
                    setCustomer({ ...customer, extra_bed: e.target.checked })
                  }
                />
                Extra bed
              </label>

              <textarea
                className="w-full border rounded-lg p-3"
                placeholder="Internal note (optional)"
                value={customer.note}
                onChange={(e) =>
                  setCustomer({ ...customer, note: e.target.value })
                }
              />
            </div>
          )}

            {/* Submit */}
            <div className="mt-4">
                <Button onClick={handleSubmit} disabled={loading}>
                {action === "block" && "Confirm Block"}
                {action === "clear" && "Confirm Clear"}
                {action === "reserve" && "Confirm Reservation"}
                {action === "book" && "Confirm Booking"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default AdminCalendar;
