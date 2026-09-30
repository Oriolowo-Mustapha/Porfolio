export const site = {
  name: "Oriolowo Mustapha",
  shortName: "Apha",
  role: "Software Engineer",
  title: "Oriolowo Mustapha — Software Engineer",
  description:
    "Backend-focused Software Engineer building secure, scalable web applications and REST APIs with C#/.NET and TypeScript/Node.js. Specialised in Clean Architecture, CQRS, and AI integration.",
  email: "oriolowomustapha@gmail.com",
  location: "Nigeria",
  availability: "Mon — Fri",
  available: true,
  yearsExperience: 3,
  resumeUrl: "/resume.pdf",
  whatsapp: "https://wa.me/2347031602720",
  university:
    "Federal University of Agriculture, Abeokuta (FUNAAB)",
  degree: "Computer Science",
  links: {
    github: "https://github.com/Oriolowo-Mustapha",
    linkedin: "https://www.linkedin.com/in/oriolowo-mustapha-29b769394/",
    twitter: "https://x.com/Apha_Base",
  },
} as const;

export const nav = [
  { label: "Index", href: "/#index" },
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
] as const;

export const bio = [
  {
    text: "Hello! I'm Mustapha, a Software Engineer dedicated to architecting robust, scalable systems that solve real-world challenges.",
    emphasis: ["Mustapha", "Software Engineer"],
  },
  {
    text: "With three years of industry experience, I specialise in building high-performance backends using C#/.NET, Node.js, and TypeScript. My approach is rooted in Clean Architecture and CQRS, ensuring the systems I build aren't just functional, but maintainable and future-proof.",
    emphasis: ["C#/.NET", "Node.js", "TypeScript", "Clean Architecture", "CQRS"],
  },
  {
    text: "I am currently pursuing my degree in Computer Science at the Federal University of Agriculture, Abeokuta (FUNAAB) — a path that provides the theoretical depth to match my practical, hands-on expertise. I am particularly passionate about the intersection of software and AI integration, constantly seeking ways to leverage emerging tech to optimise complex workflows.",
    emphasis: [
      "Computer Science",
      "Federal University of Agriculture, Abeokuta (FUNAAB)",
      "AI integration",
    ],
  },
] as const;

export const summary =
  "Backend-focused Software Engineer with strong full-stack experience, building secure, scalable web applications and REST APIs with TypeScript/Node.js and C# / ASP.NET Core. Specialised in clean architectures and AI/LLM integrations.";

export const experience = [
  {
    role: "Back End Developer",
    org: "Resumeefy",
    kind: "Contract",
    location: "Remote",
    start: "Dec 2025",
    end: "Present",
    current: true,
    bullets: [
      "Designed and built the Resumeefy Jobs Backend, managing the full lifecycle from the initial C# implementation to the current Node.js architecture.",
      "Utilised Express and Prisma to optimise API performance and database management.",
      "Implemented BullMQ for reliable message queuing in a fast-paced startup environment.",
    ],
    stack: [
      "JavaScript",
      "Express.js",
      "C#",
      "ASP.NET Web API",
      "GitHub",
      "Git",
    ],
  },
  {
    role: "Back End Developer",
    org: "HNG Tech",
    kind: "Internship",
    location: "Remote",
    start: "Oct 2025",
    end: "Dec 2025",
    current: false,
    bullets: [
      "Designed, developed, and implemented RESTful API endpoints for core application services using C#/Node.js, specifically focusing on all CRUD operations.",
      "Seamlessly integrated API logic with the underlying PostgreSQL or MongoDB database by utilising the ORM and writing optimised queries.",
    ],
    stack: ["ASP.NET MVC", "ASP.NET Web API", "C#", "Express.js", "JavaScript"],
  },
] as const;

export const skills = [
  {
    label: "Languages",
    items: [
      { name: "TypeScript", icon: "typescript" },
      { name: "C#", icon: "csharp" },
      { name: "Python", icon: "python" },
      { name: "SQL", icon: "database" },
      { name: "JavaScript", icon: "javascript" },
    ],
  },
  {
    label: "Frontend",
    items: [
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextjs" },
      { name: "Tailwind CSS", icon: "tailwind" },
      { name: "TanStack Query", icon: "query" },
      { name: "Zustand", icon: "box" },
    ],
  },
  {
    label: "Backend",
    items: [
      { name: "Node.js", icon: "nodejs" },
      { name: "ASP.NET Core", icon: "dotnet" },
      { name: "Express", icon: "express" },
      { name: "EF Core", icon: "network" },
    ],
  },
  {
    label: "Databases",
    items: [
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "MongoDB", icon: "mongodb" },
      { name: "MySQL", icon: "mysql" },
    ],
  },
] as const;

export type SkillIcon =
  (typeof skills)[number]["items"][number]["icon"];
