import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { getApartmentBySlug, unbookRange } from "@/data/apartments";
import { DateRange } from "react-day-picker";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";

const UnbookRange = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const apartment = getApartmentBySlug(slug || "");

  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  if (!apartment) {
    return (
      <main className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 pt-32 pb-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Apartment not found</h1>
          <Link to="/#apartments">
            <Button>Back to Apartments</Button>
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const selectedFrom = dateRange?.from;
  const selectedTo = dateRange?.to;

  const overlapsAny = () => {
    if (!selectedFrom || !selectedTo) return false;
    return apartment.bookedDates.some((b) => selectedFrom <= b.to && selectedTo >= b.from);
  };

  const handleUnbook = () => {
    if (!selectedFrom || !selectedTo) {
      toast({ title: "Select a date range", description: "Please select both start and end dates to unbook." });
      return;
    }

    if (!overlapsAny()) {
      toast({ title: "No booked dates in range", description: "The selected range doesn't overlap any existing bookings." });
      return;
    }

    unbookRange(apartment, selectedFrom, selectedTo);
    toast({ title: "Dates unbooked", description: `Updated bookings for ${apartment.name}.` });
    navigate(`/apartment/${apartment.slug}`);
  };

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-card rounded-2xl p-6 shadow-elevated">
            <h1 className="text-2xl font-semibold mb-4">Unbook Dates for {apartment.name}</h1>

            <p className="text-sm text-muted-foreground mb-4">
              Select a date range to remove bookings. This will free any dates that overlap the selected range.
            </p>

            <div className="mb-6">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
                className="pointer-events-auto"
              />
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Selected</p>
                <p className="font-medium">
                  {selectedFrom ? format(selectedFrom, "LLL dd, yyyy") : "—"}
                  {selectedTo ? ` — ${format(selectedTo, "LLL dd, yyyy")}` : ""}
                </p>
              </div>

              <div className="w-48 text-right">
                <Button onClick={handleUnbook} disabled={!selectedFrom || !selectedTo}>
                  Unbook
                </Button>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-sm font-semibold mb-2">Current bookings</h3>
              {apartment.bookedDates.length === 0 ? (
                <p className="text-sm text-muted-foreground">No bookings</p>
              ) : (
                <ul className="space-y-2">
                  {apartment.bookedDates.map((b, i) => (
                    <li key={i} className="text-sm">
                      {format(b.from, "LLL dd, yyyy")} — {format(b.to, "LLL dd, yyyy")} {selectedFrom && selectedTo && (selectedFrom <= b.to && selectedTo >= b.from) && (<span className="ml-2 text-destructive">(overlaps)</span>)}
                    </li>
                  ))}
                </ul>
              )}
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default UnbookRange;
