import { ContactForm } from "@/src/components/ContactForm";
import { JsonLd } from "@/src/components/JsonLd";
import { PageHeader } from "@/src/components/PageHeader";
import { buildPageMetadata } from "@/src/seo/buildMetadata";
import { breadcrumbJsonLd } from "@/src/seo/jsonLd";
import { PAGE_SEO } from "@/src/seo/pages";

export const metadata = buildPageMetadata(PAGE_SEO.contact);

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <main
        id="main-content"
        className="page-shell"
        data-parallax-depth="0.08"
      >
        <div className="container-custom max-w-4xl">
          <PageHeader
            title="< Let's Connect >"
            description="Have a project in mind? Let's discuss how we can bring your ideas to life."
          />
          <ContactForm />
        </div>
      </main>
    </>
  );
}
