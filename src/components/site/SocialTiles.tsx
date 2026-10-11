import type { SiteSettings } from "@/lib/settings-schema";

/** Brand colors and Simple Icons slugs, matched by the social network's name. */
const BRANDS: { match: RegExp; slug: string; bg: string }[] = [
  { match: /^(x|twitter|x \(twitter\))$/i, slug: "x", bg: "#000000" },
  { match: /instagram/i, slug: "instagram", bg: "linear-gradient(45deg,#f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)" },
  { match: /tiktok/i, slug: "tiktok", bg: "#000000" },
  { match: /linkedin/i, slug: "linkedin", bg: "#0077B5" },
  { match: /youtube/i, slug: "youtube", bg: "#FF0000" },
  { match: /github/i, slug: "github", bg: "#181717" },
  { match: /facebook/i, slug: "facebook", bg: "#1877F2" },
  { match: /threads/i, slug: "threads", bg: "#000000" },
  { match: /bluesky/i, slug: "bluesky", bg: "#0285FF" },
  { match: /twitch/i, slug: "twitch", bg: "#9146FF" },
  { match: /discord/i, slug: "discord", bg: "#5865F2" },
  { match: /medium/i, slug: "medium", bg: "#000000" },
];

function iconUrl(slug: string) {
  // LinkedIn was removed from newer Simple Icons releases; v11 still has it.
  return slug === "linkedin"
    ? "https://cdn.jsdelivr.net/npm/simple-icons@11.15.0/icons/linkedin.svg"
    : `https://cdn.simpleicons.org/${slug}/ffffff`;
}

/** Tilted brand-colored tiles, alternating -12° / 12° like the reference. */
export function SocialTiles({ socials }: { socials: SiteSettings["socials"] }) {
  return (
    <div className="flex items-end justify-center">
      {socials.map((s, i) => {
        const brand = BRANDS.find((b) => b.match.test(s.label.trim()));
        return (
          <a
            key={s.url + i}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            title={s.label}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-opacity hover:opacity-85"
            style={{ background: brand?.bg ?? "#1E6EF4", transform: `rotate(${i % 2 ? 12 : -12}deg)` }}
          >
            {brand ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={iconUrl(brand.slug)}
                alt=""
                width={24}
                height={24}
                style={brand.slug === "linkedin" ? { filter: "invert(1)" } : undefined}
              />
            ) : (
              <span className="text-[16px] font-semibold text-white">{s.label.charAt(0).toUpperCase()}</span>
            )}
          </a>
        );
      })}
    </div>
  );
}
