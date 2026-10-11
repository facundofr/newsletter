/** Small uppercase eyebrow + large title, as used for every section of the reference design. */
export function SectionHeading({
  eyebrow,
  title,
  size = "lg",
  action,
}: {
  eyebrow: string;
  title: string;
  size?: "lg" | "md";
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-[20px] sm:flex-row sm:items-end sm:justify-between">
      <div className="flex flex-col gap-[4px]">
        <p className="eyebrow">{eyebrow}</p>
        <h2
          className={
            size === "lg"
              ? "text-[32px] font-semibold leading-[38px] tracking-[-0.64px] text-black sm:text-[44px] sm:leading-[51px] sm:tracking-[-0.88px]"
              : "text-[28px] font-semibold leading-[32.5px] tracking-[-0.56px] text-black sm:text-[36px] sm:leading-[41.8px] sm:tracking-[-0.72px]"
          }
        >
          {title}
        </h2>
      </div>
      {action}
    </div>
  );
}
