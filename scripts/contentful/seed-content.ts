import { createClient } from "contentful-management";

const spaceId = process.env.CONTENTFUL_SPACE_ID;
const managementToken = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const environment = process.env.CONTENTFUL_ENVIRONMENT || "master";

if (!spaceId || !managementToken) {
  console.error(
    "Missing required environment variables: CONTENTFUL_SPACE_ID or CONTENTFUL_MANAGEMENT_TOKEN",
  );
  process.exit(1);
}

async function seedContent() {
  const client = createClient({
    accessToken: managementToken,
  });

  const space = await client.getSpace(spaceId);
  const env = await space.getEnvironment(environment);

  console.log(`Seeding content in environment: ${environment}\n`);

  // Content type IDs (should match create-model.ts)
  const CONTENT_TYPE_IDS = {
    HERO_SECTION: "heroSection",
    ABOUT_SECTION: "aboutSection",
    EXPERIENCE: "experience",
    SKILL_CATEGORY: "skillCategory",
    PROJECT: "project",
  };

  // Verify content types exist and are published
  console.log("Verifying content types...");
  for (const [name, id] of Object.entries(CONTENT_TYPE_IDS)) {
    try {
      const contentType = await env.getContentType(id);
      if (!contentType.isPublished()) {
        console.log(`  Publishing ${name}...`);
        await contentType.publish();
      }
      console.log(`  ✅ ${name}: ${id}`);
    } catch (error) {
      console.error(`  ❌ ${name} (${id}) not found. Please run 'bun run contentful:create-model' first.`);
      throw error;
    }
  }
  console.log();

  // 1. Create Hero Section
  console.log("Creating Hero Section...");
  const heroEntry = await env.createEntry(CONTENT_TYPE_IDS.HERO_SECTION, {
    fields: {
      name: { "en-US": "Alexander Gutheil" },
      title: { "en-US": "Senior Frontend Developer" },
      location: { "en-US": "Kassel, Germany" },
      email: { "en-US": "gutisalex@gmail.com" },
      linkedInUrl: {
        "en-US": "https://www.linkedin.com/in/alexander-gutheil-0762a0166",
      },
    },
  });
  await heroEntry.publish();
  console.log("✅ Created: Hero Section");

  // 2. Create About Section
  console.log("\nCreating About Section...");
  const aboutEntry = await env.createEntry(CONTENT_TYPE_IDS.ABOUT_SECTION, {
    fields: {
      title: { "en-US": "Professional Summary" },
      summary: {
        "en-US":
          "Senior Frontend Developer with 10+ years of experience building high-performance web and mobile applications. Expert in Vue.js and Nuxt.js with extensive experience in React and modern JavaScript frameworks. Proven track record of leading frontend teams and delivering enterprise-level solutions. Specialized in CMS migrations, performance optimization, and modern meta-frameworks. Currently leading frontend teams at brandung GmbH, successfully delivering large-scale migrations and platform modernizations.",
      },
    },
  });
  await aboutEntry.publish();
  console.log("✅ Created: About Section");

  // 3. Create Experience Entries
  console.log("\nCreating Experience entries...");
  const experiences = [
    {
      company: "brandung GmbH",
      position: "Senior Frontend Developer",
      location: "Cologne, Germany",
      startDate: "2025-01-01",
      endDate: null,
      isCurrent: true,
      description:
        "Continue leading the Deutsche Glasfaser frontend team, driving technical decisions and architecture evolution for the ongoing platform modernization. Lead an external agency team working on the relaunch of the Deutsche Glasfaser checkout system, conducting code reviews and ensuring code quality and architectural consistency. Mentor team members and establish development best practices.",
      achievements: null,
      order: 1,
    },
    {
      company: "brandung GmbH",
      position: "Frontend Developer",
      location: "Cologne, Germany",
      startDate: "2021-01-01",
      endDate: "2024-12-31",
      isCurrent: false,
      description:
        "Led the frontend team for the Deutsche Glasfaser GmbH relaunch (May 2023 – Present), a major enterprise project migrating from TYPO3 to Next.js with Contentful CMS. Contributed to multiple Nuxt.js relaunch projects including 1. FC Köln and About You, gaining extensive expertise in Vue.js ecosystem and headless CMS integrations.",
      achievements:
        "- Architected and implemented the complete frontend solution, initially using Next.js (App Router) and TypeScript\n- Successfully migrated the platform to Next.js 16 and React 19, ensuring seamless transition and improved performance\n- Integrated Contentful CMS via GraphQL with automated type generation for type-safe content management\n- Implemented testing strategy with Playwright for end-to-end tests, Vitest for unit tests, and Storybook for component testing\n- Implemented performance optimizations including Redis caching, image optimization, and bundle analysis\n- Delivered a modern, scalable platform serving enterprise-level traffic with significantly improved performance and developer experience",
      order: 2,
    },
    {
      company: "Zazmo GmbH",
      position: "Frontend Developer",
      location: "Kassel, Germany",
      startDate: "2019-02-01",
      endDate: "2021-01-31",
      isCurrent: false,
      description:
        "Designed and developed a web application for group payment processing from concept to production. Built the frontend architecture using Vue.js, ensuring scalability and maintainability. Integrated third-party services and APIs including Stripe and Usercentrics.",
      achievements: null,
      order: 3,
    },
    {
      company: "VirtuaTec",
      position: "Software Developer",
      location: "Kassel, Germany",
      startDate: "2014-09-01",
      endDate: "2019-02-28",
      isCurrent: false,
      description:
        "Developed innovative 3D applications using Unity 3D for automotive simulation environments and HMIs. Created immersive Virtual Reality experiences for automotive applications. Designed and implemented 3D models using Maya.",
      achievements: null,
      order: 4,
    },
    {
      company: "IT Service und Beratung",
      position: "System Administrator",
      location: "Kassel, Germany",
      startDate: "2006-06-01",
      endDate: "2014-09-30",
      isCurrent: false,
      description:
        "Managed and maintained Windows and Linux server environments. Diagnosed and resolved complex IT issues in client and server environments. Created and maintained system documentation and project requirements.",
      achievements: null,
      order: 5,
    },
    {
      company: "Self-Employed",
      position: "Web Designer (Freelance)",
      location: "Kassel, Germany",
      startDate: "2003-08-01",
      endDate: "2006-06-30",
      isCurrent: false,
      description:
        "Designed and developed custom websites for various clients. Worked with content management systems including WordPress. Implemented SEO best practices to improve client website visibility.",
      achievements: null,
      order: 6,
    },
  ];

  for (const exp of experiences) {
    const entry = await env.createEntry(CONTENT_TYPE_IDS.EXPERIENCE, {
      fields: {
        company: { "en-US": exp.company },
        position: { "en-US": exp.position },
        location: { "en-US": exp.location },
        startDate: { "en-US": exp.startDate },
        endDate: exp.endDate ? { "en-US": exp.endDate } : undefined,
        isCurrent: { "en-US": exp.isCurrent },
        description: { "en-US": exp.description },
        achievements: exp.achievements
          ? { "en-US": exp.achievements }
          : undefined,
        order: { "en-US": exp.order },
      },
    });
    await entry.publish();
    console.log(`  ✅ Created: ${exp.position} at ${exp.company}`);
  }

  // 4. Create Skill Categories
  console.log("\nCreating Skill Categories...");
  const skillCategories = [
    {
      categoryName: "Frontend Frameworks & Libraries",
      skills: [
        "Vue.js",
        "Nuxt.js",
        "React",
        "Next.js",
        "TypeScript",
        "JavaScript (ES6+)",
      ],
      order: 1,
    },
    {
      categoryName: "Mobile Development",
      skills: ["Flutter", "React Native"],
      order: 2,
    },
    {
      categoryName: "Backend & Languages",
      skills: ["Go", "C# (.NET)", "Node.js"],
      order: 3,
    },
    {
      categoryName: "Styling & Design",
      skills: [
        "Tailwind CSS",
        "CSS3",
        "HTML5",
        "Responsive Design",
      ],
      order: 4,
    },
    {
      categoryName: "CMS & Headless Platforms",
      skills: ["Contentful (GraphQL)", "Storyblok", "Scayle"],
      order: 5,
    },
    {
      categoryName: "Build Tools & Testing",
      skills: [
        "Webpack",
        "Vite",
        "Playwright",
        "Vitest",
        "Jest",
        "Storybook",
        "Git",
        "CI/CD",
      ],
      order: 6,
    },
    {
      categoryName: "Tools & Platforms",
      skills: [
        "Docker",
        "Vercel",
        "Redis",
        "Stripe",
        "Usercentrics",
        "Ninetailed",
      ],
      order: 7,
    },
    {
      categoryName: "Additional",
      skills: [
        "Unity 3D",
        "Maya",
        "Virtual Reality Development",
      ],
      order: 8,
    },
  ];

  for (const category of skillCategories) {
    const entry = await env.createEntry(CONTENT_TYPE_IDS.SKILL_CATEGORY, {
      fields: {
        categoryName: { "en-US": category.categoryName },
        skills: { "en-US": category.skills },
        order: { "en-US": category.order },
      },
    });
    await entry.publish();
    console.log(`  ✅ Created: ${category.categoryName}`);
  }

  // 5. Create Projects (can be added later or left empty for now)
  console.log("\n✅ Content seeding complete!");
  console.log("\nNote: Projects can be added manually in Contentful or via script later.");
  console.log("\nNext step: Run: bun run contentful:generate-types");
}

seedContent().catch(console.error);

