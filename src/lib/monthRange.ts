export type MonthRange = {
  from: string; // YYYY-MM-DD
  to: string;   // YYYY-MM-DD
};

/**
 * Returns an ISO date range covering N whole months starting
 * from the first day of the given month.
 *
 * Example:
 *   monthRange(new Date(2026, 0, 15), 3)
 *   -> { from: "2026-01-01", to: "2026-03-31" }
 */
export function monthRange(
  month: Date,
  months: number = 3
): MonthRange {
  if (months < 1) {
    throw new Error("months must be >= 1");
  }

  // First day of the starting month
  const fromDate = new Date(
    month.getFullYear(),
    month.getMonth(),
    1
  );

  // Last day of the last month in range
  const toDate = new Date(
    month.getFullYear(),
    month.getMonth() + months,
    0
  );

  return {
    from: toISODate(fromDate),
    to: toISODate(toDate),
  };
}

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

function toISODate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}