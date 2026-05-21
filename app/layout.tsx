import type { Viewport } from "next";
import { AppSplashBoot } from "@/src/components/AppSplash";
import { SiteShell } from "../src/components/SiteShell";
import { ThemeProviderWrapper } from "../src/components/ThemeProviderWrapper";
import { JsonLd } from "@/src/components/JsonLd";
import { SeoHeadLinks } from "@/src/components/SeoHeadLinks";
import { fontVariables } from "@/src/lib/fonts";
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
      data-mode="gamify"
      className={fontVariables}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var mode = localStorage.getItem('app-mode');
                  document.documentElement.dataset.mode =
                    (mode === 'tech' || mode === 'gamify') ? mode : 'gamify';
                  /* app-mode — read by getBootAppMode() for splash + theme */
                  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                  localStorage.removeItem('theme');
                  var navLayout = localStorage.getItem('app-nav-layout');
                  document.documentElement.dataset.navDeck = navLayout === 'deck' ? 'open' : '';
                  document.documentElement.classList.add('splash-pending');
                } catch (e) {}
              })();
            `,
          }}
        />
        <SeoHeadLinks />
        <JsonLd data={rootJsonLdGraph()} />
      </head>
      <body className="min-h-dvh bg-muted-50 font-sans text-muted-900 antialiased transition-colors duration-300 dark:bg-muted-900 dark:text-muted-50">
        <AppSplashBoot />
        <ThemeProviderWrapper>
          <SiteShell>{children}</SiteShell>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
