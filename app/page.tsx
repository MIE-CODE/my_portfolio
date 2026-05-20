import { HomePage } from "@/src/components/HomePage";
import { buildPageMetadata } from "@/src/seo/buildMetadata";
import { PAGE_SEO } from "@/src/seo/pages";

export const metadata = buildPageMetadata(PAGE_SEO.home);

export default function Page() {
  return <HomePage />;
}
