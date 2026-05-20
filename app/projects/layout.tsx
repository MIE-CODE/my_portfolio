import type { ReactNode } from "react";
import { JsonLd } from "@/src/components/JsonLd";
import { buildPageMetadata } from "@/src/seo/buildMetadata";
import { breadcrumbJsonLd } from "@/src/seo/jsonLd";
import { PAGE_SEO } from "@/src/seo/pages";

export const metadata = buildPageMetadata(PAGE_SEO.projects);

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
        ])}
      />
      {children}
    </>
  );
}
