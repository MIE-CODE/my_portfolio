import { AboutPageContent } from "@/src/components/AboutPageContent";
import { JsonLd } from "@/src/components/JsonLd";
import { PageHeader } from "@/src/components/PageHeader";
import { buildPageMetadata } from "@/src/seo/buildMetadata";
import { breadcrumbJsonLd } from "@/src/seo/jsonLd";
import { PAGE_SEO } from "@/src/seo/pages";

export const metadata = buildPageMetadata(PAGE_SEO.about);

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <main
        id="main-content"
        className="page-shell"
        data-parallax-depth="0.1"
      >
        <div className="container-custom max-w-5xl">
          <PageHeader
            align="start"
            title="About"
            headingLevel="h2"
            className="max-w-5xl mx-auto w-full"
          />
          <AboutPageContent />
        </div>
      </main>
    </>
  );
}
