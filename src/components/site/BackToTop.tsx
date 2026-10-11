"use client";

export function BackToTop({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="cursor-pointer text-[14px] font-semibold leading-[17px] text-black/50 transition-colors hover:text-[#1E6EF4]"
    >
      {label}
    </button>
  );
}
