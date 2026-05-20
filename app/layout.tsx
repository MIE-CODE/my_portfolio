/* eslint-disable @next/next/no-page-custom-font */
import { SiteShell } from "../src/components/SiteShell";
import { ThemeProviderWrapper } from "../src/components/ThemeProviderWrapper";
import { JsonLd } from "@/src/components/JsonLd";
import { buildRootMetadata } from "@/src/seo/buildMetadata";
import { personJsonLd, webSiteJsonLd } from "@/src/seo/jsonLd";
import { SITE } from "@/src/seo/site";
import "../src/style/globals.css";

export const metadata = buildRootMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={SITE.language} suppressHydrationWarning>
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="alternate icon" href="/favicon.svg" />
        <link rel="icon" type="image/svg+xml" sizes="any" href="/icon.svg" />
        <link rel="apple-touch-icon" href="/apple-icon.svg" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content={SITE.themeColor} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        <JsonLd data={[personJsonLd(), webSiteJsonLd()]} />
      </head>
      <body className="bg-muted-50 dark:bg-muted-900 text-muted-900 dark:text-muted-50 transition-colors duration-300">
        <ThemeProviderWrapper>
          <SiteShell>{children}</SiteShell>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
