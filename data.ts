export interface PersonalInfo {
  name: string;
  location: string;
  phone: string;
  email: string;
  linkedin: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Experience {
  role: string;
  company: string;
  date: string;
  responsibilities: string[];
}

export interface Education {
  degree: string;
  major: string;
  school: string;
  year: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  skills: SkillCategory[];
  experience: Experience[];
  education: Education[];
}

export const resumeData: ResumeData = {
  personalInfo: {
    name: "William Mullecker",
    location: "York, PA",
    phone: "570-573-6459",
    email: "bmullecker@gmail.com",
    linkedin: "linkedin.com/in/bmullecker",
  },
  summary: "Senior Front End Developer & UI/UX Designer with over 13 years of experience bridging the gap between high-fidelity design and scalable implementation. A rare hybrid of creative vision and technical precision specializing in building responsive, high-performance web interfaces that drive measurable business growth. Expert in accessibility, performance optimization, and custom CMS integrations for enterprise and SaaS environments.",
  skills: [
    {
      category: "Languages & Core",
      items: ["HTML5", "CSS3 (SASS/LESS)", "JavaScript (ES6+)", "PHP", "MySQL", "React"],
    },
    {
      category: "CMS & Platforms",
      items: ["WordPress", "WooCommerce", "Shopify", "DotNetNuke", "ExpressionEngine"],
    },
    {
      category: "Design & Tools",
      items: ["UI/UX Design", "Figma", "Adobe CC (Photoshop, Illustrator, InDesign, XD)"],
    },
    {
      category: "Optimization",
      items: ["Web Accessibility (WCAG)", "Technical SEO", "Performance Tuning", "Cross-Browser Compatibility", "Debugging/Testing"],
    },
  ],
  experience: [
    {
      role: "UI/UX Engineer",
      company: "Listrak",
      date: "2021 – 2025",
      responsibilities: [
        "Engineered precision-targeted UI components and enhanced Listrak's enterprise marketing boilerplate, driving an average 30% increase in list growth and conversion rates as high as 6.9%.",
        "Drove significant financial impact, achieving trigger revenue increases upwards of 562% for high-volume retail partners.",
        "Architected and maintained the company’s enterprise front-end boilerplate to ensure scalable, readable code and harmonized UI/UX patterns with complex cross-channel strategies.",
        "Designed and built a proprietary virtual demo platform for client stakeholders to test and approve interactive logic before deployment.",
      ],
    },
    {
      role: "Full-Stack Developer & Designer",
      company: "WebTek",
      date: "2020 – 2021",
      responsibilities: [
        "Engineered 50+ bespoke full-stack ecosystems, developing custom WordPress themes and complex logic from scratch.",
        "Built flagship architecture that has remained maintenance-free on original code for over five years.",
        "Modernized legacy websites and plugins to meet current standards for accessibility, SEO, and Core Web Vitals.",
        "Conceptualized and executed sophisticated interface designs and interactive states for end-to-end web builds.",
      ],
    },
    {
      role: "Senior UI/UX Architect & Engineer",
      company: "OPEN MINDS",
      date: "2017 – 2019",
      responsibilities: [
        "Spearheaded the full UI/UX redesign and engineering of PsychU.org, successfully scaling the active user base by 315% to over 82,000 members.",
        "Achieved 99.99% site stability during peak traffic periods while focusing on high-traffic performance and content scalability.",
        "Integrated custom front-end architecture with WordPress and Laravel to streamline platform-wide content management.",
      ],
    },
    {
      role: "Front End Developer (Contract)",
      company: "Shift Lab NY",
      date: "2016 – 2017",
      responsibilities: [
        "Contributed specialized front-end expertise and pixel-perfect React components to Tier-1 enterprise initiatives, including Microsoft Sonoma (now Microsoft Teams).",
        "Developed and maintained sites across public CMS platforms and internal proprietary content management systems.",
      ],
    },
    {
      role: "Full-Stack Developer & Designer",
      company: "AGIS",
      date: "2014 – 2016",
      responsibilities: [
        "Managed the end-to-end design and development lifecycle as the sole technical and creative lead, transforming legacy websites into modern, responsive applications.",
        "Built responsive, custom front-end experiences across platforms including WordPress, DotNetNuke, Shopify, and Drupal.",
        "Served as technical authority for advanced CSS, architecting complex styling logic and high-precision layouts.",
      ],
    },
  ],
  education: [
    {
      degree: "Bachelor of Science",
      major: "Web Design & Interactive Media",
      school: "Art Institute of York, PA",
      year: "2013",
    },
    {
      degree: "Associate of Science",
      major: "Digital Arts",
      school: "Art Institute of York, PA",
      year: "2011",
    },
  ],
};
