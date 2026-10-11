import { isImageSrc } from "@/lib/text";

/** Renders an emoji or an uploaded image as an icon. */
export function Icon({ value, className = "h-6 w-6" }: { value: string; className?: string }) {
  if (!value) return null;
  if (isImageSrc(value)) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={value} alt="" className={`${className} rounded-md object-contain`} />;
  }
  return <span className="leading-none">{value}</span>;
}
