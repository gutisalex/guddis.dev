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

async function createContentModel() {
  const client = createClient({
    accessToken: managementToken,
  });

  const space = await client.getSpace(spaceId);
  const env = await space.getEnvironment(environment);

  console.log(`Creating content model in environment: ${environment}\n`);

  // Content type IDs we want to use
  const CONTENT_TYPE_IDS = {
    HERO_SECTION: "heroSection",
    ABOUT_SECTION: "aboutSection",
    EXPERIENCE: "experience",
    SKILL_CATEGORY: "skillCategory",
    PROJECT: "project",
  };

  // 1. Hero Section Content Type
  const heroSection = await env.createContentTypeWithId(CONTENT_TYPE_IDS.HERO_SECTION, {
    name: "Hero Section",
    displayField: "name",
    fields: [
      {
        id: "name",
        name: "Name",
        type: "Symbol",
        required: true,
      },
      {
        id: "title",
        name: "Title",
        type: "Symbol",
        required: true,
      },
      {
        id: "location",
        name: "Location",
        type: "Symbol",
        required: true,
      },
      {
        id: "email",
        name: "Email",
        type: "Symbol",
        required: true,
      },
      {
        id: "linkedInUrl",
        name: "LinkedIn URL",
        type: "Symbol",
        required: true,
      },
      {
        id: "profileImage",
        name: "Profile Image",
        type: "Link",
        linkType: "Asset",
        required: false,
      },
    ],
  });
  await heroSection.publish();
  console.log(`✅ Created: Hero Section (ID: ${heroSection.sys.id})`);

  // 2. About Section Content Type
  const aboutSection = await env.createContentTypeWithId(CONTENT_TYPE_IDS.ABOUT_SECTION, {
    name: "About Section",
    displayField: "title",
    fields: [
      {
        id: "title",
        name: "Title",
        type: "Symbol",
        required: true,
      },
      {
        id: "summary",
        name: "Summary",
        type: "Text",
        required: true,
      },
    ],
  });
  await aboutSection.publish();
  console.log(`✅ Created: About Section (ID: ${aboutSection.sys.id})`);

  // 3. Experience Content Type
  const experience = await env.createContentTypeWithId(CONTENT_TYPE_IDS.EXPERIENCE, {
    name: "Experience",
    displayField: "company",
    fields: [
      {
        id: "company",
        name: "Company",
        type: "Symbol",
        required: true,
      },
      {
        id: "position",
        name: "Position",
        type: "Symbol",
        required: true,
      },
      {
        id: "location",
        name: "Location",
        type: "Symbol",
        required: true,
      },
      {
        id: "startDate",
        name: "Start Date",
        type: "Date",
        required: true,
      },
      {
        id: "endDate",
        name: "End Date",
        type: "Date",
        required: false,
      },
      {
        id: "isCurrent",
        name: "Is Current",
        type: "Boolean",
        required: true,
        defaultValue: {
          "en-US": false,
        },
      },
      {
        id: "description",
        name: "Description",
        type: "Text",
        required: true,
      },
      {
        id: "achievements",
        name: "Achievements",
        type: "Text",
        required: false,
      },
      {
        id: "order",
        name: "Order",
        type: "Integer",
        required: true,
      },
    ],
  });
  await experience.publish();
  console.log(`✅ Created: Experience (ID: ${experience.sys.id})`);

  // 4. Skill Category Content Type
  const skillCategory = await env.createContentTypeWithId(CONTENT_TYPE_IDS.SKILL_CATEGORY, {
    name: "Skill Category",
    displayField: "categoryName",
    fields: [
      {
        id: "categoryName",
        name: "Category Name",
        type: "Symbol",
        required: true,
      },
      {
        id: "skills",
        name: "Skills",
        type: "Array",
        required: true,
        items: {
          type: "Symbol",
        },
      },
      {
        id: "order",
        name: "Order",
        type: "Integer",
        required: true,
      },
    ],
  });
  await skillCategory.publish();
  console.log(`✅ Created: Skill Category (ID: ${skillCategory.sys.id})`);

  // 5. Project Content Type
  const project = await env.createContentTypeWithId(CONTENT_TYPE_IDS.PROJECT, {
    name: "Project",
    displayField: "title",
    fields: [
      {
        id: "title",
        name: "Title",
        type: "Symbol",
        required: true,
      },
      {
        id: "description",
        name: "Description",
        type: "Text",
        required: true,
      },
      {
        id: "technologies",
        name: "Technologies",
        type: "Array",
        required: true,
        items: {
          type: "Symbol",
        },
      },
      {
        id: "projectUrl",
        name: "Project URL",
        type: "Symbol",
        required: false,
      },
      {
        id: "githubUrl",
        name: "GitHub URL",
        type: "Symbol",
        required: false,
      },
      {
        id: "image",
        name: "Image",
        type: "Link",
        linkType: "Asset",
        required: false,
      },
      {
        id: "featured",
        name: "Featured",
        type: "Boolean",
        required: true,
        defaultValue: {
          "en-US": false,
        },
      },
      {
        id: "order",
        name: "Order",
        type: "Integer",
        required: true,
      },
    ],
  });
  await project.publish();
  console.log(`✅ Created: Project (ID: ${project.sys.id})`);

  console.log("\n✅ Content model creation complete!");
  console.log("\nContent Type IDs:");
  console.log(`  - Hero Section: ${CONTENT_TYPE_IDS.HERO_SECTION}`);
  console.log(`  - About Section: ${CONTENT_TYPE_IDS.ABOUT_SECTION}`);
  console.log(`  - Experience: ${CONTENT_TYPE_IDS.EXPERIENCE}`);
  console.log(`  - Skill Category: ${CONTENT_TYPE_IDS.SKILL_CATEGORY}`);
  console.log(`  - Project: ${CONTENT_TYPE_IDS.PROJECT}`);
  console.log("\nNext steps:");
  console.log("1. Run: bun run contentful:seed");
  console.log("2. Run: bun run contentful:generate-types");
}

createContentModel().catch(console.error);

