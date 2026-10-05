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
      "Enterprise-grade climate-smart agriculture platform with multi-modal AI diagnostics, hyper-local climate-risk modeling, autonomous carbon MRV, and bankable Resilience Scores.",
    longDescription:
      "AgroGuardian AI is an enterprise-grade AgriTech backend platform engineered to bridge smallholder farming, multi-modal veterinary and agronomy intelligence, and the voluntary carbon-credit economy. It provides automated farm operations with instant visual diagnostics, climate-risk modeling conditioned on soil and irrigation, autonomous carbon measurement, reporting, and verification through EXIF-geofenced photographic proof, and a dynamic Resilience Score from 0–100. The backend uses Node.js, TypeScript, Express 5, MongoDB, Redis, and BullMQ.",
    stack: [
      "TypeScript",
      "Node.js",
      "Express 5",
      "MongoDB",
      "Mongoose",
      "Redis",
      "BullMQ",
      "Gemini 1.5 Flash",
      "GPT-4o",
      "Zod",
      "JWT",
      "Passport.js",
      "Google OAuth 2.0",
      "BCrypt.js",
      "RBAC",
      "Cloudinary",
      "Multer",
      "Winston",
      "React",
      "Vite",
      "Tailwind CSS",
    ],
    demoUrl: "https://agroguardian-frontend.vercel.app",
    backendUrl: "https://github.com/Adeyemiadigun/AgroGuardian_AI",
    frontendUrl:
      "https://github.com/Oriolowo-Mustapha/Agroguardian---Frontend",
    modules: [
      {
        title: "Carbon Credit & MRV Engine",
        detail:
          "Quantifies sequestration from farm area, regional climate coefficients, soil texture, crop multipliers, and practice duration. Validates additionality and photographic proof with EXIF GPS and timestamp checks, while scheduled BullMQ workers accrue verified balances.",
      },
      {
        title: "Soil-Aware Climate Oracle",
        detail:
          "Computes drought, flood, heat, pest, and disease exposure using soil drainage and irrigation context. Generates hourly planting, spraying, and harvesting viability flags from wind, precipitation, and soil-temperature thresholds.",
      },
      {
        title: "AI Veterinary & Plant Clinic",
        detail:
          "Analyzes crop and livestock images to assess disease severity and generate structured remediation protocols. Uses species-specific diagnostic routing, quarantine guidance, vaccination planning, and contextual follow-up threads.",
      },
      {
        title: "Resilience Scoring Engine",
        detail:
          "Produces a 0–100 Resilience Score from farm management, climate adaptation, and biodiversity measures. The score turns regenerative practices into bankable data for micro-lenders and crop insurers.",
      },
      {
        title: "Livestock Lifecycle OS",
        detail:
          "Provisions breeding milestones, nutrition checks, birthing preparation, and postpartum tracking. Cron-driven BullMQ workers schedule feeding reminders, deworming cycles, and vaccinations.",
      },
    ],
  },
  {
    slug: "verilens",
    title: "VeriLens",
    category: "AI · Verification",
    image: "/verilens.webp",
    description:
      "Production-grade multimodal fact-checking engine that cross-examines claims and images against live reporting, then returns an explainable Real, Fake, or Suspicious verdict with a 0–100 credibility score.",
    longDescription:
      "VeriLens is an AI-driven fact-checking engine that treats verification as active cross-examination rather than black-box classification. It retrieves contemporaneous reporting, checks contextual consistency between text claims and accompanying imagery, and generates transparent rationales backed by primary sources. The TypeScript and Express backend combines GPT-4o-mini, Gemini 2.5 Flash, SerpAPI news retrieval, Cloudinary media handling, and deterministic scoring. JWT authentication, refresh-token rotation, and role-based access protect user histories and administrative controls.",
    stack: [
      "TypeScript",
      "Node.js",
      "Express 5",
      "MongoDB",
      "Mongoose",
      "GPT-4o-mini",
      "Gemini 2.5 Flash",
      "SerpAPI",
      "Cloudinary",
      "Multer",
      "Brevo",
      "JWT",
      "Bcrypt",
      "RBAC",
      "Winston",
      "HTML5",
      "Tailwind CSS",
      "Vanilla JavaScript",
    ],
    demoUrl: "https://verilens-frontend.pxxl.click",
    backendUrl: "https://github.com/Oriolowo-Mustapha/VeriLens",
    frontendUrl:
      "https://github.com/Oriolowo-Mustapha/VeriLens-Frontend",
    modules: [
      {
        title: "Multimodal Claim Verification",
        detail:
          "Accepts claim text and optional JPG, PNG, or WebP evidence, then returns a Real, Fake, or Suspicious verdict with a 0–100 credibility score and an explainable journalistic breakdown.",
      },
      {
        title: "Live Journalism Cross-Referencing",
        detail:
          "Extracts high-signal keywords, queries SerpAPI Google News, and evaluates publisher identity, timestamps, consensus, and contradictions across contemporaneous reporting.",
      },
      {
        title: "Multi-LLM Fallback Architecture",
        detail:
          "Routes requests first to GPT-4o-mini and falls back to Gemini 2.5 Flash during rate limits or network failures. Strict JSON-schema validation prevents AI formatting drift.",
      },
      {
        title: "Forensic Image Alignment",
        detail:
          "Streams uploads through Cloudinary and assesses whether imagery genuinely depicts the claimed event, including temporal inconsistencies and synthetic-generation artifacts.",
      },
      {
        title: "Deterministic Scoring",
        detail:
          "Combines text confidence and visual alignment with a 60/40 weighted formula. Scores below 30 classify as Fake, 30–64 as Suspicious, and 65 or higher as Real, with overrides for verified debunks.",
      },
      {
        title: "Enterprise Security",
        detail:
          "Uses short-lived access tokens, seven-day refresh-token rotation, Bcrypt hashing, email verification, password reset, and role-based access control.",
      },
      {
        title: "History and Administration",
        detail:
          "Persists queries, model outputs, sources, breakdowns, confidence scores, and timestamps. Role-checked administrative routes support account auditing and permission promotion.",
      },
    ],
  },
  {
    slug: "ajocore",
    title: "AjoCore",
    category: "Fintech · Full-stack",
    image: "/Ajocore.webp",
    description:
      "Production-grade fintech backend that digitises Ajo, Esusu, and Adashe cooperative savings with automated virtual accounts, real-time webhook contribution tracking, and scheduled payout disbursement.",
    longDescription:
      "AjoCore modernises informal cooperative savings with a secure, transparent, and automated REST API. It supports ROSCA, ASCA, and personal saving cycles, automated Nomba virtual-account provisioning, HMAC-verified webhook contribution recording, idempotent payouts, and role-specific financial dashboards. The backend uses Clean Architecture across Domain, Application, Infrastructure, Persistence, and API layers, with CQRS via MediatR, FluentValidation, AutoMapper, Entity Framework Core with PostgreSQL, Hangfire, Serilog, Docker, Railway hosting, and a Vercel frontend.",
    stack: [
      ".NET 10",
      "ASP.NET Core",
      "C#",
      "PostgreSQL",
      "Entity Framework Core",
      "MediatR",
      "CQRS",
      "FluentValidation",
      "AutoMapper",
      "Hangfire",
      "Nomba API",
      "Brevo",
      "NSwag",
      "OpenAPI",
      "Serilog",
      "Docker",
      "Railway",
      "React 19",
      "TanStack Query",
      "Tailwind CSS v4",
      "Framer Motion",
      "Zod",
    ],
    demoUrl: "https://ajo-core-frontend-eta.vercel.app",
    backendUrl: "https://github.com/Oriolowo-Mustapha/AjoCore---Backend",
    frontendUrl: "https://github.com/Adeyemiadigun/AjoCore--Frontend",
    modules: [
      {
        title: "Multi-Scheme Saving Cycles",
        detail:
          "Supports ROSCA rotation, ASCA accumulation, and personal savings goals, including maturity payouts, payout-order management, and early liquidation with a 5% penalty.",
      },
      {
        title: "Cooperative Group Management",
        detail:
          "Provides group creation, invite links, direct and batch member additions, join requests, approvals, deactivation, removals, and date-filtered ledger views.",
      },
      {
        title: "Virtual Account Provisioning",
        detail:
          "Automatically provisions a dedicated Nomba virtual account for each member-cycle combination, so contributions are recorded by transferring money rather than entering records manually.",
      },
      {
        title: "Webhook Contribution Recording",
        detail:
          "Validates Nomba payloads with HMAC signatures and timestamps, enforces idempotency, records matching contributions in real time, and automatically reverses mismatched amounts.",
      },
      {
        title: "Automated Payout Disbursement",
        detail:
          "Runs a daily Hangfire liquidation sweep for ROSCA, ASCA, and personal-cycle payouts. Transfers are idempotent, bank details are validated, and members receive payout notifications.",
      },
      {
        title: "Contribution Reminders",
        detail:
          "Runs a daily Hangfire reminder service that emails members whose contributions are due within the next one to two days.",
      },
      {
        title: "Authentication and Authorisation",
        detail:
          "Provides registration, email verification, JWT access and refresh-token rotation, password recovery, BVN-backed KYC, and Trader, CooperativeAdmin, and SystemAdmin access controls.",
      },
      {
        title: "Financial Dashboards",
        detail:
          "Shows trader balances, cooperative and cycle aggregates, contribution and payout ledgers, system-wide statistics, live Nomba wallet balances, and controlled withdrawals.",
      },
      {
        title: "Profiles and Bank Services",
        detail:
          "Supports role-based profile management, payout-bank updates, Nigerian bank listings, and account-name verification before payout details are saved.",
      },
      {
        title: "Reversal Engine",
        detail:
          "Creates reversal-ledger entries for mismatched contributions, validates destination bank details, executes refunds, and sends an itemised HTML explanation.",
      },
    ],
  },
  {
    slug: "skill-matrix-2",
    title: "Skill-Matrix 2.0",
    category: "EdTech · AI",
    image: null,
    description:
      "Production-grade, multi-tenant skill-management platform with AI-generated assessments, sandboxed code execution in six languages, gamification, and personalised improvement plans.",
    longDescription:
      "Skill Matrix 2.0 assesses, tracks, and grows employee technical competencies through Groq-generated multiple-choice and coding assessments, Judge0 execution with hidden test cases, concept-level gap analysis, and AI-generated four-week improvement plans enriched with YouTube tutorials. It supports Learner, Manager, Admin, and SuperAdmin roles, organisation analytics, XP and streak gamification, Hangfire reminders, Brevo email, Cloudinary media, Google OAuth, and Scalar API documentation. The backend uses Clean Architecture, CQRS with MediatR, repository and unit-of-work persistence, FluentValidation, and Entity Framework Core with PostgreSQL.",
    stack: [
      "C#",
      "ASP.NET Core 8",
      "PostgreSQL",
      "Entity Framework Core 8",
      "MediatR",
      "CQRS",
      "FluentValidation",
      "Groq AI",
      "Judge0",
      "Hangfire",
      "Brevo",
      "Cloudinary",
      "YouTube Data API",
      "JWT",
      "Google OAuth 2.0",
      "BCrypt",
      "Scalar",
      "OpenAPI",
    ],
    backendUrl: "https://github.com/Oriolowo-Mustapha/Skill-Matrix-2.0",
    modules: [
      {
        title: "AI Skill Assessments",
        detail:
          "Generates tailored multiple-choice and coding assessments with concept tags, realistic time limits, autosaved responses, targeted re-assessments, and proficiency-level progression checks.",
      },
      {
        title: "Judge0 Code Execution",
        detail:
          "Wraps user solutions in language-specific harnesses for six languages, submits Base64 code to Judge0, polls for completion, maps compiler errors to user lines, and scores visible and hidden tests.",
      },
      {
        title: "Gamification Engine",
        detail:
          "Awards XP, resolves levels, tracks daily streaks with freeze and repair mechanics, and supports organisation leaderboards, badges, peer endorsements, and activity logging.",
      },
      {
        title: "Career Paths and Tracks",
        detail:
          "Manages career paths, specialised tracks, required skills, target proficiency levels, AI-generated catalogues, assignments, and cover images.",
      },
      {
        title: "AI Improvement Plans",
        detail:
          "Groups assessment misses by concept, generates structured four-week plans, fetches tutorial videos, links official documentation, and tracks task completion.",
      },
      {
        title: "Multi-Tenant Organisations",
        detail:
          "Supports organisation registration, team invitations, member profiles, skill coverage analytics, completion rates, and proficiency distribution across Learner, Manager, Admin, and SuperAdmin roles.",
      },
      {
        title: "Authentication and Security",
        detail:
          "Provides JWT authentication, Google OAuth, email verification, password reset, role-based authorisation, Bcrypt hashing, webhook-secret validation, and centralised error handling.",
      },
      {
        title: "Automated Email",
        detail:
          "Sends verification, password-reset, and weekly pending-assessment reminder emails through Brevo using a Hangfire recurring job.",
      },
      {
        title: "External Integrations",
        detail:
          "Accepts authenticated LMS webhooks, enriches plans through the YouTube Data API, and manages media uploads through Cloudinary.",
      },
      {
        title: "Dashboards and Analytics",
        detail:
          "Shows personal skills, streaks, XP, pending assessments, and organisation-wide coverage, completion, and proficiency metrics.",
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
  {
    slug: "instasafe",
    title: "InstaSafe",
    category: "Fintech · Escrow",
    image: "/Instasafe.png",
    description:
      "Production escrow backend for Nigerian social commerce. It secures buyer payments, automates vendor and rider payouts, and powers an AI-driven WhatsApp ordering chatbot on Azure infrastructure.",
    longDescription:
      "InstaSafe is a production-grade escrow API for vendors selling over WhatsApp and Instagram. It holds buyer funds after successful Paystack payments, releases them after OTP- or rider-verified delivery, and manages disputes, refunds, and automated payouts end to end. I designed and built the backend from scratch with .NET 10 and ASP.NET Core using Clean Architecture, CQRS with MediatR, FluentValidation, AutoMapper, Entity Framework Core with PostgreSQL, and 222 passing unit, domain, and integration tests. The system integrates Paystack, OpenWA WhatsApp, Groq AI, and Brevo, and is deployed to Azure App Service with a self-hosted OpenWA gateway on an Azure virtual machine.",
    stack: [
      ".NET 10",
      "ASP.NET Core",
      "C#",
      "PostgreSQL",
      "Entity Framework Core",
      "MediatR",
      "CQRS",
      "FluentValidation",
      "AutoMapper",
      "JWT",
      "Paystack",
      "OpenWA",
      "Groq AI",
      "Brevo",
      "Serilog",
      "Azure Application Insights",
      "Swagger",
      "OpenAPI",
      "xUnit",
      "Docker",
      "Azure App Service",
      "Azure Virtual Machine",
      "Vercel",
    ],
    demoUrl:
      "https://instasafe-atfzfsb6c7csbvek.westus3-01.azurewebsites.net",
    frontendUrl: "https://instasafe-six.vercel.app",
    modules: [
      {
        title: "Escrow Payment Lifecycle",
        detail:
          "Manages Draft, AwaitingPayment, Held, Delivered, and Released states, with Refunded, Disputed, and Cancelled exits. Amounts are handled in kobo to avoid floating-point errors.",
      },
      {
        title: "Dual Delivery Confirmation",
        detail:
          "Supports rider OTP confirmation with instant delivery-fee payout and a 24-hour vendor inspection window, plus buyer-code self-delivery with a 24-hour automatic-release backstop.",
      },
      {
        title: "WhatsApp Ordering Chatbot",
        detail:
          "Guides vendors through conversational order creation with intent classification, mid-flow corrections, resumable drafts, live bank-holder verification, and deterministic validation before any state changes.",
      },
      {
        title: "Paystack Financial Integration",
        detail:
          "Handles hosted checkout, webhook verification, vendor and rider transfers, refunds, real-time bank resolution, dedicated virtual accounts, and Nigeria’s bank list.",
      },
      {
        title: "Multi-Role Authentication",
        detail:
          "Provides JWT authentication for vendors, dispatch riders, and admins with role-scoped endpoints, audience-specific DTOs, reflection-tested PII controls, and server-side ownership enforcement.",
      },
      {
        title: "Background Workers",
        detail:
          "Uses a 15-second outbox publisher for WhatsApp and email notifications and a five-minute release worker for orders whose inspection or backstop windows have elapsed.",
      },
      {
        title: "Public Order Tracking",
        detail:
          "Offers anonymous credential-free tracking by order number or Paystack reference, showing status transitions while exposing only PII-stripped order data.",
      },
      {
        title: "Email Notifications",
        detail:
          "Sends payment receipts, order-status updates, and verification codes through Brevo SMTP.",
      },
      {
        title: "Admin Operations",
        detail:
          "Exposes statistics, vendor and order search, dispute management, manual refunds, force-release, payout retries, chat audits, webhook replay, and outbox-error inspection.",
      },
      {
        title: "Observability",
        detail:
          "Uses JSON-structured Serilog logging, file sinks on App Service, health checks, and optional Azure Application Insights telemetry and tracing.",
      },
    ],
  },
] as const satisfies readonly Project[];

export type ProjectSlug = (typeof projects)[number]["slug"];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Homepage selection, independent of the full index order. */
export const featuredSlugs = [
  "instasafe",
  "agroguardian-ai",
  "ajocore",
] as const satisfies readonly ProjectSlug[];
