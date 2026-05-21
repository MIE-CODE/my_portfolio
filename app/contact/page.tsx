import { ContactPageContent } from "@/src/components/ContactPageContent";
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
        className="page-shell comms-page"
        data-parallax-depth="0.08"
      >
        <div className="container-custom max-w-6xl">
          <PageHeader
            title="< COMMS_RELAY />"
            description="Open channel for engineering missions—freelance builds, contract work, or full-stack product delivery."
            description2="Transmit a packet below or use a direct uplink. Typical response window: under 24 hours."
            descriptionMobile="Open channel for projects and contract work."
            description2Mobile="Form below or direct uplink — reply within 24h."
            className="mb-8 sm:mb-12"
            preset="warpIn"
          />
          <ContactPageContent />
        </div>
      </main>
    </>
  );
}
