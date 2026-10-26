import { ReservedSlot } from "@/components/site/Draft";
import { heroSlides, insights } from "@/content/home";
import { shown } from "@/lib/placeholder";
import { O3Stories, type Story } from "./O3Stories";

const dateFormat = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

/**
 * Stand-in images for the placeholder articles, which have none: concept 1's
 * workplace photos, in turn. They show only with placeholder articles, so only
 * in preview. A real article shows its own image, or a brand tile without one.
 */
const scenes = heroSlides.flatMap((s) => (s.photo ? [s.photo.src] : []));

/** Latest insights. Same articles and minimum of three as concepts 1 and 2. */
export function O3Journal() {
  const items = shown(insights.items);
  if (items.length < 3) return <ReservedSlot title="Latest insights" note="Three or more published articles." />;

  const stories: Story[] = items.map((post, i) => ({
    title: post.title,
    excerpt: post.excerpt,
    audience: post.audience,
    dateTime: post.date,
    date: dateFormat.format(new Date(post.date)),
    readMinutes: post.readMinutes,
    href: post.href,
    photo: post.image ?? (post.placeholder && scenes.length ? scenes[i % scenes.length] : null),
  }));

  return (
    <section aria-labelledby="o3-stories-title" className="overflow-hidden bg-surface-canvas py-20 lg:py-28">
      <O3Stories items={stories} allHref="/insights/">
        <h2 id="o3-stories-title" className="m-0 text-display-sm sm:text-display-md text-ink-900">
          {insights.title} <span className="text-ink-500">{insights.titleTail}</span>
        </h2>
      </O3Stories>
    </section>
  );
}
