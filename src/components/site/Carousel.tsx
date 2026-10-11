"use client";

import { Children, useEffect, useRef, useState } from "react";

/** Horizontal snap carousel with centered slides, faded neighbours and dots. */
export function Carousel({ children }: { children: React.ReactNode }) {
  const slides = Children.toArray(children);
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const items = Array.from(el.children) as HTMLElement[];
      const center = el.scrollLeft + el.clientWidth / 2;
      let best = 0;
      items.forEach((item, i) => {
        const c = item.offsetLeft + item.offsetWidth / 2;
        if (Math.abs(c - center) < Math.abs(items[best].offsetLeft + items[best].offsetWidth / 2 - center)) best = i;
      });
      setActive(best);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  function goTo(i: number) {
    const el = ref.current;
    const item = el?.children[i] as HTMLElement | undefined;
    if (!el || !item) return;
    el.scrollTo({ left: item.offsetLeft - (el.clientWidth - item.offsetWidth) / 2, behavior: "smooth" });
  }

  return (
    <div>
      <div
        ref={ref}
        className="flex snap-x snap-mandatory gap-[16px] overflow-x-auto px-[max(20px,calc(50vw-440px))] [scrollbar-width:none] sm:gap-[24px] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            onClick={() => i !== active && goTo(i)}
            className={`w-[min(880px,calc(100vw-40px))] shrink-0 snap-center transition-opacity duration-500 ${
              i === active ? "opacity-100" : "cursor-pointer opacity-40"
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
