import { JsonLd } from "@/src/components/JsonLd";
import { PageHeader } from "@/src/components/PageHeader";
import { ServicesCTA } from "@/src/components/ServicesCTA";
import { ServicesList } from "@/src/components/ServicesList";
import { buildPageMetadata } from "@/src/seo/buildMetadata";
import { breadcrumbJsonLd, professionalServiceJsonLd } from "@/src/seo/jsonLd";
import { PAGE_SEO } from "@/src/seo/pages";

export const metadata = buildPageMetadata(PAGE_SEO.services);

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
          professionalServiceJsonLd(),
        ]}
      />
      <main
        id="main-content"
        className="page-shell"
        data-parallax-depth="0.1"
      >
        <div className="container-custom">
          <PageHeader
            title="< Services >"
            description="Product-minded engineering—same muscles behind Belsoft (BelCore, BelPower), Blivap, True Perk, SparkPay, and freelance SaaS"
            description2="From architecture and CTO-style delivery to hands-on Next.js, Nuxt, and React: performance, payments, analytics, and design fidelity"
            className="mb-12 sm:mb-16"
          />
          <ServicesList />
          <ServicesCTA />
        </div>
      </main>
    </>
  );
}
