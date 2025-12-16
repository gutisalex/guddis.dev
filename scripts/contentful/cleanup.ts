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

async function cleanup() {
  const client = createClient({
    accessToken: managementToken,
  });

  const space = await client.getSpace(spaceId);
  const env = await space.getEnvironment(environment);

  console.log(`Cleaning up content in environment: ${environment}`);

  // Get all content types
  const contentTypes = await env.getContentTypes();
  console.log(`Found ${contentTypes.items.length} content types`);

  // Delete all entries for each content type
  for (const contentType of contentTypes.items) {
    console.log(`\nProcessing content type: ${contentType.name} (${contentType.sys.id})`);

    // Get all entries
    const entries = await env.getEntries({
      content_type: contentType.sys.id,
      limit: 1000,
    });

    console.log(`  Found ${entries.items.length} entries`);

    // Unpublish and delete entries
    for (const entry of entries.items) {
      try {
        if (entry.isPublished()) {
          await entry.unpublish();
          console.log(`  Unpublished: ${entry.sys.id}`);
        }
        await entry.delete();
        console.log(`  Deleted: ${entry.sys.id}`);
      } catch (error) {
        console.error(`  Error deleting ${entry.sys.id}:`, error);
      }
    }
  }

  // Delete all content types
  console.log("\nDeleting content types...");
  for (const contentType of contentTypes.items) {
    try {
      // Unpublish if published
      if (contentType.isPublished()) {
        await contentType.unpublish();
      }
      await contentType.delete();
      console.log(`  Deleted content type: ${contentType.name}`);
    } catch (error) {
      console.error(`  Error deleting ${contentType.name}:`, error);
    }
  }

  console.log("\n✅ Cleanup complete!");
}

cleanup().catch(console.error);

