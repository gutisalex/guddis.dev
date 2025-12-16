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

async function listContentTypes() {
  const client = createClient({
    accessToken: managementToken,
  });

  const space = await client.getSpace(spaceId);
  const env = await space.getEnvironment(environment);

  console.log(`Listing content types in environment: ${environment}\n`);

  const contentTypes = await env.getContentTypes();
  
  if (contentTypes.items.length === 0) {
    console.log("No content types found.");
    return;
  }

  console.log(`Found ${contentTypes.items.length} content type(s):\n`);
  
  for (const contentType of contentTypes.items) {
    console.log(`ID: ${contentType.sys.id}`);
    console.log(`Name: ${contentType.name}`);
    console.log(`Published: ${contentType.isPublished() ? "Yes" : "No"}`);
    console.log(`Fields: ${contentType.fields.length}`);
    console.log("---");
  }
}

listContentTypes().catch(console.error);

