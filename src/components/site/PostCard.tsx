import type { Post } from "@prisma/client";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { formatDate, pickField } from "@/lib/text";
import { Avatar } from "./Avatar";

type Props = {
  post: Pick<Post, "slug" | "titleEs" | "titleEn" | "excerptEs" | "excerptEn" | "coverImage" | "publishedAt" | "readingMinutes">;
  locale: Locale;
  author: { name: string; avatar: string };
};

export async function PostCard({ post, locale, author }: Props) {
  const t = await getTranslations("posts");
  const title = pickField(post.titleEs, post.titleEn, locale);
  const excerpt = pickField(post.excerptEs, post.excerptEn, locale);

  return (
    <Link
      href={`/newsletter/${post.slug}`}
      className="card group flex flex-col gap-4 p-3 transition hover:border-neutral-300 hover:shadow-sm sm:flex-row sm:items-center"
    >
      <div className="aspect-[16/10] w-full shrink-0 overflow-hidden rounded-2xl bg-soft sm:w-56">
        {post.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.coverImage} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-4xl">✉️</div>
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-2 px-1 pb-1 sm:py-1 sm:pr-3">
        <p className="text-xs text-muted">
          {formatDate(post.publishedAt, locale)} · {t("minRead", { minutes: post.readingMinutes })}
        </p>
        <h3 className="text-lg font-semibold leading-snug tracking-tight">{title}</h3>
        {excerpt && <p className="line-clamp-2 text-sm text-muted">{excerpt}</p>}
        <div className="mt-1 flex items-center gap-2 text-xs text-muted">
          <Avatar src={author.avatar} name={author.name} size={20} />
          {author.name}
        </div>
      </div>
    </Link>
  );
}
