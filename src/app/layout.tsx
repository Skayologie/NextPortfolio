import { ThemeProvider } from "@/components/theme-provider";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { StructuredData } from "@/components/structured-data";
import { getActiveTheme } from "@/lib/portfolio-data";
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

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: DATA.name,
    template: `%s | ${DATA.name}`,
  },
  description: DATA.description,
  keywords: [
    "Jawad Boulmal",
    "Full Stack Developer",
    "Java Developer",
    "Angular Developer",
    "Spring Boot",
    "React Developer",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Morocco Developer",
    "Casablanca",
    "Web Development",
    "Backend Development",
    "Frontend Development",
    "Software Engineer",
    "Portfolio",
    "YouCode UM6P",
    "MediaVerse",
    "REST API",
    "PostgreSQL",
    "MySQL",
    "Docker",
    "AWS",
    "Laravel",
    "PHP",
    "Flutter",
    "Nest.js"
  ],
  authors: [
    {
      name: "Jawad Boulmal",
      url: DATA.url,
    },
  ],
  creator: "Jawad Boulmal",
  publisher: "Jawad Boulmal",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: DATA.url,
    title: DATA.name,
    description: DATA.description,
    siteName: DATA.name,
    images: [
      {
        url: `${DATA.url}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Jawad Boulmal - Full Stack Developer",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DATA.name,
    description: DATA.description,
    images: [`${DATA.url}/opengraph-image`],
    creator: "@jawadboulmal",
  },
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
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  category: "technology",
  classification: "Portfolio Website",
  referrer: "origin-when-cross-origin",
  alternates: {
    canonical: DATA.url,
    types: {
      "application/rss+xml": `${DATA.url}/blog/rss.xml`,
    },
  },
};

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
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
