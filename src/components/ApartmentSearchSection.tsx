import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { DateRange } from "react-day-picker";
import ApartmentInlineCard from "./ApartmentInlineCard";
import DateRangeSearch from "./DateRangeSearch";
import { ApartmentInlineCardData } from "@/types/ApartmentInlineCardData";


const ApartmentSearchSection = () => {
  const [apartments, setApartments] = useState<ApartmentInlineCardData[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  // 🔁 search triggered from UI
  const handleSearch = (dateRange: DateRange | undefined, guests: number) => {
    if (!dateRange?.from || !dateRange?.to) return;

    setSearchParams({
      from: dateRange.from.toISOString().slice(0, 10),
      to: dateRange.to.toISOString().slice(0, 10),
      guests: guests.toString(),
    });
  };

  // 🔁 search triggered from URL
  useEffect(() => {
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const guests = searchParams.get("guests");

    if (!from || !to || !guests) return;

    const fetchApartments = async () => {
      setLoading(true);
      setSearched(true);

      const res = await fetch(
        `/api/apartments/search?from=${from}&to=${to}&guests=${guests}`
      );

      if (!res.ok) {
        setApartments([]);
        setLoading(false);
        return;
      }

      const data: ApartmentInlineCardData[] = await res.json();
      setApartments(data);
      setLoading(false);
    };

    fetchApartments();
  }, [searchParams]);

  return (
    <section id="search-results" className="space-y-10">
      {/* 🔍 SEARCH INPUT */}
      <DateRangeSearch onSearch={handleSearch} />

      {loading && <p className="text-center">Searching…</p>}

      {!loading && apartments.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2">
          {apartments.map((apt) => (
            <ApartmentInlineCard
              key={apt.id}
              apartment={apt}
              onInquiry={() => console.log("Inquiry", apt)}
            />
          ))}
        </div>
      )}

      {!loading && searched && apartments.length === 0 && (
        <p className="text-center text-muted-foreground">
          No apartments available for selected dates
        </p>
      )}
    </section>
  );
};

export default ApartmentSearchSection;
