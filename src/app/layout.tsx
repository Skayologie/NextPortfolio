import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata:Metadata = {
  title: "Jawad Boulmal | Full-Stack Web Developer",
  description:
    "I'm Jawad Boulmal, a passionate and versatile full-stack web developer with a strong foundation in building dynamic, user-centric applications. Proficient in modern technologies like React and Next.js on the frontend, and PHP (Laravel), Node.js, and SQL on the backend, I specialize in crafting intuitive interfaces and scalable backend systems.",
  keywords: [
    "Jawad Boulmal",
    "Full-Stack Developer",
    "Web Developer",
    "Frontend Developer",
    "Backend Developer",
    "Next.js Developer",
    "React Developer",
    "JavaScript Developer",
    "PHP Developer",
    "Laravel Developer",
    "HTML CSS Developer",
    "Tailwind CSS",
    "Bootstrap",
    "MySQL",
    "Node.js",
    "REST API Developer",
    "Responsive Web Design",
    "Personal Portfolio",
    "Software Developer",
    "Modern Web Design",
    "Clean Code",
    "Dynamic Websites",
    "Freelance Developer",
    "Junior Web Developer",
    "Moroccan Developer",
    "Web App Developer",
    "SEO-Friendly Websites"
  ],
  openGraph: {
    title: "Jawad Boulmal | Full-Stack Web Developer",
    description:"Explore the portfolio of Jawad Boulmal, a skilled full-stack web developer specializing in modern web technologies like React & Next.js, Laravel, and React. Discover projects, skills, and services offered.",
    url: "https://jawadboulmal.com/",
    siteName: "Jawad Boulmal",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} >
        {children}
      </body>
      <script src="https://kit.fontawesome.com/352cf65264.js" async></script>

    </html>
  );
}
