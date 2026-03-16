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
  summary: "Senior Front-End Developer & UI/UX Designer with over <strong>13</strong> years of experience bridging the gap between high-fidelity design and scalable implementation. A rare hybrid of creative vision and technical precision specializing in building responsive, high-performance web interfaces that drive measurable business growth. Expert in accessibility, performance optimization, and custom CMS integrations for enterprise and SaaS environments.",
  skills: [
    {
      category: "Front-End",
      items: ["HTML5", "CSS3 (SASS/LESS)", "Tailwind", "JavaScript (ES6+)", "React"],
    },
    {
      category: "Back-End & CMS",
      items: ["WordPress", "Shopify", "PHP", "MySQL", "Laravel (MVC)"],
    },
    {
      category: "Design",
      items: ["UI/UX Design", "Figma", "Adobe Creative Cloud"],
    },
    {
      category: "Optimization",
      items: ["Accessibility (WCAG)", "SEO", "Performance Tuning", "Cross-Browser Compatibility"],
    },
  ],
  experience: [
    {
      role: "UI/UX Engineer",
      company: "Listrak",
      date: "2021 – 2025",
      responsibilities: [
        "Engineered precision-targeted UI components and enhanced Listrak's enterprise marketing boilerplate, driving an average <strong>30</strong>% increase in list growth and achieving trigger revenue increases upwards of <strong>562</strong>% for high-volume retail partners.",
        "Maintained and enhanced the company’s enterprise front-end boilerplate to ensure scalable, readable code and harmonized UI/UX patterns with complex cross-channel strategies.",
        "Designed and built a proprietary virtual demo platform for client stakeholders and strategy departments to test and approve interactive logic before deployment.",
      ],
    },
    {
      role: "Full-Stack Developer & Designer",
      company: "WebTek",
      date: "2020 – 2021",
      responsibilities: [
        "Engineered <strong>50</strong>+ bespoke full-stack ecosystems and custom WordPress themes from scratch, delivering flagship architectures that have remained maintenance-free on original code for over five years.",
        "Modernized legacy websites and plugins to meet current standards for accessibility, SEO, and Core Web Vitals.",
      ],
    },
    {
      role: "Senior UI/UX Architect & Engineer",
      company: "OPEN MINDS",
      date: "2017 – 2019",
      responsibilities: [
        "Spearheaded the full UI/UX redesign and engineering of PsychU.org, successfully scaling the active user base by <strong>315</strong>% to over <strong>82,000</strong> members and achieving <strong>99.99</strong>% site stability during peak traffic periods with a focus on high-traffic performance and content scalability.",
      ],
    },
    {
      role: "Front End Developer (Contract)",
      company: "Shift Lab NY",
      date: "2016 – 2017",
      responsibilities: [
        "Engineered pixel-perfect React components for Tier-<strong>1</strong> initiatives, including Microsoft Sonoma (Teams), by integrating high-fidelity front-end builds with WordPress and a proprietary headless CMS architected on ExpressionEngine.",
      ],
    },
    {
      role: "Full-Stack Developer & Designer",
      company: "AGIS",
      date: "2014 – 2016",
      responsibilities: [
        "Served as the sole technical and creative lead for the end-to-end modernization of legacy enterprise applications. Engineered high-precision, responsive front-end experiences across WordPress, Shopify, DNN, and Drupal, while architecting complex CSS logic to ensure pixel-perfect cross-platform consistency.",
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
