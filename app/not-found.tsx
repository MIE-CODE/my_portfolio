import { NotFoundContent } from "@/src/components/NotFoundContent";
import { buildPageMetadata } from "@/src/seo/buildMetadata";
import { PAGE_SEO } from "@/src/seo/pages";

export const metadata = buildPageMetadata(PAGE_SEO.notFound);

export default function NotFound() {
  return <NotFoundContent />;
}
