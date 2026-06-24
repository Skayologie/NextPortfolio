import { type ReactNode } from "react";
import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Docker } from "@/components/ui/svgs/docker";
import { Java } from "@/components/ui/svgs/java";
import { SpringBoot } from "@/components/ui/svgs/springBoot";
import { Javascript } from "@/components/ui/svgs/javascript";
import { Angular } from "@/components/ui/svgs/angular";
import { Express } from "@/components/ui/svgs/express";
import { Tailwind } from "@/components/ui/svgs/tailwind";
import { Php } from "@/components/ui/svgs/php";
import { Laravel } from "@/components/ui/svgs/laravel";
import { Firebase } from "@/components/ui/svgs/firebase";
import { MongoDb } from "@/components/ui/svgs/mongoDb";
import { MySql } from "@/components/ui/svgs/mysql";
import { Aws } from "@/components/ui/svgs/aws";
import { Git } from "@/components/ui/svgs/git";
import { Ruby } from "@/components/ui/svgs/ruby";
import { Rails } from "@/components/ui/svgs/rails";

type HackathonLink = {
  title: string;
  href: string;
  icon: ReactNode;
};

export const DATA = {
  name: "Jawad Boulmal | Full Stack Developer",
  initials: "JB",
  url: "https://jawadboulmal.com",
  location: "Casablanca, Morocco",
  locationLink: "https://www.google.com/maps/place/casablanca",
  description:
    "Full Stack Developer . I love building robust architectures and solving complex backend problems. Open to new opportunities .",
  summary:
    "Currently, I am a Full Stack Java/Angular Developer motivated by creating performant and reliable web solutions. I am completing my training at YouCode - UM6P, where I specialize in Java/JEE and modern web frameworks. Recently, I completed a development internship at MediaVerse, where I helped build the 'Qarib' application using Nest.js and Flutter. I also enjoy building complex backend architectures, having developed a B2B management system called SmartShop and a collaborative platform for developers called DevHub.",
  avatarUrl: "/web-app-manifest-512x512.png",
skills: [
    // Row 1
    { name: "Java", icon: Java },
    { name: "Spring Boot", icon: SpringBoot },
    { name: "JavaScript", icon: Javascript },
    { name: "TypeScript", icon: Typescript },
    { name: "React", icon: ReactLight },
    { name: "Next.js", icon: NextjsIconDark },
    { name: "Angular", icon: Angular },
    { name: "Node.js", icon: Nodejs },
    { name: "Express", icon: Express },

    // Row 2
    { name: "Tailwind CSS", icon: Tailwind },
    { name: "PHP", icon: Php },
    { name: "Laravel", icon: Laravel },
    { name: "Firebase", icon: Firebase },
    { name: "MongoDB", icon: MongoDb },
    { name: "MySQL", icon: MySql },
    { name: "AWS", icon: Aws },
    { name: "Docker", icon: Docker },
    { name: "Git", icon: Git },
    { name: "Ruby", icon: Ruby },
    { name: "Ruby on Rails", icon: Rails },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "jawadboulmal@gmail.com",
    tel: "+212632773027",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/Skayologie",
        icon: Icons.github,
        navbar: true,
      },

      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/jawadboulmal/",
        icon: Icons.linkedin,

        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:jawadboulmal@gmail.com",
        icon: Icons.email,

        navbar: false,
      },
    },
  },

  work: [
    {
      company: "DabaDoc",
      href: "https://www.dabadoc.com/ma", // Add company URL if available
      badges: [],
      location: "Casablanca, Morocco",
      title: "Fullstack developer Ruby on rails & Angular & React.js",
      logoUrl: "/dabadoc.png", // Make sure to add this image to your public folder
      start: "February 2026",
      end: "Now",
      description:
          "Au sein de l'équipe technique de DabaDoc, je participe au développement de solutions de santé numérique innovantes. Mon travail se concentre sur la conception de fonctionnalités robustes en Ruby côté backend, alliées à des interfaces réactives et performantes développées avec Angular et React. J'interviens sur l'ensemble de la chaîne de valeur, de la prise de rendez-vous en ligne à la gestion complexe de cabinets médicaux.",
    },
    {
      company: "MediaVerse",
      href: "#", // Add company URL if available
      badges: [],
      location: "Safi, Morocco",
      title: "Fullstack Web/Mobile developer React ,Nest.js ,Next.js , Flutter",
      logoUrl: "/mediaverse.png", // Make sure to add this image to your public folder
      start: "Juin 2025",
      end: "Août 2025",
      description:
        "Contribution au développement de l'application 'Qarib'. Participation à la mise en place des fonctionnalités principales : Géolocalisation, Recherche et Filtrage des services. Optimisation de l'interface utilisateur (UI). Travail sur le backend avec Nest.js ainsi que sur le développement du tableau de bord administrateur. Technologies utilisées : Flutter, Nest.js, Next.js.",
    }
  ],
  education: [
    {
      school: "YOUCODE - UM6P",
      href: "#",
      degree: "Développeur Web Full Stack (Java/Angular/Spring)",
      logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIgHO_Fr0TwBcMUJ_e-DBJkPTKSNgux8YZqA&s",
      start: "2024",
      end: "2026",
    },
    {
      school: "Lycée Albouhtouri Casablanca",
      href: "#",
      degree: "Baccalauréat Sciences Expérimentales Option SVT",
      logoUrl: "/school.png",
      start: "2021",
      end: "2024",
    },
  ],
  projects: [
    {
      title: "envault",
      href: "https://github.com/Skayologie/envault",
      dates: "June 2026",
      active: true,
      description:
        "Zero-cloud, git-native .env encryption for teams. Share secrets securely through your existing Git repository using hybrid AES-256-GCM + RSA-4096 encryption — no third-party services, no monthly fees, no DevOps overhead. Published on npm.",
      technologies: [
        "TypeScript",
        "AES-256-GCM",
        "RSA-4096",
        "CLI",
        "npm",
        "Git",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/Skayologie/envault",
          icon: <Icons.github className="size-3" />,
        },
        {
          type: "npm",
          href: "https://www.npmjs.com/package/@jawadboulmal/envault",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/envault/cover.jpg",
      video: "",
    },
    {
      title: "WorkPilot",
      href: "https://github.com/Skayologie/WorkPilot",
      dates: "June 2026",
      active: true,
      description:
        "A personal work environment manager for Windows. One command starts everything you need for your day: Docker, VS Code, Chrome tabs, and project services. One command stops it all. A Telegram bot lets you control everything remotely from your phone.",
      technologies: [
        "PowerShell",
        "Python",
        "Telegram Bot API",
        "Docker",
        "Claude CLI",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/Skayologie/WorkPilot",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/workpilot/cover.jpg",
      video: "",
    },
    {
      title: "SHDownloader",
      href: "https://github.com/Skayologie/SHDownloader",
      dates: "May 2026",
      active: true,
      description:
        "A lightweight, terminal-based YouTube video and audio downloader powered by Python. Features one-command installation (Windows & macOS/Linux), smart playlist detection, auto-organization, and built-in self-updating via yt-dlp.",
      technologies: [
        "Python",
        "yt-dlp",
        "CLI",
        "PowerShell",
        "Bash",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/Skayologie/SHDownloader",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/SHDownload/cover.jpg",
      video: "",
    },
    {
      title: "L'7sab App",
      href: "https://www.l7sab.me",
      dates: "Projet en cours",
      active: true,
      description:
          "Application collaborative de gestion et de partage de dépenses de groupe. Permet la création de groupes, le suivi des transactions en temps réel et le calcul automatique des équilibres pour simplifier les remboursements entre participants. Focus sur une interface intuitive et une gestion précise des dettes.",
      technologies: [
        "Java",
        "Springboot",
        "PostgreSQL",
        "Next.js",
        "Tailwind CSS",
        "REST API",
      ],
      links: [
        {
          type: "Application",
          href: "https://github.com/Jawadboulmal",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/l7sabApp.png",
      video: "",
    },
    {
      title: "SmartShop",
      href: "https://github.com/Jawadboulmal",
      dates: "Projet Réalisé",
      active: true,
      description:
        "Application backend REST de gestion commerciale B2B. Gestion des clients, produits et commandes multi-produits avec système de fidélité automatique et remises progressives. Gestion des paiements fractionnés, calcul automatique (TVA, TTC) et architecture en couches avec tests JUnit/Mockito.",
      technologies: [
        "Spring Boot",
        "JPA/Hibernate",
        "PostgreSQL",
        "MapStruct",
        "Lombok",
        "JUnit",
        "Mockito",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/Jawadboulmal",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "https://www.opc-router.de/wp-content/uploads/2020/05/REST_socialmedia.jpg",
      video: "",
    },
  
    {
      title: "Qarib App",
      href: "#", // Add the live URL here if available, otherwise it defaults to the main link
      dates: "July 2025",
      active: true,
      description:
        "Qarib is a Flutter app that connects users with local service providers for easy booking and real-time order tracking. Features include geolocation and status updates.",
      technologies: [
        "Flutter",
        "Nest.js",
        "MySQL",
        "Digital Ocean",
        "Firebase",
      ],
      links: [
        // Only including links if they are not "#"
        // {
        //   type: "Website",
        //   href: "https://qarib.ma", 
        //   icon: <Icons.globe className="size-3" />,
        // },
      ],
      image: "https://qarib.ma/logo.jpeg",
      video: "",
    },
    {
      title: "DevHub",
      href: "https://github.com/Skayologie/CodeSpace/tree/develop",
      dates: "May 2025",
      active: false,
      description:
        "Plateforme inspirée de Reddit pour partager des idées entre développeurs. Fonctionnalités complètes incluant l'authentification, les publications, les commentaires et un système de vote. Interface responsive utilisant Blade et architecture MVC.",
      technologies: [
        "Laravel",
        "PHP",
        "Blade",
        "MySQL",
        "JavaScript",
        "Tailwind",
        "AJAX",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/Skayologie/CodeSpace/tree/develop",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/codespace.jpg",
      video: "",
    },
    {
      title: "Event Management Platform",
      href: "https://github.com/Skayologie/Eventbrite",
      dates: "Jan 2025",
      active: false,
      description:
        "An Eventbrite-inspired platform that enables users to create, discover, and manage events easily. Built with pure PHP and AJAX for dynamic interactions.",
      technologies: [
        "PHP",
        "HTML",
        "CSS3",
        "JavaScript",
        "AJAX",
        "Tailwind",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/Skayologie/Eventbrite",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/Eventbrite.png",
      video: "",
    },
  ],
  hackathons: [
    {
      title: "AIWA Hackathon",
      dates: "June 20th - June 22nd, 2025",
      location: "Safi, Morocco",
      description:
        "Developed 'MediMate', an AI-powered agent designed to provide intelligent medical assistance. Spent 48 hours coding and brainstorming to address real-world problems using AI. The event included workshops on Design Thinking and AI usability, fostering a deep learning environment alongside NBS Consulting and OCP Group.",
      image: "https://yt3.googleusercontent.com/huTnJOi3K2Jj3QAsfoZ6igbKyoqvBypFlx2u2Iyvi7EJ8fotMFhqMziExWuG575N5Ze51JokFA=s160-c-k-c0x00ffffff-no-rj", // Make sure to add this image to your public folder
      mlh: "",
      links: [] as HackathonLink[],
    },
    {
      title: "YouCode X Sofrecom Hackathon",
      dates: "Nov 14th 2025",
      location: "Youssoufia, Morocco",
      description:
        "An inspiring experience of collaboration and building under pressure. Worked with a dedicated team to push our limits and demonstrate the true power of collective effort. A test of commitment and creativity that resulted in a project we were genuinely proud of.",
      image: "/sofrecom.jpg",
      mlh: "",
      links: [] as HackathonLink[],
    },
  ] satisfies {
    title: string;
    dates: string;
    location: string;
    description: string;
    image?: string;
    mlh?: string;
    links: HackathonLink[];
  }[],
} as const;
