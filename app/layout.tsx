/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dev MIE Portfolio",
  description:
    "This portfolio app, built with Next.js, showcases my skills as a frontend and mobile developer. It highlights my expertise in technologies like React, TypeScript, JavaScript, and Flutter, along with my ability to manage code using Git. The app demonstrates both my design and development abilities, featuring projects that span web and mobile platforms, with some backend work using Express.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
