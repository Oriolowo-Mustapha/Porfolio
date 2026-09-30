export type ProjectModule = {
  title: string;
  detail: string;
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  image: string | null;
  /** Set when the project has no public URL — rendered as a plain label. */
  backendOnly?: boolean;
  description: string;
  longDescription: string;
  stack: readonly string[];
  demoUrl?: string;
  backendUrl?: string;
  frontendUrl?: string;
  modules: readonly ProjectModule[];
};

export const projects = [
  {
    slug: "agroguardian-ai",
    title: "AgroGuardian AI",
    category: "AI · Agriculture",
    image: "/agroguardian.webp",
    description:
      "Sophisticated AI-powered analytics engine for climate-smart agriculture and regenerative farming. Built with a TypeScript Node.js backend and a React/Vite frontend, it delivers AI-driven insights, weather risk analytics, and carbon-credit tracking to help farmers reduce risk and optimise decisions.",
    longDescription:
      "AgroGuardian AI is an end-to-end solution for modern agriculture. The TypeScript backend orchestrates a multi-model AI engine (GPT + Gemini) with self-healing fallbacks and Zod-validated structured outputs. The React frontend provides a seamless 7-day weather risk analysis experience, featuring manual sync triggers, success/error notifications, and context-aware risk badges for drought, flood, and pests based on soil and irrigation data.",
    stack: [
      "TypeScript",
      "Node.js",
      "React",
      "Express",
      "MongoDB",
      "Redis",
      "BullMQ",
      "Gemini AI",
      "OpenAI",
      "Prisma",
      "React Query",
      "Zustand",
      "Zod",
      "Cloudinary",
      "JWT",
      "Vite",
      "Tailwind CSS",
    ],
    demoUrl: "https://agroguardian-frontend.vercel.app",
    backendUrl: "https://github.com/Adeyemiadigun/AgroGuardian_AI",
    frontendUrl:
      "https://github.com/Oriolowo-Mustapha/Agroguardian---Frontend",
    modules: [
      {
        title: "Carbon Credit & AI Verification",
        detail:
          "Calculates tons CO2e using dynamic formulas (Area × CarbonFactor × CropMultiplier). Uses AI vision verification to validate sustainable practice evidence photos.",
      },
      {
        title: "Enhanced Climate Risk System",
        detail:
          "Produces context-aware risk assessments for Drought, Flood, and Heat. Generates “precision windows” for planting, harvesting, and spraying based on rain/wind constraints.",
      },
      {
        title: "AI-Vet & Livestock Health",
        detail:
          "Vision-based diagnosis for cattle and poultry, providing species-specific biosecurity guidance, vaccination schedules, and automated breeding tracking.",
      },
      {
        title: "Multi-model AI & Resilience",
        detail:
          "Integrates multiple LLMs with self-healing fallbacks and JSON repair. Computes a 0–100 Resilience Score representing farm adaptation and diversity.",
      },
    ],
  },
  {
    slug: "verilens",
    title: "VeriLens",
    category: "AI · Verification",
    image: "/verilens.webp",
    description:
      "VeriLens is an AI-powered fake news detection and verification platform that helps users evaluate news content (text and optionally images) and classify it as Fake, Real, or Suspicious. Built as a TypeScript Node.js/Express + MongoDB backend, paired with a lightweight web frontend.",
    longDescription:
      "VeriLens focuses on “trustworthy information” by providing AI-driven news verification, image claim analysis, and credibility scoring (0–100) to indicate certainty. The platform offers a real-time verification flow, user accounts with analysis history, and a dedicated admin interface for user management and role promotion.",
    stack: [
      "TypeScript",
      "Node.js",
      "Express",
      "MongoDB",
      "Gemini AI",
      "HTML",
      "Tailwind CSS",
      "Vanilla JavaScript",
    ],
    demoUrl: "https://verilens-frontend.pxxl.click",
    backendUrl: "https://github.com/Oriolowo-Mustapha/VeriLens",
    frontendUrl:
      "https://github.com/Oriolowo-Mustapha/VeriLens-Frontend",
    modules: [
      {
        title: "AI News & Image Verification",
        detail:
          "Analyses news text and optional image uploads to provide a verdict (FAKE | REAL | SUSPICIOUS) with detailed reasoning.",
      },
      {
        title: "Credibility Scoring",
        detail:
          "Returns a confidence score from 0–100 based on AI analysis to help users gauge information certainty.",
      },
      {
        title: "User Accounts & History",
        detail:
          "Secure authentication system allowing users to track and review their past analysis records.",
      },
      {
        title: "Admin Management",
        detail:
          "Centralised dashboard for administrators to oversee platform users and manage account permissions.",
      },
    ],
  },
  {
    slug: "ajocore",
    title: "AjoCore",
    category: "Fintech · Full-stack",
    image: "/Ajocore.webp",
    description:
      "A production-grade cooperative savings platform that digitises traditional Nigerian Ajo/Esusu. It automates contributions, rotational payouts, and group lifecycle management with real-time payment processing via Nomba virtual accounts and webhooks.",
    longDescription:
      "AjoCore replaces the informal, trust-based Ajo/Esusu savings model with a digital-first system. Cooperative Admins create savings groups, configure saving cycles (Personal, ROSCA, or ASCA schemes), and monitor contribution/payout ledgers. Traders discover and join groups, contribute via auto-generated virtual bank accounts, and receive automated rotational payouts. System Admins oversee platform-wide metrics and the Nomba wallet. Every naira is tracked through granular ledgers (ContributionLedger, PayoutLedger, ReversalLedger), and all payments are processed in real time via Nomba's webhook infrastructure — no manual reconciliation required.",
    stack: [
      "React 19",
      ".NET 10",
      "TypeScript",
      "PostgreSQL",
      "Nomba API",
      "MediatR",
      "CQRS",
      "Hangfire",
      "TanStack Query",
      "Tailwind CSS v4",
      "Framer Motion",
      "Zod",
      "EF Core",
      "FluentValidation",
      "Docker",
    ],
    demoUrl: "https://ajo-core-frontend-eta.vercel.app",
    backendUrl: "https://github.com/Oriolowo-Mustapha/AjoCore---Backend",
    frontendUrl: "https://github.com/Adeyemiadigun/AjoCore--Frontend",
    modules: [
      {
        title: "Real-Time Payment Processing",
        detail:
          "Dynamic Nomba virtual accounts per user, inbound payment detection via signed webhooks, and automated contribution recording with duplicate protection.",
      },
      {
        title: "Rotational Payout Engine",
        detail:
          "Automated scheduling and execution of rotational payouts with reorderable payout slots and early liquidation support (with 5% penalty).",
      },
      {
        title: "Automated Background Jobs",
        detail:
          "Hangfire-powered recurring tasks for liquidation sweeps, reversal processing, and email reminders for upcoming/overdue contributions.",
      },
      {
        title: "Multi-Role Dashboards",
        detail:
          "Role-specific dashboards (Trader, Cooperative Admin, System Admin) with real-time balance cards, cycle progress tracking, and contribution charts via Recharts.",
      },
    ],
  },
  {
    slug: "skill-matrix-2",
    title: "Skill-Matrix 2.0",
    category: "EdTech · AI",
    image: null,
    backendOnly: true,
    description:
      "A robust C#/.NET backend Web API (currently in development, frontend pending) for an AI-powered skill assessment platform. It enables dynamic proficiency evaluation and personalised growth planning.",
    longDescription:
      "Currently focused on the backend infrastructure, Skill-Matrix-2.0 leverages Clean (Onion) Architecture and AI to generate contextual assessments. It analyses user performance to identify skill gaps and provides targeted learning recommendations. The system is designed for multi-role team management, with the frontend planned for a future phase.",
    stack: [
      "C#",
      ".NET",
      "ASP.NET Core",
      "PostgreSQL",
      "EF Core",
      "Clean Architecture",
      "MassTransit",
      "JWT",
      "BCrypt.Net",
      "AI Integration",
    ],
    backendUrl: "https://github.com/Oriolowo-Mustapha/Skill-Matrix-2.0",
    modules: [
      {
        title: "AI Assessment Engine (Backend)",
        detail:
          "Core logic for dynamically generating test questions based on selected skills and proficiency levels.",
      },
      {
        title: "Performance Analytics",
        detail:
          "Backend processing of assessment results to identify weaknesses and track score trends over time.",
      },
      {
        title: "Personalised Growth Logic",
        detail:
          "Algorithmic generation of focus areas and targeted learning resource recommendations based on user gaps.",
      },
      {
        title: "Multi-Role Auth & Management",
        detail:
          "Secure backend implementation for Learner, Manager, and Admin roles with team oversight capabilities.",
      },
    ],
  },
  {
    slug: "resumeefy-jobs-backend",
    title: "Resumeefy Jobs Backend",
    category: "Jobs · Backend",
    image: null,
    description:
      "A scalable Node.js (Express) REST API for a job board platform, featuring JWT auth, role-based access, background processing with BullMQ, and Google OAuth.",
    longDescription:
      "Built with clean architecture, this backend supports Admin, Employer, and Job Seeker workflows. It includes production-grade features like refresh token rotation, email verification, Swagger documentation, and robust security protections. Background tasks for emails and maintenance are handled asynchronously using BullMQ and Redis.",
    stack: [
      "Node.js",
      "Express",
      "MongoDB",
      "BullMQ",
      "Redis",
      "JWT",
      "Google OAuth",
      "Swagger",
      "Cloudinary",
    ],
    demoUrl: "https://resumeefy-jobs-backend-js.onrender.com/",
    backendUrl:
      "https://github.com/Resumeefy-Jobs/resumeefy-jobs-backend-js-",
    modules: [
      {
        title: "Multi-Role Marketplace",
        detail:
          "Comprehensive workflows for Admins, Employers, and Job Seekers with dedicated dashboard logic.",
      },
      {
        title: "Advanced Auth & RBAC",
        detail:
          "Secure JWT implementation with refresh token rotation, Google OAuth, and granular role permissions.",
      },
      {
        title: "Background Processing",
        detail:
          "Reliable async task management using BullMQ and Redis for system notifications and maintenance.",
      },
      {
        title: "Security & Documentation",
        detail:
          "Hardened API with automated security middleware and full Swagger/OpenAPI documentation.",
      },
    ],
  },
  {
    slug: "fevm-lost-found",
    title: "FEVM Lost & Found Engine",
    category: "Blockchain · AI",
    image: null,
    backendOnly: true,
    description:
      "A decentralised lost-and-found matching engine for the Filecoin EVM (FEVM). It uses Gemini AI for semantic and visual matching of items reported on-chain.",
    longDescription:
      "This automated agent monitors FEVM smart contracts for LOST and FOUND reports, fetching images from IPFS to perform high-confidence (95%+) multi-modal analysis using Google Gemini. Confirmed matches are recorded back on-chain via signed transactions, creating a tamper-resistant, automated recovery system.",
    stack: [
      "Node.js",
      "FEVM",
      "Solidity",
      "Gemini AI",
      "Ethers.js",
      "IPFS",
      "Pinata",
      "Express",
    ],
    backendUrl: "https://github.com/Oriolowo-Mustapha/Dl-F",
    modules: [
      {
        title: "AI Matching Agent",
        detail:
          "Multi-modal engine using Gemini to perform semantic and visual analysis for high-confidence matching.",
      },
      {
        title: "On-Chain Automation",
        detail:
          "Watches FEVM smart contracts for events and automatically records verified matches back to the blockchain.",
      },
      {
        title: "IPFS Integration",
        detail:
          "Securely pins item images to IPFS via Pinata for decentralised storage and AI vision retrieval.",
      },
      {
        title: "Smart Contract Layer",
        detail:
          "Solidity-based registry on Filecoin EVM that handles tamper-resistant storage of reported items.",
      },
    ],
  },
  {
    slug: "gatepass-system",
    title: "Gatepass System",
    category: "Security · Access",
    image: "/gatepass.webp",
    description:
      "A secure, role-based Gatepass Management REST API and frontend built with .NET 10 and Clean Architecture. It manages controlled organisation access via unique QR codes, visitor tracking, and automated security workflows.",
    longDescription:
      "Gatepass System is an enterprise-grade solution for managing organisational security and visitor movement. It features a modern, responsive UI built with Tailwind CSS and a robust .NET 10 backend. The system supports multi-role access (Administrator, Host, Security), real-time QR code verification via device cameras, and comprehensive reporting on visitor logs and overstay alerts.",
    stack: [
      ".NET 10",
      "ASP.NET Core",
      "PostgreSQL",
      "EF Core",
      "MediatR",
      "CQRS",
      "FluentValidation",
      "Tailwind CSS",
      "Vanilla JavaScript",
      "QR Scanner",
    ],
    demoUrl: "https://gatepass-code-generator-system-fron.vercel.app",
    backendUrl:
      "https://github.com/Oriolowo-Mustapha/Gatepass-Code-Generator-System",
    frontendUrl:
      "https://github.com/Oriolowo-Mustapha/Gatepass-Code-Generator-System-Frontend",
    modules: [
      {
        title: "QR Code Generation & Scanning",
        detail:
          "Automated QR code generation for approved requests with built-in camera scanning for instant security verification.",
      },
      {
        title: "Visitor Tracking & Logs",
        detail:
          "Real-time monitoring of visitor check-in/check-out status with automated movement tracking and daily log reporting.",
      },
      {
        title: "Role-Based Security",
        detail:
          "Granular access control for Admins, Hosts, and Security personnel, featuring JWT-based authentication and secure password recovery.",
      },
      {
        title: "Clean Architecture",
        detail:
          "Built with MediatR (CQRS) and Clean Architecture principles to ensure scalability, testability, and maintainable code structure.",
      },
    ],
  },
] as const satisfies readonly Project[];

export type ProjectSlug = (typeof projects)[number]["slug"];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** First three, matching the previous featured slot. */
export const featured = projects.slice(0, 3);
