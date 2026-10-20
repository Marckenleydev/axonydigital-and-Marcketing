/**
 * All copy lives here so it can be edited without touching components.
 *
 * PLACEHOLDERS: every client name, logo, metric, case study, testimonial and certification
 * below is a clearly fictional stand-in. Replace them with verified, permissioned material
 * before launch, and only show a certification badge you actually hold.
 */

export const site = {
  name: "Axony Digital",
  short: "Axony",
  tagline: "Performance marketing agency",
  description:
    "Halcyon builds search, paid media and conversion systems that turn ad spend into booked calls and revenue. Book a free growth audit.",
  /** Registered company name, used in the legal pages. */
  legalName: "Axony Digital FZE LLC",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://axonydigital.com",
  email: "info@axonydigital.com",
  responseTime: "within one business day",
  /** Set to false once the sample figures/testimonials have been replaced with real ones. */
  showPlaceholderNotice: true,
};

export const hero = {
  eyebrow: "Performance marketing agency",
  // The italic portion is wrapped in <em> by the component.
  headlineA: "Get more leads,",
  headlineB: "not just more clicks.",
  sub: "We build search, paid and conversion systems that turn ad spend into booked calls and revenue — reported against your pipeline, not vanity metrics.",
  primaryCta: "Book your free audit",
  secondaryCta: "See what we run",
  reassurance: "Free 30-minute audit · No long-term contract",
};

export const logos = [
  "Alder & Rowe",
  "Kestrel Labs",
  "Maison Voss",
  "Tidewater",
  "Orbit Fitness",
  "Lumen Dental",
  "Fieldnote",
  "Brightline",
];

export const certifications = ["Google Partner", "Meta Business Partner", "HubSpot Certified"];

export const pains = {
  eyebrow: "Sound familiar?",
  scrub:
    "Most agencies sell activity. You need outcomes. Clicks, impressions and monthly decks don't pay salaries — qualified leads and profitable customers do. Here's what usually gets in the way.",
  items: [
    {
      problem: "Paying a retainer for reports nobody can tie to revenue?",
      fix: "We report on pipeline and cost per qualified lead, and show our working every month.",
    },
    {
      problem: "Traffic is up, but the phone isn't ringing?",
      fix: "We optimise for the conversion, not the click: tracking, landing pages and follow-up, together.",
    },
    {
      problem: "Struggling to scale acquisition without costs spiralling?",
      fix: "A structured testing roadmap. We scale what's proven and cut what isn't, fast.",
    },
  ],
};

export const services = {
  eyebrow: "What we do",
  heading: "Four disciplines. One goal: revenue.",
  items: [
     {
      title: "Performance Marketing",
      outcome: "Paid campaigns built to hit a target cost per lead or return on spend.",
      points: ["Google and Meta campaign management", "Offline and CRM conversion tracking", "Weekly bid and budget optimisation"],
    },
    {
      title: "Web Development",
      outcome: "Premium websites and digital platforms designed to showcase your brand, simplify operations, and turn more visitors into customers.",
      points: ["Custom website development", "E-commerce platforms", "API integrations"],
    },
   
    {
      title: "Content Production",
      outcome: "visual content for social media and brands. From photoshoots to cinematic video, crafted to engage, convert, and elevate your digital presence",
      points: ["Photoshoots", "Cinematic video", "Social media content"],
    },
    {
      title: "Social Media Management",
      outcome: "Strategic social media management to grow your audience, increase engagement, and build brand loyalty across all platforms.",
      points: ["Content scheduling", "Community management", "Analytics and reporting"],
    },
  ],
};

export type AdFormatId = "search" | "youtube" | "display" | "shopping" | "demandgen" | "pmax" | "local";

export const adShowcase = {
  eyebrow: "Google Ads, shown properly",
  heading: "Every format Google offers, and when each one earns its place.",
  intro:
    "Different goals need different formats. Here is how each one looks to your customer, and the business result it is built to deliver.",
  disclaimer:
    "All creatives shown are illustrative mockups with fictional brands. They are not client campaigns and do not represent verified results. Format availability varies by account, country and eligibility.",
  formats: [
    {
      id: "search" as AdFormatId,
      title: "Google Search Ads",
      objective: "Generate leads",
      description:
        "Appear at the exact moment someone searches for what you sell. Headlines, sitelinks and call buttons capture intent when it is highest.",
    },
    {
      id: "youtube" as AdFormatId,
      title: "YouTube Ads",
      objective: "Build awareness",
      description:
        "Put your story in front of the right audience with in-stream video and a clear call-to-action, before and during the content they chose.",
    },
    {
      id: "display" as AdFormatId,
      title: "Google Display Ads",
      objective: "Reach and retarget",
      description:
        "Visual banners across websites and apps keep your brand familiar and bring past visitors back to finish what they started.",
    },
    {
      id: "shopping" as AdFormatId,
      title: "Google Shopping Ads",
      objective: "Increase sales",
      description:
        "Product image, price and store name right in the results, so shoppers arrive already knowing what they want and what it costs.",
    },
    {
      id: "demandgen" as AdFormatId,
      title: "Google Demand Gen",
      objective: "Create demand",
      description:
        "Image and video ads across YouTube, Discover and Gmail, where eligible, reaching people while they browse, before they ever search.",
    },
    {
      id: "pmax" as AdFormatId,
      title: "Performance Max",
      objective: "Maximise conversions",
      description:
        "Supply your headlines, images, video and product feed once. One campaign distributes them across eligible Google channels toward the goals you set.",
    },
    {
      id: "local" as AdFormatId,
      title: "Google Maps & Local Ads",
      objective: "Attract local customers",
      description:
        "Stand out in local search and Maps, where eligible, so nearby customers can call, get directions or walk in.",
    },
  ],
};

export const results = {
  eyebrow: "The proof",
  heading: "Results are the only thing we sell.",
  metrics: [
    { to: 310, prefix: "+", suffix: "%", decimals: 0, label: "organic traffic growth" },
    { to: 4.2, prefix: "", suffix: "x", decimals: 1, label: "average return on ad spend" },
    { to: 38, prefix: "−", suffix: "%", decimals: 0, label: "cost per qualified lead" },
    { to: 127, prefix: "+", suffix: "%", decimals: 0, label: "landing page conversion lift" },
  ],
  cases: [
    {
  "client": "IFM LUXURYCARS Dubai",
  "sector": "Luxury Car Rental",
  "challenge": "Expensive ad clicks and a severe attribution gap meant the team couldn't identify which campaigns actually drove high-value fleet bookings.",
  "strategy": "Rebuilt search infrastructure around premium high-intent intent keywords, implemented precise server-side booking and phone tracking, and optimized geo-targeting around luxury hubs.",
  "outcome": "Cost per confirmed luxury rental booking fell by nearly half within the first ninety days.",
  "metric": { "value": "−46%", "label": "cost per confirmed booking" }
},
    {
      client: "Maison Voss",
      sector: "E-commerce",
      challenge: "Revenue had plateaued while ad spend kept climbing and margins shrank.",
      strategy: "Restructured Shopping and Performance Max around product margin, then rebuilt the product pages for conversion.",
      outcome: "Return on ad spend more than doubled on the same budget.",
      metric: { value: "2.3x", label: "return on ad spend" },
    },
    {
      client: "Kestrel Labs",
      sector: "B2B software",
      challenge: "Strong product, but almost all pipeline came from outbound and referrals.",
      strategy: "Built a topic-cluster content engine and demo-intent landing pages to capture existing search demand.",
      outcome: "Organic became the largest source of demo requests inside six months.",
      metric: { value: "#1", label: "source of demo requests" },
    },
  ],
};

export const testimonials = {
  eyebrow: "In their words",
  heading: "Founders who stopped guessing.",
  items: [
    {
      quote:
        "For the first time we can see exactly which campaigns produce booked appointments. The monthly report is something we actually read.",
      name: "Amelia Hartley",
      role: "Founder, Lumen Dental",
      videoUrl: "", // optional: link to a video testimonial; the button shows only when set
    },
    {
      quote:
        "They rebuilt our account structure in the first month and our margins improved straight away. No jargon, just clear next steps.",
      name: "Daniel Okafor",
      role: "Head of Growth, Maison Voss",
      videoUrl: "",
    },
    {
      quote:
        "Organic search went from an afterthought to our biggest pipeline source. They treat our budget like it's their own.",
      name: "Priya Raman",
      role: "VP Marketing, Kestrel Labs",
      videoUrl: "",
    },
  ],
};

export const contact = {
  eyebrow: "Your free growth blueprint",
  heading: "See where your next 100 leads are hiding.",
  sub: "Tell us about your business and we'll send a custom marketing blueprint: a prioritised plan covering your channels, tracking and quick wins. No cost, no obligation.",
  perks: [
    "A review of your current ads, SEO and tracking",
    "Three quick wins you can act on this week",
    "A realistic 90-day growth plan with budget ranges",
  ],
  budgets: ["Under $2k / month", "$2k – $5k / month", "$5k – $15k / month", "$15k – $50k / month", "$50k+ / month"],
  button: "Get my free blueprint",
  privacy: "We'll only use your details to send your blueprint and follow up. No spam, unsubscribe anytime.",
};

export const faqs = {
  eyebrow: "Questions",
  heading: "Before you ask.",
  items: [
    {
      q: "How long until we see results?",
      a: "Paid campaigns and high-impact social media assets show momentum within the first 4 to 8 weeks. Technical SEO, web architecture, and content engines compound value over 3 to 6 months. We map out specific milestones for each channel in your 90-day growth plan.",
    },
    {
      q: "Do you require long-term contracts?",
      a: "No. We operate on flexible monthly terms because we prefer to retain your partnership through performance rather than handcuffs. Most brands stick around because their digital infrastructure and revenue numbers keep moving up.",
    },
    {
      q: "How do you handle reporting and communication?",
      a: "You get a real-time analytics dashboard tracking core engineering metrics, traffic, conversion rates, and acquisition costs. We couple this with a monthly strategy review detailing what converted, what visual assets performed best, and what we are building next.",
    },
    {
      q: "What is required to start a web or production project?",
      a: "Every project kicks off with a discovery phase where we establish your technical scope, content needs, and media distribution framework. We deliver a comprehensive production blueprint and asset list before any code is written or cameras roll.",
    },
    {
      q: "Do I own all code, media assets, and data accounts?",
      a: "Absolutely. You maintain 100% ownership of your codebase, raw media files, creative assets, and advertising accounts. Everything runs on infrastructure you control, and it stays yours permanently.",
    },
    {
      q: "What happens after I get in touch?",
      a: "We analyze your current site, content footprint, and ad accounts, then schedule a short alignment call to walk through a custom roadmap. If your goals don't align with our core expertise, we will tell you upfront and point you in the right direction.",
    },
  ],
};


export const nav = [
  { label: "Services", href: "/services" },
  { label: "Clients", href: "/clients" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footer = {
  links: [
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Cookies Policy", href: "/cookies" },
  ],
  social: [
    { label: "LinkedIn", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "X", href: "#" },
  ],
};
