
// export const T = {
//   cream: "#F5F0E8", creamDark: "#EDE7D9",
//   ink: "#111008",   inkSoft: "#2A2618",
//   amber: "#C8872A", amberLight: "#E8A23C",
//   sand: "#B8AA92",  sandLight: "#D4CAB8",
// };

export const T = {
  cream: "#F7F9FC", creamDark: "#E7EDF7",
  ink: "#0F1A4D",   inkSoft: "#1E2C6E",
  amber: "#4FA8F0", amberLight: "#82C6FF",
  sand: "#E5433F",  sandLight: "#F1897F",
};

export const SERVICES = [
  
  
  {
  n:"01",
  icon:"◎",
  title:"Meta Ads",
  tagline:"High-converting campaigns that turn attention into customers.",
  desc:"We create and optimize Facebook and Instagram advertising campaigns designed to generate leads, sales, and measurable growth. From strategy and creative testing to audience targeting and performance tracking, we manage the full advertising process.",
  features:[
    "Campaign strategy & account setup",
    "Audience research & targeting",
    "Ad creative direction",
    "Facebook & Instagram Ads management",
    "A/B testing & conversion optimization",
    "Performance reporting & analytics"
  ],
  tech:[
    "Meta Ads Manager",
    "Meta Pixel",
    "Conversions API",
    "Google Analytics 4",
    "Looker Studio",
    "Canva / Adobe Creative Suite"
  ],
  tiers: [
  {
    n: "Starter",
    p: "AED 3,000",
    d: "Campaign setup, tracking (Pixel), and initial ad strategy"
  },
  {
    n: "Growth",
    p: "AED 8,000/mo",
    d: "Full Meta Ads management, testing, optimization, and performance reporting"
  },
  {
    n: "Scale",
    p: "Custom",
    d: "Advanced scaling strategy, creative production, and multi-campaign management"
  }
]
},
  {
  n:"02",
  icon:"⬢",
  title:"Content Production",
  tagline:"High-impact visuals that build brands and drive attention.",
  desc:"We produce strategic photo and video content designed for modern platforms. From social campaigns to brand shoots, everything is created with performance and storytelling in mind.",
  features:[
    "Social media content strategy",
    "Product & brand photoshoots",
    "Short-form video (Reels / TikTok / Ads)",
    "Cinematic brand storytelling",
    "Creative direction & scripting",
    "Post-production & editing"
  ],
  tech:[
    "Adobe Premiere Pro",
    "After Effects",
    "Lightroom",
    "DaVinci Resolve",
    "Figma (storyboarding)",
    "CapCut / Mobile workflows"
  ],
 tiers: [
  { 
    n: "Starter", 
    p: "AED 3,500", 
    d: "Single content shoot session with professionally edited photo/video assets" 
  },
  { 
    n: "Growth", 
    p: "AED 9,000", 
    d: "Full content production (photo + video) for campaigns, including editing and delivery" 
  },
  { 
    n: "Studio", 
    p: "Custom", 
    d: "Ongoing monthly content production, creative direction, and asset delivery" 
  }
]
},
{
    n:"03", icon:"⬡", title:"Web Development", tagline:"High-performance applications built for scale.",
    desc:"We architect and build web products that are fast by default, maintainable by design, and engineered to grow with your business. From marketing sites to complex SaaS platforms, we've shipped it all.",
    features:["Next.js / React / Node.js","REST & GraphQL APIs","Database design & optimisation","Authentication & authorisation","CI/CD pipeline setup","Core Web Vitals & Lighthouse 100"],
    tech:["Next.js","TypeScript","Node.js","PostgreSQL","Redis","Vercel / AWS"],
tiers: [
  { 
    n: "Starter", 
    p: "AED 12,000", 
    d: "High-converting marketing website (up to 5 pages)" 
  },
  { 
    n: "Growth", 
    p: "AED 18,000", 
    d: "Custom website with CMS and scalable backend integration" 
  },
  { 
    n: "Enterprise", 
    p: "Custom", 
    d: "Advanced platforms, web applications, or system migrations" 
  }
]
  }
];

export const FAQS = [
  {
    q: "How long does a typical project take?",
    a: "Web development projects typically take 4–10 weeks depending on scope. Content production can be delivered within days, while Meta Ads campaigns can be launched within 5–7 days after strategy approval."
  },
  {
    q: "Do you work with startups or only established businesses?",
    a: "We work with both. From early-stage startups building their first presence to established brands scaling with performance marketing and content systems."
  },
  {
    q: "Do you manage Meta Ads or just set them up?",
    a: "We offer both. From initial campaign setup and tracking to full monthly management, optimization, and scaling strategies focused on ROI."
  },
  {
    q: "What’s included in your content production service?",
    a: "We handle the full pipeline: concept, shooting (photo/video), editing, and delivery of high-performing content tailored for ads and social media."
  },
  {
    q: "Can you handle everything end-to-end?",
    a: "Yes. We combine web development, content production, and paid advertising into one integrated system designed to drive measurable business results."
  },
  {
    q: "Do you offer ongoing support and growth services?",
    a: "Yes. We provide monthly retainers covering website maintenance, content production, and continuous Meta Ads optimization and scaling."
  }
];



export const CATEGORIES=["All","Web App","Brand + Web","Content Production"];

export const PROJECTS=[
  {id:"01",title:"Aurelia",sub:"Finance Platform",cat:"Web App",year:"2024",tags:["Next.js","Fintech"],desc:"Real-time trading dashboard with AI-powered insights and portfolio analytics.",bg:"#1A1508",acc:"#C8872A",
   

   results:["3.2s → 0.4s dashboard load","40% increase in daily active users","$2.4M processed in first month","99.98% uptime since launch"],
   services:["Web Development","UI/UX Design"]},
  {id:"02",title:"Nomad OS",sub:"Remote Work Hub",cat:"Mobile App",year:"2024",tags:["React Native","SaaS"],desc:"All-in-one workspace for distributed teams — time zones, async standups, team availability.",bg:"#080F0A",acc:"#4A8C5C",
  
   results:["4.8★ on both App Stores","12,000 downloads in 30 days","#1 Product Hunt of the day","68% 30-day retention"],
   services:["Mobile Development","UI/UX Design"]},
  {id:"03",title:"Botanica",sub:"E-Commerce",cat:"E-Commerce",year:"2023",tags:["Next.js","3D"],desc:"Immersive plant shop with WebGL AR product previews and subscription boxes.",bg:"#060A12",acc:"#4A6FA5",
   
   results:["62% reduction in return rates","3.1× conversion lift","AOV up 44%","Lighthouse score: 98"],
   services:["Web Development","UI/UX Design","SEO"]},
  {id:"04",title:"CTRL Studio",sub:"Brand + Digital",cat:"Brand + Web",year:"2023",tags:["Branding","Web"],desc:"Complete brand identity and award-winning digital presence for a Berlin creative studio.",bg:"#120812",acc:"#8B5CA5",
   
   results:["Awwwards Site of the Day","280% increase in inbound leads","Featured in Fonts In Use","Load time < 1.2s globally"],
   services:["UI/UX Design","Web Development"]},
  {id:"05",title:"Pulse Health",sub:"Telemedicine",cat:"SaaS",year:"2023",tags:["Mobile + Web","HIPAA"],desc:"HIPAA-compliant telemedicine platform serving 50,000+ patients with video consults.",bg:"#0A1212",acc:"#2E8B8B",
   
   results:["50,000+ registered patients","4.9★ App Store rating","94% consultation completion","HIPAA audit passed first attempt"],
   services:["Web Development","Mobile Development"]},
  {id:"06",title:"Vanta AI",sub:"SaaS Writing Tool",cat:"SaaS",year:"2024",tags:["SaaS","AI"],desc:"AI writing assistant with brand voice training, multi-language support, and team collaboration.",bg:"#0A0A0A",acc:"#8C8C2E",
   
   results:["0 → 2,400 paying users in 90 days","MRR $38k at month 3","$800k seed round closed","NPS score of 72"],
   services:["Web Development","UI/UX Design"]},
];



export const TEAM=[
  {name:"Marckenley Dorsainvil",role:"Founder & Lead Engineer",exp:"Node.js · System Design · API Architecture",ini:"KB",color:T.amber},
  {name:"Dave Andersy",role:"Backend Engineer",exp:"PHP · PostgreSQL · DevOps · AWS",ini:"MW",color:"#2E8B8B"},
  {name:"Sofia Marchetti",role:"Head of Design",exp:"Figma · Motion Design · Brand Strategy",ini:"SM",color:"#8B5CA5"},
  {name:"Arjun Kapoor",role:"Senior Mobile Engineer",exp:"React Native · iOS · Flutter",ini:"AK",color:"#4A6FA5"},
  {name:"Léa Fontaine",role:"SEO & Growth Lead",exp:"Technical SEO · Analytics · Content",ini:"LF",color:"#4A8C5C"},
  {name:"Khalifa ",role:"Content & Media Producer",exp:"Photography · Videography · Brand Storytelling · Social Media Content",ini:"KD",color:"#2E8B57"},
  // {name:"Yuna Park",role:"UI Engineer",exp:"Framer Motion · Tailwind · Accessibility",ini:"YP",color:"#8C8C2E"},
];

export const VALUES=[
  {i:"⬡",t:"Craft Over Speed",d:"We'd rather take an extra week and ship something we're proud of than rush something that embarrasses us."},
  {i:"◈",t:"Radical Transparency",d:"You always know exactly where the project stands. No surprises in demos, no surprises in invoices."},
  {i:"◉",t:"Partnership Mindset",d:"We think like co-founders, not contractors. Your success metrics are our success metrics."},
  {i:"◎",t:"Continuous Learning",d:"The web moves fast. We allocate 20% of our time to R&D so your projects always use the right tools."},
];

export const MILESTONES = [
  {
    year: "2023",
    event: "Foundation",
    desc: "Built a performance-driven studio focused on modern web development."
  },
  {
    year: "2024",
    event: "Full-funnel expansion",
    desc: "Added Meta Ads and content production to drive measurable growth."
  },
  {
    year: "2025",
    event: "Systemized delivery",
    desc: "Created an integrated model combining web, ads, and content into one growth engine."
  },
  {
    year: "2026",
    event: "Scaling brands",
    desc: "Helping businesses scale through performance marketing and high-converting digital platforms."
  }
];

export const SKILLS = [
  
  {n:"Paid Advertising (Meta Ads)",p:92},
  {n:"SEO & Performance Marketing",p:90},
  {n:"Content & Media Production",p:85},
  {n:"Web Development",p:98},
];







export const SERVICESHome = [
  

  { n:"01", title:"Meta Ads",      desc:"Data-driven Meta Ads campaigns that combine high-converting creatives with precise audience targeting to generate consistent leads and measurable ROI.", tags:["Meta Ads","Google Ads","Content Production","SEO Strategy"] },
   { 
    n:"02",
    title:"Content Production",
    desc:"High-impact visual content for social media and brands. From photoshoots to cinematic video, crafted to engage, convert, and elevate your digital presence.",
    tags:["Photography","Videography","Reels","Brand Content","Social Media"]
  },
  { n:"03", title:"Web Development & Design",   desc:"High-performance apps built with Next.js, React, and TypeScript. Scalable, accessible, and blazing fast.", tags:["Next.js","React","Node.js","TypeScript"] },
];

export const WORKS = [
  { id:"01", title:"Ifm Luxury",      sub:"Vehicle Rental Services",    year:"2024", tags:["Next.js","Car Rental Platform"],       desc:"Premium car rental platform with real-time fleet management, online bookings, and AI-powered business insights.", bg:"#1A1508", acc:"#C8872A" , link:"https://www.ifmluxurycars.com"},
  { id:"02", title:"Aevum Clinic",    sub:"Healthcare ",                year:"2023", tags:["Mobile + Web","Healthcare Platform"],    desc:"Platform serving 50,000+ patients globally.", bg:"#0A1212", acc:"#2E8B8B", link:"https://aevum-clinic.vercel.app/" },
  { id:"03", title:"Nomad OS",        sub:"Remote Work Hub",            year:"2024", tags:["React Native","SaaS"],     desc:"All-in-one workspace for distributed teams.", bg:"#080F0A", acc:"#4A8C5C", link:"" },
  { id:"04", title:"Botanica",        sub:"E-Commerce",                 year:"2023", tags:["Next.js","3D"],            desc:"Immersive plant shop with WebGL AR previews.", bg:"#060A12", acc:"#4A6FA5", link:"" },
  { id:"05", title:"CTRL Studio",     sub:"Brand + Digital",            year:"2023", tags:["Branding","Web"],          desc:"Complete brand identity and digital presence.", bg:"#120812", acc:"#8B5CA5", link:"" },
  { id:"06", title:"Vanta AI",        sub:"SaaS Writing Tool",          year:"2024", tags:["SaaS","AI"],               desc:"AI writing assistant with multi-language support.", bg:"#0A0A0A", acc:"#8C8C2E", link:"" },
];

export const STEPS = [
  { n:"01", t:"Discovery",       d:"Deep-dive into your business, audience, and competitors.", dur:"1 wk" },
  { n:"02", t:"Strategy",        d:"Tech stack, IA, design direction, and project blueprint.", dur:"1 wk" },
  { n:"03", t:"Design",          d:"High-fidelity Figma prototypes, iterated to perfection.", dur:"2–3 wk" },
  { n:"04", t:"Development",     d:"Agile sprints with live demos every Friday.", dur:"4–10 wk" },
  { n:"05", t:"QA & Perf",       d:"Cross-browser, a11y, and full Lighthouse audits.", dur:"1 wk" },
  { n:"06", t:"Launch & Growth", d:"Zero-downtime deploy, monitoring, ongoing improvements.", dur:"∞" },
];

export const TESTIMONIALS = [
  { q:"CRAFT delivered a product that exceeded every expectation. The attention to performance and design detail is something I've never seen.", a:"Sarah Chen", r:"CPO, Aurelia Finance" },
  { q:"They don't just build — they think. Every decision was explained. Genuinely the best agency experience I've had in 10 years.", a:"Marcus Webb", r:"CEO, Nomad OS" },
  { q:"Our organic traffic tripled in four months. Every service felt cohesive and intentional. Absolutely transformative.", a:"Leila Rashid", r:"Head of Growth, Botanica" },
];