import { BlogPageContent } from "@/src/components/BlogPageContent";
import { JsonLd } from "@/src/components/JsonLd";
import { PageHeader } from "@/src/components/PageHeader";
import { buildPageMetadata } from "@/src/seo/buildMetadata";
import { breadcrumbJsonLd } from "@/src/seo/jsonLd";
import { PAGE_SEO } from "@/src/seo/pages";

export const metadata = buildPageMetadata(PAGE_SEO.blog);

export default function BlogPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />
      <main
        id="main-content"
        className="page-shell stream-page"
        data-parallax-depth="0.1"
      >
        <div className="container-custom max-w-6xl">
          <PageHeader
            title="< DATA_STREAM />"
            description="Decoded log buffer — tutorials, architecture notes, and field reports from production React, Next.js, and product work."
            description2="Filter by topic or open a packet for the full transmission."
            descriptionMobile="Tutorials and field reports on modern web engineering."
            description2Mobile="Filter by topic or open a full packet."
            className="mb-8 sm:mb-12"
            preset="scanLeft"
          />
          <BlogPageContent />
        </div>
      </main>
    </>
  );
}
