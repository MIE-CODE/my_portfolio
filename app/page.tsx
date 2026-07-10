import { HomePage } from "@/src/components/HomePage";
import {
  mapApiSkills,
} from "@/src/lib/mapPublicData";
import {
  safeGetResume,
  safeGetSkills,
} from "@/src/lib/fetchPublic";
import { buildPageMetadata } from "@/src/seo/buildMetadata";
import { PAGE_SEO } from "@/src/seo/pages";

export const metadata = buildPageMetadata(PAGE_SEO.home);

export default async function Page() {
  const [skills, resume] = await Promise.all([
    safeGetSkills(),
    safeGetResume(),
  ]);

  const apiSkills =
    skills.length > 0 ? mapApiSkills(skills) : undefined;
  const resumeUrl = resume?.file_url ?? resume?.url ?? null;

  return <HomePage apiSkills={apiSkills} resumeUrl={resumeUrl} />;
}
