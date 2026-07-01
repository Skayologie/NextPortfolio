import { ThemeProvider } from "@/components/theme-provider";
import NextTopLoader from "nextjs-toploader";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { StructuredData } from "@/components/structured-data";
import { getActiveTheme, getSeoSettings } from "@/lib/portfolio-data";
import { buildThemeCSS, googleFontURL } from "@/lib/themes";
import type { ThemeKey } from "@/lib/themes";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-geist-mono",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoSettings();
  const ogImageUrl = seo.ogImage.startsWith("http")
    ? seo.ogImage
    : `${DATA.url}${seo.ogImage}`;
  const keywords = seo.keywords
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);

  return {
    metadataBase: new URL(DATA.url),
    title: {
      default: seo.title,
      template: `%s | ${seo.title}`,
    },
    description: seo.description,
    keywords,
    authors: [{ name: "Jawad Boulmal", url: DATA.url }],
    creator: "Jawad Boulmal",
    publisher: "Jawad Boulmal",
    formatDetection: { email: false, address: false, telephone: false },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: DATA.url,
      title: seo.title,
      description: seo.description,
      siteName: seo.title,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: seo.title, type: "image/png" }],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [ogImageUrl],
      creator: "@jawadboulmal",
    },
    verification: seo.googleVerification ? { google: seo.googleVerification } : undefined,
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    },
    manifest: "/site.webmanifest",
    category: "technology",
    classification: "Portfolio Website",
    referrer: "origin-when-cross-origin",
    alternates: {
      canonical: DATA.url,
      types: { "application/rss+xml": `${DATA.url}/blog/rss.xml` },
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { themeKey, fontFamily } = await getActiveTheme();
  const themeCSS = buildThemeCSS(themeKey as ThemeKey, fontFamily);
  const gFontURL = googleFontURL(fontFamily);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData />
        <link rel="dns-prefetch" href="https://github.com" />
        <link rel="dns-prefetch" href="https://linkedin.com" />
        <link rel="dns-prefetch" href="https://xdpqcrqkfauvdzdttcjr.supabase.co" />
        {gFontURL && (
          <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link rel="stylesheet" href={gFontURL} />
          </>
        )}
        <style dangerouslySetInnerHTML={{ __html: themeCSS }} />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased relative",
          geist.variable,
          geistMono.variable,
          jakarta.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          <NextTopLoader color="hsl(var(--primary))" shadow={false} showSpinner={false} height={2} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
