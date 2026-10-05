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
  resumeUrl: "/Oriolowo_Mustapha_General_Software_Engineer_Resume.pdf",
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

/**
 * Primary navigation. These are real routes, not in-page anchors, so the
 * dock's active state comes from the pathname rather than scroll position.
 * `icon` is a key rather than a component so this stays serialisable and
 * usable from server components.
 */
export const nav = [
  { label: "Home", href: "/", icon: "home" },
  { label: "About", href: "/about", icon: "about" },
  { label: "Roles", href: "/roles", icon: "roles" },
  { label: "Say hello", href: "/say-hello", icon: "contact" },
] as const;

/** Rotating titles in the hero. Also shown all at once under reduced motion. */
export const roleTitles = [
  "Software Engineer",
  "Backend Developer",
  "Clean Architecture Practitioner",
  "AI Integration Engineer",
] as const;

export const bio = [
  {
    text: "My name is Oriolowo Mustapha. I am a Software Engineer from Nigeria, focused on building secure, scalable systems that stay reliable, maintainable, and useful under real-world constraints.",
    emphasis: ["Oriolowo Mustapha", "Software Engineer", "Nigeria"],
    signal: ["secure, scalable systems"],
  },
  {
    text: "I work across backend architecture, API design, data modeling, background-job workflows, and product-facing interfaces. My core stack includes C#, ASP.NET Core, TypeScript, Node.js, Express, React, PostgreSQL, MySQL, MongoDB, Redis, and queue-based systems like Hangfire and BullMQ. I lean on Clean Architecture, CQRS, and MediatR to keep codebases easy to reason about and easy to change.",
    emphasis: [
      "backend architecture",
      "API design",
      "data modeling",
      "background-job workflows",
      "product-facing interfaces",
      "C#",
      "ASP.NET Core",
      "TypeScript",
      "Node.js",
      "Express",
      "React",
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Redis",
      "queue-based systems",
      "Hangfire",
      "BullMQ",
      "Clean Architecture",
      "CQRS",
      "MediatR",
    ],
    signal: ["easy to reason about", "easy to change"],
  },
  {
    text: "I have shipped systems across fintech, agritech, edtech, and AI tooling, from cooperative savings and escrow payments to multi-LLM diagnostics, fact-checking, and skill-assessment platforms. I care about clear engineering decisions, dependable execution, and building software that can grow without becoming difficult to change.",
    emphasis: [
      "fintech",
      "agritech",
      "edtech",
      "AI tooling",
      "cooperative savings",
      "escrow payments",
      "multi-LLM diagnostics",
      "fact-checking",
      "skill-assessment platforms",
      "clear engineering decisions",
    ],
    signal: ["dependable execution"],
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
    end: "Feb 2026",
    current: false,
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
      "C#",
      "TypeScript",
      "JavaScript (ES6+)",
      "SQL",
      "Python",
      "HTML5",
      "CSS3",
    ],
  },
  {
    label: "Backend",
    items: [
      "ASP.NET Core Web API (.NET 8 / .NET 10)",
      "Node.js and Express.js (v5)",
      "Entity Framework Core (code-first migrations) and Mongoose",
      "MediatR, FluentValidation, AutoMapper",
      "Passport.js and Multer",
      "REST API design, documented with Swagger/OpenAPI, NSwag, and Scalar",
    ],
  },
  {
    label: "Architecture and patterns",
    items: [
      "Clean (Onion) Architecture, CQRS, Domain-Driven Design",
      "Repository and Unit of Work",
      "Transactional Outbox, idempotent transactions",
      "Multi-tenant design, role-based access control",
      "Webhook design",
      "Background job processing (Hangfire, BullMQ, MassTransit, hosted workers)",
      "LLM fallback routing, exponential backoff, circuit breakers",
    ],
  },
  {
    label: "Databases",
    items: [
      "PostgreSQL, MongoDB, Redis, SQL Server, MySQL",
      "Schema design, stored procedures, LINQ",
    ],
  },
  {
    label: "Frontend",
    items: [
      "React 19, Vite, React Router v7",
      "TanStack Query, Zustand",
      "Tailwind CSS v4, Framer Motion, Radix UI, Lucide",
      "React Hook Form with Zod, Axios interceptors",
      "Responsive design and gamified, neumorphic UI",
    ],
  },
  {
    label: "Payments and fintech",
    items: [
      "Paystack, Nomba, ALATPay, Monnify",
      "HMAC webhook verification, virtual accounts, payouts, refunds, reversals",
      "Ledger accounting, reconciliation, escrow flows, BVN/KYC",
    ],
  },
  {
    label: "AI and LLM engineering",
    items: [
      "OpenAI (GPT-4o, GPT-4o-mini), Google Gemini, Groq, OpenRouter",
      "Multimodal and vision pipelines",
      "Structured outputs with Zod and JSON repair",
      "Prompt design and AI-generated assessments",
      "SerpAPI and the YouTube Data API",
    ],
  },
  {
    label: "Code execution",
    items: [
      "Judge0 sandbox, language-specific test harnesses for 6 languages",
    ],
  },
  {
    label: "Authentication and security",
    items: [
      "JWT with refresh-token rotation, Google OAuth 2.0, BCrypt, PBKDF2, HMAC signature verification, EXIF GPS/timestamp verification",
    ],
  },
  {
    label: "Cloud, DevOps and testing",
    items: [
      "Azure (App Service, Virtual Machines, Application Insights), Railway, Vercel",
      "Docker (multi-stage builds)",
      "Git and GitHub Actions (CI, CodeQL, Dependabot, branch protection)",
      "Serilog and Winston logging",
      "xUnit (unit, domain, integration), Postman",
    ],
  },
] as const;
