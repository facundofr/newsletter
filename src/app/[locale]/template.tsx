// A template re-mounts on every navigation (unlike a layout), so each section fades in
// while the dock, language toggle and footer stay in place.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
