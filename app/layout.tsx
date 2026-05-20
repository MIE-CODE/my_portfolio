import { SiteShell } from "../src/components/SiteShell";
import { ThemeProviderWrapper } from "../src/components/ThemeProviderWrapper";
import { JsonLd } from "@/src/components/JsonLd";
import { inter, jetbrainsMono } from "@/src/lib/fonts";
import { buildRootMetadata } from "@/src/seo/buildMetadata";
import { rootJsonLdGraph } from "@/src/seo/jsonLd";
import { SITE } from "@/src/seo/site";
import "../src/style/globals.css";

export const metadata = buildRootMetadata();

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
        {/* rel=me — social graph ownership (GitHub, LinkedIn, Blivap) */}
        <link rel="me" href={SITE.github} />
        <link rel="me" href={SITE.linkedIn} />
        <link rel="me" href={SITE.blivap} />
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
