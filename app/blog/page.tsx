import { BlogList } from "@/src/components/BlogList";
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
        className="page-shell"
        data-parallax-depth="0.1"
      >
        <div className="container-custom">
          <PageHeader
            title="< Blog >"
            description="Insights, tutorials, and thoughts on modern web development"
            descriptionMobile="Tutorials and notes on modern web development."
          />
          <BlogList />
        </div>
      </main>
    </>
  );
}
