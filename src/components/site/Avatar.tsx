/** Profile photo, or the first letter of the name when there is no photo yet. */
export function Avatar({ src, name, size = 40, rounded = "9999px" }: { src: string; name: string; size?: number; rounded?: string }) {
  const style = { width: size, height: size, borderRadius: rounded };
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={name} width={size} height={size} className="shrink-0 object-cover" style={style} />;
  }
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center bg-[#1E6EF4] font-semibold text-white"
      style={{ ...style, fontSize: size * 0.42 }}
    >
      {name.trim().charAt(0).toUpperCase() || "?"}
    </span>
  );
}
