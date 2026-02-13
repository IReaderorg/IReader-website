import type { ReactElement } from "react";
import PageChrome from "@/app/(features)/components/page-chrome";
import DocsSidebar from "./_components/sidebar";
import { getDocsNavigation } from "@/lib/docs/mdx";

export default async function DocsLayout({
  children,
}: {
  readonly children: React.ReactNode;
}): Promise<ReactElement> {
  const docsNavigation = await getDocsNavigation();

  return (
    <PageChrome containerClassName="w-full px-6 md:px-10 lg:px-16 flex flex-col gap-10 pt-24">
      <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:flex flex-col gap-2">
          <DocsSidebar sections={docsNavigation} />
        </aside>

        <div className="flex flex-col gap-10">{children}</div>
      </div>
    </PageChrome>
  );
}
