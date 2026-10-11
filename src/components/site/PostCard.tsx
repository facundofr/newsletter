import type { Post } from "@prisma/client";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { formatDate, pickField } from "@/lib/text";
import { Avatar } from "./Avatar";
import { NewspaperIcon } from "./icons";

type Props = {
  post: Pick<Post, "slug" | "titleEs" | "titleEn" | "coverImage" | "publishedAt" | "readingMinutes">;
  locale: Locale;
  author: { name: string; avatar: string };
  longDate?: boolean;
};

export async function PostCard({ post, locale, author, longDate = false }: Props) {
  const t = await getTranslations("posts");
  return (
    <Link
      href={`/newsletter/${post.slug}`}
      prefetch
      className="group flex flex-col overflow-hidden rounded-[16px] border border-black/[0.01] bg-[#F7F7F7] transition-colors hover:bg-[#F0F0F0]"
    >
      <div className="aspect-[16/10] w-full overflow-hidden">
        {post.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.coverImage} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[#EFEFEF]">
            <NewspaperIcon strokeWidth={1.5} className="h-12 w-12 text-black/20" />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 px-[20px] pb-[20px] pt-[16px]">
        <p className="text-[12px] font-semibold text-black/50">
          {formatDate(post.publishedAt, locale, longDate)} · {t("minRead", { minutes: post.readingMinutes })}
        </p>
        <h3 className="text-[16px] font-semibold leading-[22px] tracking-[-0.32px] text-black transition-colors group-hover:text-[#1E6EF4]">
          {pickField(post.titleEs, post.titleEn, locale)}
        </h3>
        <div className="mt-auto flex items-center gap-2">
          <Avatar src={author.avatar} name={author.name} size={20} />
          <span className="text-[12px] font-semibold text-black/50">{author.name}</span>
        </div>
      </div>
    </Link>
  );
}
