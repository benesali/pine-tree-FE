import { useEffect, useState, lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { Users, Bed, Bath } from "lucide-react";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ImageGallery from "@/components/ImageGallery";
import { Button } from "@/components/ui/button";
import { apiPublic } from "@/lib/apiPublic";
import { toast } from "@/hooks/use-toast";
import { DateRange } from "react-day-picker";
import { useImageGallery } from "@/hooks/useImageGallery";
import InstagramStrip from "@/components/InstagramStrip";
import { monthRange } from "@/lib/monthRange";

/* ------------------------------------------------------------------ */
/* Lazy components (performance critical)                              */
/* ------------------------------------------------------------------ */

const LazyCalendar = lazy(() =>
  import("@/components/ui/LazyCalendar")
);

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

type CalendarStatus = "blocked" | "reserved" | "booked";

type CalendarDay = {
  date: string;
  status: CalendarStatus;
};

type ApartmentApi = {
  id: number;
  slug: string;
  name: string;
  description: string;
  buildingSlug: string;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
};

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

const ApartmentDetail = () => {
  const { slug , lang} = useParams<{ slug: string; lang: string }>();

  const [apartment, setApartment] = useState<ApartmentApi | null>(null);
  const [calendarData, setCalendarData] = useState<CalendarDay[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [gdprAccepted, setGdprAccepted] = useState(false);

  // Anti-spam
  const [website, setWebsite] = useState("");
  const [formLoadedAt] = useState(Date.now());

  // Calendar state
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  /* ------------------------------------------------------------------ */
  /* Load apartment                                                     */
  /* ------------------------------------------------------------------ */

  useEffect(() => {
    if (!slug) return;

    const loadApartment = async () => {
      try {
        const data = await apiPublic<ApartmentApi>(
          `/api/${lang}/apartments/${slug}`
        );
        setApartment(data);
      } catch {
        toast({ title: "Apartment not found" });
      }
    };

    loadApartment();
  }, [slug]);

  /* ------------------------------------------------------------------ */
  /* Images (gallery)                                                   */
  /* ------------------------------------------------------------------ */

  const baseImagePath = apartment
    ? `/images/${apartment.buildingSlug}/${apartment.slug}`
    : "";

  const { images } = useImageGallery(baseImagePath);

  /* ------------------------------------------------------------------ */
  /* Calendar data                                                      */
  /* ------------------------------------------------------------------ */

  useEffect(() => {
    if (!apartment?.id) return;

    const loadCalendar = async () => {
      const { from, to } = monthRange(currentMonth, 3);

      try {
        const data = await apiPublic<CalendarDay[]>(
          `/api/${lang}/apartments/${apartment.id}/availability?from=${from}&to=${to}`
        );
        setCalendarData(data);
      } catch {
        toast({ title: "Failed to load availability" });
      } finally {
        setLoading(false);
      }
    };

    loadCalendar();
  }, [apartment?.id, currentMonth]);

  /* ------------------------------------------------------------------ */
  /* Lazy mount calendar (after first paint)                            */
  /* ------------------------------------------------------------------ */

  useEffect(() => {
    const t = setTimeout(() => setShowCalendar(true), 100);
    return () => clearTimeout(t);
  }, []);

  /* ------------------------------------------------------------------ */
  /* Guards                                                            */
  /* ------------------------------------------------------------------ */

  if (!apartment && loading) {
    return <div className="p-8">Loading apartment…</div>;
  }

  if (!apartment) {
    return <div className="p-8">Apartment not found</div>;
  }

  /* ------------------------------------------------------------------ */
  /* Calendar helpers                                                   */
  /* ------------------------------------------------------------------ */

  function calendarDayToDate(d: CalendarDay) {
    const [y, m, day] = d.date.split("-").map(Number);
    return new Date(y, m - 1, day);
  }

  const modifiers = {
    blocked: calendarData.filter(d => d.status === "blocked").map(calendarDayToDate),
    reserved: calendarData.filter(d => d.status === "reserved").map(calendarDayToDate),
    booked: calendarData.filter(d => d.status === "booked").map(calendarDayToDate),
    today: new Date(),
  };

  /* ------------------------------------------------------------------ */
  /* Inquiry handler                                                    */
  /* ------------------------------------------------------------------ */

  const handleInquiry = () => {
    if (website) return;

    if (!selectedRange?.from || !selectedRange?.to) {
      toast({ title: "Please select a date range first" });
      return;
    }

    if (!email) {
      toast({ title: "Please enter your email address" });
      return;
    }

    if (!gdprAccepted) {
      toast({ title: "Please accept GDPR consent to continue" });
      return;
    }

    if (Date.now() - formLoadedAt < 3000) {
      toast({ title: "Please take a moment before sending the inquiry" });
      return;
    }

    const subject = encodeURIComponent(
      `Apartment inquiry – ${apartment.name}`
    );

    const body = encodeURIComponent(
      `Hello,

I am interested in the apartment "${apartment.name}".

Preferred stay:
${format(selectedRange.from, "dd.MM.yyyy")} – ${format(
        selectedRange.to,
        "dd.MM.yyyy"
      )}

Contact email:
${email}

Message:
${message}

Thank you.`
    );

    window.open(
      `mailto:info@pinetreedalmatia.cz?subject=${subject}&body=${body}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  /* ------------------------------------------------------------------ */
  /* Render                                                            */
  /* ------------------------------------------------------------------ */

  return (
    <main className="min-h-screen bg-background">

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">

            {/* Gallery (LCP already solved) */}
            {images && (
              <ImageGallery
                {...images}
                alt={apartment.name}
                variant="detail"
              />
            )}

            {/* Header */}
            <h1 className="text-3xl font-semibold mb-3">
              {apartment.name}
            </h1>

            <div className="flex flex-wrap gap-6 mb-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                {apartment.guests} guests
              </div>
              <div className="flex items-center gap-2">
                <Bed className="h-5 w-5 text-primary" />
                {apartment.bedrooms} bedrooms
              </div>
              <div className="flex items-center gap-2">
                <Bath className="h-5 w-5 text-primary" />
                {apartment.bathrooms} bathrooms
              </div>
            </div>

            <p className="text-muted-foreground mb-8">
              {apartment.description}
            </p>

            {/* Amenities */}
            {apartment.amenities.length > 0 && (
              <div className="mb-10">
                <h3 className="font-semibold mb-3">Amenities</h3>
                <div className="flex flex-wrap gap-2">
                  {apartment.amenities.map((a) => (
                    <span
                      key={a}
                      className="px-3 py-1 text-sm bg-secondary rounded-full"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Availability */}
            <div className="bg-card rounded-2xl p-6 shadow-elevated">
              {showCalendar && (
                <Suspense fallback={<div className="h-[320px]" />}>
                  <LazyCalendar
                    mode="range"
                    selected={selectedRange}
                    onSelect={setSelectedRange}
                    month={currentMonth}
                    onMonthChange={setCurrentMonth}
                    numberOfMonths={2}
                    modifiers={modifiers}
                    modifiersClassNames={{
                      selected: "bg-teal-400 text-white",
                      today: "border border-teal-600",
                      booked: "bg-red-300 text-red-900",
                      reserved: "bg-yellow-300 text-yellow-900",
                      blocked: "bg-gray-300 text-gray-600 line-through",
                    }}
                    disabled={[
                      ...modifiers.booked,
                      ...modifiers.reserved,
                      ...modifiers.blocked,
                    ]}
                  />
                </Suspense>
              )}

              <input
                type="email"
                className="w-full border rounded-lg p-3 mt-6"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <textarea
                className="w-full border rounded-lg p-3 mt-4"
                rows={4}
                placeholder="Your message (optional)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

              <input
                type="text"
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />

              <label className="flex items-start gap-3 mt-4 text-sm">
                <input
                  type="checkbox"
                  checked={gdprAccepted}
                  onChange={(e) => setGdprAccepted(e.target.checked)}
                  className="mt-1"
                />
                <span>
                  I consent to the processing of my personal data in accordance
                  with the GDPR.
                </span>
              </label>

              <div className="mt-4">
                <Button onClick={handleInquiry}>
                  Send inquiry by email
                </Button>
              </div>
            </div>

          </div>
        </div>
      </div>

    </main>
  );
};

export default ApartmentDetail;
