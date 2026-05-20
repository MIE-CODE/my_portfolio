import type { Viewport } from "next";
import { SiteShell } from "../src/components/SiteShell";
import { ThemeProviderWrapper } from "../src/components/ThemeProviderWrapper";
import { JsonLd } from "@/src/components/JsonLd";
import { SeoHeadLinks } from "@/src/components/SeoHeadLinks";
import { inter, jetbrainsMono } from "@/src/lib/fonts";
import { buildRootMetadata } from "@/src/seo/buildMetadata";
import { rootJsonLdGraph } from "@/src/seo/jsonLd";
import { SITE } from "@/src/seo/site";
import "../src/style/globals.css";

/** Default meta title, description, OG, Twitter, robots, canonical */
export const metadata = buildRootMetadata();

/** Viewport + theme-color (do not duplicate in a manual <head>) */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: SITE.themeColor,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={SITE.language}
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedTheme = localStorage.getItem('theme');
                  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const resolvedTheme = savedTheme === 'system' || !savedTheme 
                    ? (systemPrefersDark ? 'dark' : 'light')
                    : savedTheme;
                  if (resolvedTheme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <SeoHeadLinks />
        <JsonLd data={rootJsonLdGraph()} />
      </head>
      <body className="min-h-dvh bg-muted-50 font-sans text-muted-900 antialiased transition-colors duration-300 dark:bg-muted-900 dark:text-muted-50">
        <ThemeProviderWrapper>
          <SiteShell>{children}</SiteShell>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
