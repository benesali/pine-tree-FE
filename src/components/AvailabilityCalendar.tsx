import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Apartment, isDateBooked, getPriceForDate, getSeasonLabel } from "@/data/apartments";

interface AvailabilityCalendarProps {
  apartment: Apartment;
  onDateSelect?: (date: Date | undefined) => void;
  selectedDate?: Date;
}

const AvailabilityCalendar = ({ apartment, onDateSelect, selectedDate }: AvailabilityCalendarProps) => {
  const [month, setMonth] = useState<Date>(new Date());
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);

  const displayDate = hoveredDate || selectedDate;

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <h3 className="font-heading text-xl font-semibold text-foreground mb-4">
        Availability & Prices
      </h3>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-pine/20 border border-pine" />
          <span className="text-muted-foreground">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-destructive/20 border border-destructive" />
          <span className="text-muted-foreground">Booked</span>
        </div>
      </div>

      {/* Price info for hovered/selected date */}
      {displayDate && (
        <div className="mb-4 p-3 bg-secondary/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            {format(displayDate, "MMMM d, yyyy")}
          </p>
          {isDateBooked(apartment, displayDate) ? (
            <p className="text-lg font-semibold text-destructive">Booked</p>
          ) : (
            <>
              <p className="text-2xl font-bold text-primary">
                €{getPriceForDate(apartment, displayDate)}
                <span className="text-sm font-normal text-muted-foreground"> / night</span>
              </p>
              <p className="text-xs text-muted-foreground">
                {getSeasonLabel(apartment, displayDate)}
              </p>
            </>
          )}
        </div>
      )}

      {/* Calendar */}
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={onDateSelect}
        month={month}
        onMonthChange={setMonth}
        className="pointer-events-auto"
        numberOfMonths={1}
        disabled={(date) => date < new Date()}
        modifiers={{
          booked: (date) => isDateBooked(apartment, date),
        }}
        modifiersClassNames={{
          booked: "bg-destructive/20 text-destructive hover:bg-destructive/30",
        }}
        components={{
          Day: ({ date, ...props }) => {
            const isBooked = isDateBooked(apartment, date);
            const isPast = date < new Date();
            const price = getPriceForDate(apartment, date);
            
            return (
              <button
                {...props}
                className={cn(
                  "relative h-12 w-12 p-0 font-normal flex flex-col items-center justify-center rounded-md transition-colors",
                  isPast && "opacity-50 cursor-not-allowed",
                  !isPast && !isBooked && "hover:bg-pine/10 cursor-pointer",
                  isBooked && !isPast && "bg-destructive/20 cursor-not-allowed",
                  selectedDate && date.getTime() === selectedDate.getTime() && "bg-primary text-primary-foreground"
                )}
                disabled={isPast || isBooked}
                onMouseEnter={() => !isPast && setHoveredDate(date)}
                onMouseLeave={() => setHoveredDate(null)}
                onClick={() => !isPast && !isBooked && onDateSelect?.(date)}
              >
                <span className="text-sm">{date.getDate()}</span>
                {!isPast && !isBooked && (
                  <span className="text-[10px] text-muted-foreground">€{price}</span>
                )}
              </button>
            );
          },
        }}
      />

      {/* Season price overview */}
      <div className="mt-6 space-y-2">
        <h4 className="font-medium text-foreground text-sm">Seasonal Prices</h4>
        <div className="space-y-1">
          {apartment.priceRanges.map((range, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span className="text-muted-foreground">{range.label}</span>
              <span className="font-medium text-foreground">€{range.price}/night</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AvailabilityCalendar;
