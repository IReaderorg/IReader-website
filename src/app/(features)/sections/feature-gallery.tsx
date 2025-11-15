import type { ReactElement } from "react";
import Image from "next/image";

const galleryItems: Array<{
  readonly title: string;
  readonly description: string;
  readonly imageDark: string;
  readonly imageLight: string;
  readonly alt: string;
}> = [
  {
    title: "Library organization",
    description:
      "Pin favourites, create smart shelves, and track reading progress in one place.",
    imageDark: "/screens/library-dark.png",
    imageLight: "/screens/library-light.png",
    alt: "IReader library view showing organized book collection",
  },
  {
    title: "Book details",
    description:
      "View comprehensive information, manage chapters, and customize reading settings per book.",
    imageDark: "/screens/detail-dark.png",
    imageLight: "/screens/detail-light.png",
    alt: "IReader book detail page with chapter list and metadata",
  },
  {
    title: "Focused reading surface",
    description:
      "Choose paged or continuous layouts, adjust margins, and enable distraction-free mode.",
    imageDark: "/screens/reader-dark.png",
    imageLight: "/screens/reader-light.png",
    alt: "IReader reading interface with customizable layout",
  },
];

export default function FeatureGallery(): ReactElement {
  return (
    <section className="py-[var(--spacing-20)] bg-[var(--color-background)]">
      <div className="page-shell">
        <div className="flex flex-col gap-[var(--spacing-8)]">
          <div className="flex flex-col gap-[var(--spacing-4)] max-w-2xl">
            <span className="badge">Experience</span>
            <h2 className="text-3xl sm:text-[2.4rem] font-semibold tracking-[-0.025em]">
              Designed like an editor, tuned for long-form reading
            </h2>
            <p className="text-base sm:text-lg text-[color-mix(in_srgb,_var(--color-foreground)_70%,_transparent)] leading-relaxed">
              IReader is a focused novel reader—quick shortcuts and
              automation stay lightweight on mobile and powerful on desktop.
            </p>
          </div>

          <div className="grid gap-[var(--spacing-8)]">
            {galleryItems.map(({ title, description, imageDark, imageLight, alt }) => (
              <article key={title} className="flex flex-col gap-[var(--spacing-4)]">
                <div className="flex flex-col gap-[var(--spacing-2)]">
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-brand-primary)]">
                    {title}
                  </span>
                  <span className="text-sm text-[color-mix(in_srgb,_var(--color-foreground)_70%,_transparent)] leading-relaxed">
                    {description}
                  </span>
                </div>
                <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] shadow-[var(--shadow-md)] transition-all duration-[var(--transition-base)] hover:shadow-[var(--shadow-lg)] hover:scale-[1.01]">
                  <Image
                    src={imageDark}
                    alt={alt}
                    fill
                    className="object-cover dark:block hidden"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
                    priority={false}
                  />
                  <Image
                    src={imageLight}
                    alt={alt}
                    fill
                    className="object-cover dark:hidden block"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
                    priority={false}
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
