// Pastel chip colors from the reference design: [background, text].
const ROW_A = [
  ["#FDE2D5", "#845200"],
  ["#E4EDF6", "#1E40AF"],
  ["#D8F0DC", "#33683C"],
  ["#F6E0E0", "#991B1B"],
];
const ROW_B = [
  ["#F2DDF5", "#5B21B6"],
  ["#D8F0DC", "#33683C"],
  ["#FFF0C6", "#845200"],
  ["#E1E6FB", "#1E40AF"],
];

function Row({ items, palette, direction }: { items: string[]; palette: string[][]; direction: "left" | "right" }) {
  if (items.length === 0) return null;
  // Repeat until the strip is wide enough, then render it twice so translating -50% loops seamlessly.
  const strip: string[] = [];
  while (strip.length < 10) strip.push(...items);
  const colored = strip.map((label, i) => ({ label, colors: palette[(i % items.length) % palette.length] }));

  return (
    <div className="relative w-screen overflow-hidden">
      <div className={`flex w-max ${direction === "left" ? "marquee-left" : "marquee-right"}`}>
        {[0, 1].map((copy) =>
          colored.map(({ label, colors: [bg, fg] }, i) => (
            <div
              key={`${copy}-${i}`}
              aria-hidden={copy === 1 || undefined}
              className="mr-3 flex h-[52px] shrink-0 items-center whitespace-nowrap rounded-[16px] border border-black/[0.03] px-4 text-[22px] font-semibold leading-[26px] tracking-[-0.6px] shadow-sm sm:mr-4 sm:h-[78px] sm:rounded-[24px] sm:px-8 sm:text-[40px] sm:leading-[46px] sm:tracking-[-1.2px]"
              style={{ backgroundColor: bg, color: fg }}
            >
              {label}
            </div>
          )),
        )}
      </div>
    </div>
  );
}

/** Two rows of colored chips sliding in opposite directions. */
export function Marquee({ top, bottom }: { top: string[]; bottom: string[] }) {
  return (
    <div className="flex w-screen flex-col items-center gap-[12px] sm:gap-[24px]">
      <Row items={top} palette={ROW_A} direction="left" />
      <Row items={bottom} palette={ROW_B} direction="right" />
    </div>
  );
}
