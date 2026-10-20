/**
 * Content for the personal biography page (/marckenlyg). The page is not linked from the
 * navigation, footer or sitemap, and is set to noindex in app/marckenlyg/page.tsx.
 *
 * Only details you've told me are used here. Add anything else (location, years of experience,
 * education, a photo, links, contact) in the fields below; empty fields are simply not shown.
 */

export const bio = {
  name: "Marckenley Dorsainvil",
  initial: "M",
  role: "Software Engineer",
  studio: "Axony Digital",
  intro: "I build fast, considered web experiences for brands that care how they show up online.",
  statement:
    "I run a Marketing & Software Development agency and work as a senior full-stack developer, building Mobile and web applications that look premium, feel effortless and hold up in production.",
  story: [
    "I'm the person behind Axony Digital, a web agency where I take on client projects across industries, from restaurant web applications to luxury and premium web experiences.",
    "My focus is the place where design and engineering meet: interfaces that are carefully crafted, animate with intent and stay fast on real devices. I build primarily with Next.js, TypeScript, Tailwind CSS and Framer Motion.",
  ],
 focus: {
    eyebrow: "What I build",
    heading: "Three kinds of work I do best.",
    items: [
      { 
        title: "Full-Stack Web Applications", 
        text: "Scalable, secure, and production-ready web apps built with modern frameworks, robust APIs, and optimized database architectures." 
      },
      { 
        title: "High-Performance Systems & Tools", 
        text: "Internal dashboards, automated workflows, and custom administrative tools designed to simplify complex operational data." 
      },
      { 
        title: "Premium Interactive Front-Ends", 
        text: "Refined, highly performant interfaces utilizing seamless motion, precise layouts, and optimized code to elevate digital products." 
      },
    ],
  },

  stack: {
    eyebrow: "Tools",
    heading: "The stack I reach for.",
    items: ["Next.js", "TypeScript", "Node.js", "AWS", "Java", "PostgreSQL", "MongoDB"],
  },
  /** Confirm each project is OK to show publicly, and edit or remove any that aren't. */
 work: {
    eyebrow: "Selected work",
    heading: "Advanced Engineering & Architecture",
    items: [
      { name: "Aevum Health Engine", kind: "Distributed EHR pipeline with AI-driven triage routing and end-to-end encryption" },
      { name: "Lexis Ledger Systems", kind: "Multi-tenant legal fintech platform with automated compliance audits and zero-knowledge data rooms" },
      { name: "Voyage OS", kind: "Event-driven microservices booking architecture handling 10k+ concurrent real-time transactions" },
      { name: "Gourmet Nexus", kind: "IoT-integrated kitchen orchestration engine and dynamic supply-chain forecasting dashboard" },
      { name: "Veraa Core", kind: "Edge-computed headless framework optimized for sub-100ms global latency and dynamic asset compilation" },
    ],
  },

  // Optional. Leave empty to hide. Example: { label: "LinkedIn", href: "https://..." }
  links: [] as { label: string; href: string }[],
  email: "",
};
