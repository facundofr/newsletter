// Lucide icons (https://lucide.dev), the same set used by the reference design.
type P = { className?: string; strokeWidth?: number };

function Svg({ className = "h-5 w-5", strokeWidth = 2, children }: P & { children: React.ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export const HouseIcon = (p: P) => (
  <Svg {...p}>
    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
    <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  </Svg>
);
export const BriefcaseIcon = (p: P) => (
  <Svg {...p}>
    <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    <rect width="20" height="14" x="2" y="6" rx="2" />
  </Svg>
);
export const NewspaperIcon = (p: P) => (
  <Svg {...p}>
    <path d="M15 18h-5" />
    <path d="M18 14h-8" />
    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2" />
    <rect width="8" height="4" x="10" y="6" rx="1" />
  </Svg>
);
export const RocketIcon = (p: P) => (
  <Svg {...p}>
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09" />
    <path d="M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05" />
  </Svg>
);
export const MailIcon = (p: P) => (
  <Svg {...p}>
    <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
    <rect x="2" y="4" width="20" height="16" rx="2" />
  </Svg>
);

/** Filled map pin used in the "Based In" card. */
export function MapPin({ className = "h-10 w-10", fill = "rgba(0,0,0,0.08)" }: { className?: string; fill?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill={fill} d="M12 2a8 8 0 0 0-8 8c0 5.4 7 11.5 7.3 11.8a1 1 0 0 0 1.4 0C13 21.5 20 15.4 20 10a8 8 0 0 0-8-8z" />
      <circle cx="12" cy="10" r="3" fill="white" />
    </svg>
  );
}

/** Blue location pin with a check, the highlighted pin in the "Based In" card. */
export function CheckPin({ className = "h-16 w-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 56" className={className} aria-hidden="true">
      <path
        fill="#1E6EF4"
        d="M24 2C12.4 2 3 11.4 3 23c0 13.6 17.5 29.2 19.6 31a2.2 2.2 0 0 0 2.8 0C27.5 52.2 45 36.6 45 23 45 11.4 35.6 2 24 2z"
      />
      <path d="m15 23 6.5 6.5L33.5 17" fill="none" stroke="white" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
