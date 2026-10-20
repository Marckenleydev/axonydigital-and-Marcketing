/**
 * DRAFT legal pages, written as a generic starting point for a marketing agency.
 * They are NOT legal advice and are not tailored to your company, services or jurisdiction.
 * Have a qualified lawyer review and adapt them (especially governing law, liability limits,
 * data-protection roles and the cookies actually set on your site) before you publish.
 */
import { site } from "@/lib/content";

export type LegalBlock = string | { list: string[] };
export type LegalSection = { id: string; heading: string; body: LegalBlock[] };
export type LegalDoc = {
  slug: "terms" | "privacy" | "cookies";
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
};

const updated = "October 19, 2026";
const co = site.legalName;
const email = site.email;

export const terms: LegalDoc = {
  slug: "terms",
  title: "Terms of Service",
  updated,
  intro: `These terms govern your use of this website and the marketing services offered by ${co} ("${site.name}", "we", "us"). By using the site or engaging us, you agree to them.`,
  sections: [
    {
      id: "agreement",
      heading: "1. Agreement",
      body: [
        "By accessing this website you accept these terms. If you do not agree, please do not use the site.",
        "Where we provide services under a separate proposal, statement of work or services agreement, that document applies to those services. If it conflicts with these terms, the signed document prevails.",
      ],
    },
    {
      id: "services",
      heading: "2. Our services",
      body: [
        "We provide digital marketing services, paid media management, Web design and development, Content & Media Production, and Social Media Management. The scope, deliverables, timelines and fees for each engagement are set out in writing before work begins.",
        "Information on this website is general in nature and is not a binding offer. Descriptions of ad formats and platform features are illustrative; availability varies by account, country and eligibility.",
      ],
    },
    {
      id: "use",
      heading: "3. Using this website",
      body: [
        "You agree to use the site lawfully and not to:",
        { list: ["attempt to gain unauthorised access to the site, its servers or other users' data", "introduce malware or interfere with the site's operation", "scrape or copy content at scale without our written permission", "submit false or misleading information through our forms"] },
      ],
    },
    {
      id: "client",
      heading: "4. Client responsibilities",
      body: [
        "To deliver the services we may need access to your accounts, analytics, website and brand materials. You agree to provide accurate information and timely access, and to confirm you have the right to authorise our work on those assets.",
        "You remain responsible for the legality of your products, offers and claims, and for complying with the advertising policies of the platforms we use on your behalf.",
      ],
    },
    {
      id: "fees",
      heading: "5. Fees and payment",
      body: [
        "Fees are as agreed in writing. Unless we state otherwise, advertising spend is paid directly by you to the advertising platform and is separate from our fees.",
        "Invoices are payable within the period stated on the invoice. We may pause work on overdue accounts after giving you notice.",
      ],
    },
    {
      id: "results",
      heading: "6. No guarantee of results",
      body: [
        "Marketing outcomes depend on many factors outside our control, including competition, market conditions, platform changes, your product and your sales process. We work diligently to improve performance but cannot guarantee specific rankings, traffic, leads, sales or returns.",
        "Any figures, case studies or examples on this website are illustrative unless clearly stated otherwise and are not a promise of future results.",
      ],
    },
    {
      id: "platforms",
      heading: "7. Third-party platforms",
      body: [
        "Our services rely on third-party platforms such as Google and Meta. Those platforms set their own terms, policies and pricing and may change or suspend features or accounts at their discretion. We are not responsible for decisions made by third-party platforms.",
        "All product and platform names mentioned on this site belong to their respective owners and are used for identification only; their use does not imply endorsement.",
      ],
    },
    {
      id: "ip",
      heading: "8. Intellectual property",
      body: [
        `The content of this website, including text, design, graphics and code, is owned by or licensed to ${co} and is protected by intellectual property laws. You may not reproduce it without our permission.`,
        "Materials you supply remain yours. Ownership and licensing of work we create for you will be set out in your services agreement; unless it says otherwise, you own final deliverables once they are paid for in full, while we keep our underlying tools, methods and pre-existing materials.",
      ],
    },
    {
      id: "confidentiality",
      heading: "9. Confidentiality",
      body: [
        "Each party will keep the other's non-public business information confidential, use it only for the engagement, and not disclose it except to people who need it to perform the work or where the law requires.",
      ],
    },
    {
      id: "liability",
      heading: "10. Limitation of liability",
      body: [
        "Nothing in these terms excludes liability that cannot be excluded by law, such as liability for fraud or for death or personal injury caused by negligence.",
        "Subject to that, to the extent permitted by law we are not liable for indirect or consequential loss, loss of profit, revenue or data, or loss of business opportunity, and our total liability arising from an engagement is limited to the fees you paid us for the services giving rise to the claim in the twelve months before it arose.",
      ],
    },
    {
      id: "indemnity",
      heading: "11. Indemnity",
      body: [
        "You agree to indemnify us against claims arising from materials, products, offers or claims that you supplied or approved, and from your breach of these terms or of applicable law.",
      ],
    },
    {
      id: "termination",
      heading: "12. Termination",
      body: [
        "Unless your agreement says otherwise, either party may end an engagement with written notice as specified in that agreement. Fees for work performed up to the end date remain payable. Sections that by their nature should survive termination will do so.",
        "We may suspend or restrict access to the website if we reasonably believe these terms have been breached.",
      ],
    },
    {
      id: "law",
      heading: "13. Governing law",
      body: [
        `These terms are governed by the laws of the country in which ${co} is registered, and the courts of that country have jurisdiction, unless mandatory consumer or local law gives you other rights.`,
      ],
    },
    {
      id: "changes",
      heading: "14. Changes to these terms",
      body: [
        "We may update these terms from time to time. The date above shows when they were last revised. Continuing to use the site after a change means you accept the updated terms.",
      ],
    },
    {
      id: "contact",
      heading: "15. Contact",
      body: [`Questions about these terms? Email us at ${email}.`],
    },
  ],
};

export const privacy: LegalDoc = {
  slug: "privacy",
  title: "Privacy Policy",
  updated,
  intro: `This policy explains how ${co} ("${site.name}", "we", "us") collects, uses and protects personal information when you visit this website or contact us.`,
  sections: [
    {
      id: "who",
      heading: "1. Who we are",
      body: [`${co} is the controller of the personal information described here. You can reach us at ${email}.`],
    },
    {
      id: "collect",
      heading: "2. Information we collect",
      body: [
        "Information you give us, for example when you complete a form or email us:",
        { list: ["name, email address and company website", "your approximate monthly marketing budget", "anything else you choose to tell us in a message or on a call"] },
        "Information collected automatically when you use the site:",
        { list: ["device, browser and approximate location (derived from IP address)", "pages viewed, referring site and interactions", "cookie and similar identifiers, as described in our Cookies Policy"] },
      ],
    },
    {
      id: "use",
      heading: "3. How we use it",
      body: [
        { list: ["to respond to enquiries and provide the audit or blueprint you requested", "to propose, deliver and manage our services", "to understand how the site is used and improve it", "to send relevant follow-up about our services, where permitted, with an easy way to opt out", "to keep the site secure and prevent abuse", "to meet legal and accounting obligations"] },
      ],
    },
    {
      id: "basis",
      heading: "4. Legal bases",
      body: [
        "Where data-protection law such as the GDPR or UK GDPR applies, we rely on:",
        { list: ["your consent (for example for non-essential cookies and some marketing messages)", "performance of a contract or steps you ask us to take before entering one", "our legitimate interests in running and improving our business, balanced against your rights", "compliance with legal obligations"] },
      ],
    },
    {
      id: "sharing",
      heading: "5. Who we share it with",
      body: [
        "We do not sell your personal information. We share it only with:",
        { list: ["service providers that help us run the business, such as hosting, email, scheduling, CRM and analytics providers, who may only use it on our instructions", "professional advisers, such as lawyers and accountants", "authorities or other parties where required by law or to protect rights and safety"] },
      ],
    },
    {
      id: "retention",
      heading: "6. How long we keep it",
      body: [
        "We keep enquiry information for as long as needed to respond and for a reasonable period afterwards in case you wish to continue the conversation. Client records are kept for the duration of the engagement and the period required for legal, tax and accounting purposes. When information is no longer needed we delete or anonymise it.",
      ],
    },
    {
      id: "transfers",
      heading: "7. International transfers",
      body: [
        "Some of our providers may process data outside your country. Where we transfer personal information internationally, we use appropriate safeguards, such as standard contractual clauses, where the law requires them.",
      ],
    },
    {
      id: "rights",
      heading: "8. Your rights",
      body: [
        "Depending on where you live, you may have the right to:",
        { list: ["access the personal information we hold about you", "ask us to correct or delete it", "restrict or object to certain processing", "receive a portable copy of information you provided", "withdraw consent at any time, without affecting earlier processing", "complain to your local data-protection authority"] },
        `To exercise any of these rights, email ${email}. We may need to verify your identity first.`,
      ],
    },
    {
      id: "security",
      heading: "9. Security",
      body: [
        "We use reasonable technical and organisational measures to protect personal information, such as encryption in transit and access controls. No method of transmission or storage is completely secure, so we cannot guarantee absolute security.",
      ],
    },
    {
      id: "links",
      heading: "10. Third-party links",
      body: ["This site may link to other websites. We are not responsible for their content or privacy practices, so please read their policies."],
    },
    {
      id: "changes",
      heading: "11. Changes to this policy",
      body: ["We may update this policy as our practices or the law change. The date above shows the latest revision, and we will give more prominent notice of significant changes."],
    },
    {
      id: "contact",
      heading: "12. Contact",
      body: [`Questions or requests about privacy can be sent to ${email}.`],
    },
  ],
};

export const cookies: LegalDoc = {
  slug: "cookies",
  title: "Cookies Policy",
  updated,
  intro: `This policy explains how ${co} ("${site.name}", "we", "us") uses cookies and similar technologies on this website, and the choices you have.`,
  sections: [
    {
      id: "what",
      heading: "1. What are cookies?",
      body: [
        "Cookies are small text files placed on your device when you visit a website. Similar technologies, such as local storage and tracking pixels, work in comparable ways. They help sites function, remember preferences and understand how they are used.",
      ],
    },
    {
      id: "types",
      heading: "2. The types we may use",
      body: [
        "Strictly necessary. These keep the site working, for example by securing forms and remembering your cookie choices. They do not need consent and cannot be switched off in our tools.",
        "Analytics and performance. These show us how visitors use the site, such as which pages are viewed, so we can improve it. We use them only if you consent where the law requires.",
        "Advertising and marketing. These measure the effectiveness of our own advertising and may help show relevant ads on other platforms, such as Google or Meta. We use them only if you consent where the law requires.",
      ],
    },
    {
      id: "third",
      heading: "3. Third-party cookies",
      body: [
        "Where analytics or advertising tools are enabled, the providers of those tools may set their own cookies and receive information about your visit. Their use of that information is governed by their own privacy policies.",
      ],
    },
    {
      id: "manage",
      heading: "4. Managing your choices",
      body: [
        "Where a cookie preference tool is shown on the site, you can accept, reject or change your choices there at any time.",
        "You can also control cookies through your browser settings, including blocking or deleting them. Blocking strictly necessary cookies may stop parts of the site from working properly. Most browsers explain how to do this in their help pages.",
      ],
    },
    {
      id: "retention",
      heading: "5. How long cookies last",
      body: [
        "Session cookies expire when you close your browser. Persistent cookies remain for a set period or until you delete them, typically from a few days up to about two years depending on their purpose.",
      ],
    },
    {
      id: "changes",
      heading: "6. Changes to this policy",
      body: ["We may update this policy when we change the technologies we use or the law changes. The date above shows the latest revision."],
    },
    {
      id: "contact",
      heading: "7. Contact",
      body: [`Questions about our use of cookies can be sent to ${email}. See also our Privacy Policy for how we handle personal information.`],
    },
  ],
};
