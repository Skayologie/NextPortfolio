import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { StructuredData } from "@/components/structured-data";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-mono",
});

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
        url: `${DATA.url}/web-app-manifest-512x512.png`,
        width: 1200,
        height: 630,
        alt: "Jawad Boulmal - Full Stack Developer",
        type: "image/jpeg",
      },
      {
        url: `${DATA.url}/web-app-manifest-512x512.png`,
        width: 800,
        height: 600,
        alt: "Jawad Boulmal - Full Stack Developer",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DATA.name,
    description: DATA.description,
    images: [`${DATA.url}/web-app-manifest-512x512.png`],
    creator: "@jawadboulmal", // Add your Twitter handle if you have one
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
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#000000",
      },
    ],
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "", // Add your Google Search Console verification code
    yandex: "", // Add your Yandex verification code
    yahoo: "", // Add your Yahoo verification code
    other: {
      "msvalidate.01": "", // Add your Bing verification code
    },
  },
  category: "technology",
  classification: "Portfolio Website",
  referrer: "origin-when-cross-origin",
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  alternates: {
    canonical: DATA.url,
    languages: {
      "en-US": DATA.url,
      "fr-FR": `${DATA.url}/fr`, // Add if you plan to support French
      "ar-MA": `${DATA.url}/ar`, // Add if you plan to support Arabic
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased relative",
          geist.variable,
          geistMono.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          <TooltipProvider delayDuration={0}>
            <div className="absolute inset-0 top-0 left-0 right-0 h-[100px] overflow-hidden z-0">
              <FlickeringGrid
                className="h-full w-full"
                squareSize={2}
                gridGap={2}
                style={{
                  maskImage: "linear-gradient(to bottom, black, transparent)",
                  WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
                }}
              />
            </div>
            <div className="relative z-10 max-w-2xl mx-auto py-12 pb-24 sm:py-24 px-6">
              {children}
            </div>
            <Navbar />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
