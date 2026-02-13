import type { FC, ReactNode } from "react";

import type { DocHeading } from "@/lib/docs/mdx";
import TableOfContents from "./table-of-contents";

interface DocArticleProps {
  readonly content: ReactNode;
  readonly headings: ReadonlyArray<DocHeading>;
}

const DocArticle: FC<DocArticleProps> = ({ content, headings }) => {
  return (
    <div className="w-full">
      <div className="mx-auto grid w-full max-w-[1340px] gap-14 xl:grid-cols-[minmax(0,1fr)_minmax(260px,300px)] xl:gap-20">
        <article className="docs-content max-w-[1040px] prose prose-lg prose-slate dark:prose-invert max-w-none
          prose-headings:font-bold prose-headings:tracking-tight
          prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-0 prose-h1:text-[var(--foreground)]
          prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:text-[var(--foreground)]
          prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-[var(--foreground)]
          prose-p:text-[var(--foreground-muted)] prose-p:leading-relaxed
          prose-a:text-[var(--brand-primary)] prose-a:no-underline hover:prose-a:underline
          prose-strong:text-[var(--foreground)]
          prose-code:text-[var(--brand-primary)] prose-code:bg-[var(--background-soft)] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-normal
          prose-pre:bg-[var(--background-soft)] prose-pre:border prose-pre:border-[var(--border)]
          prose-blockquote:border-l-[var(--brand-primary)] prose-blockquote:bg-[var(--background-soft)] prose-blockquote:py-1
          prose-li:text-[var(--foreground-muted)]
          prose-ol:text-[var(--foreground-muted)] prose-ul:text-[var(--foreground-muted)]
        ">{content}</article>
        <TableOfContents headings={headings} />
      </div>
    </div>
  );
};

export default DocArticle;
