"use client";

import { Children, useEffect, useRef, useState } from "react";

/** Horizontal snap carousel with centered slides, faded neighbours, dots and mouse dragging. */
export function Carousel({ children }: { children: React.ReactNode }) {
  const slides = Children.toArray(children);
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number; start: number; moved: boolean } | null>(null);
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);

  const nearest = () => {
    const el = ref.current;
    if (!el) return 0;
    const center = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    Array.from(el.children).forEach((child, i) => {
      const c = child as HTMLElement;
      const dist = Math.abs(c.offsetLeft + c.offsetWidth / 2 - center);
      if (dist < bestDist) [best, bestDist] = [i, dist];
    });
    return best;
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => setActive(nearest());
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  function goTo(i: number) {
    const el = ref.current;
    const item = el?.children[i] as HTMLElement | undefined;
    if (!el || !item) return;
    el.scrollTo({ left: item.offsetLeft - (el.clientWidth - item.offsetWidth) / 2, behavior: "smooth" });
  }

  // Mouse drag (touch devices already scroll natively).
  function onPointerDown(e: React.PointerEvent) {
    if (e.pointerType !== "mouse" || !ref.current) return;
    drag.current = { x: e.clientX, left: ref.current.scrollLeft, start: active, moved: false };
    setDragging(true);
  }
  function onPointerMove(e: React.PointerEvent) {
    const d = drag.current;
    if (!d || !ref.current) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 4) d.moved = true;
    ref.current.scrollLeft = d.left - dx;
  }
  function endDrag() {
    const d = drag.current;
    if (!d || !ref.current) return;
    setDragging(false);
    // Let the click handler see that this was a drag before clearing.
    setTimeout(() => (drag.current = null), 0);
    if (!d.moved) return;
    // A short flick moves one slide in the drag direction; otherwise snap to the closest one.
    const delta = ref.current.scrollLeft - d.left;
    const closest = nearest();
    const target = closest === d.start && Math.abs(delta) > 60 ? d.start + Math.sign(delta) : closest;
    goTo(Math.max(0, Math.min(slides.length - 1, target)));
  }

  return (
    <div>
      <div
        ref={ref}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onDragStart={(e) => e.preventDefault()}
        className={`flex gap-[16px] overflow-x-auto px-[max(20px,calc(50vw-440px))] [scrollbar-width:none] sm:gap-[24px] [&::-webkit-scrollbar]:hidden ${
          dragging ? "cursor-grabbing select-none" : "cursor-grab snap-x snap-mandatory"
        }`}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            onClickCapture={(e) => {
              // A drag must not trigger links inside the slide, and clicking a side slide centers it.
              if (drag.current?.moved || i !== active) {
                e.preventDefault();
                e.stopPropagation();
                if (!drag.current?.moved) goTo(i);
              }
            }}
            className={`w-[min(880px,calc(100vw-40px))] shrink-0 snap-center transition-opacity duration-500 ${
              i === active ? "opacity-100" : "opacity-40"
            }`}
          >
            {slide}
          </div>
        ))}
      </div>
      {slides.length > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-[8px] w-[8px] cursor-pointer rounded-full transition-colors duration-300 ${i === active ? "bg-black" : "bg-black/20"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
