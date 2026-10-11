/** Centered page header: rounded icon tile, black title and gray subtitle. */
export function PageHero({
  icon,
  title,
  subtitle,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center overflow-hidden pb-12 pt-20 sm:pb-20 sm:pt-32">
      <div className="max-w-7xl px-6">
        <div className="enter-tile relative mx-auto mb-[28px] h-[90px] w-[90px] sm:mb-[40px] sm:h-[120px] sm:w-[120px]">
          <div className="flex h-[90px] w-[90px] items-center justify-center overflow-hidden rounded-[24px] bg-[#F7F7F7] sm:h-[120px] sm:w-[120px] sm:rounded-[32px]">
            {icon}
          </div>
        </div>
        <div className="enter-title mx-auto flex max-w-[600px] flex-col items-center text-center">
          <h1 className="text-[32px] font-semibold leading-[38px] tracking-[-0.96px] text-black sm:text-[48px] sm:leading-[55.7px] sm:tracking-[-1.44px]">
            {title}
          </h1>
          {subtitle}
          {children}
        </div>
      </div>
    </section>
  );
}

export function HeroSubtitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[32px] font-semibold leading-[38px] tracking-[-0.96px] text-black/50 sm:text-[48px] sm:leading-[55.7px] sm:tracking-[-1.44px]">
      {children}
    </h2>
  );
}
