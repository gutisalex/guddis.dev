import { execSync } from "child_process";
import { readFileSync } from "fs";
import { join } from "path";

// Load environment variables from .env.local
function loadEnv() {
  try {
    const envPath = join(process.cwd(), ".env.local");
    const envFile = readFileSync(envPath, "utf-8");
    const envVars: Record<string, string> = {};

    envFile.split("\n").forEach((line) => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith("#")) {
        const [key, ...valueParts] = trimmed.split("=");
        if (key && valueParts.length > 0) {
          const value = valueParts.join("=").replace(/^["']|["']$/g, "");
          envVars[key.trim()] = value;
        }
      }
    });

    return envVars;
  } catch (error) {
    console.error("Error loading .env.local:", error);
    return {};
  }
}

const env = loadEnv();

const spaceId = env.CONTENTFUL_SPACE_ID || process.env.CONTENTFUL_SPACE_ID;
// Use management token for type generation (it needs to read content types)
const accessToken =
  env.CONTENTFUL_MANAGEMENT_TOKEN ||
  process.env.CONTENTFUL_MANAGEMENT_TOKEN ||
  env.CONTENTFUL_ACCESS_TOKEN ||
  process.env.CONTENTFUL_ACCESS_TOKEN;
const environment =
  env.CONTENTFUL_ENVIRONMENT || process.env.CONTENTFUL_ENVIRONMENT || "master";

if (!spaceId || !accessToken) {
  console.error(
    "Missing required environment variables: CONTENTFUL_SPACE_ID or CONTENTFUL_MANAGEMENT_TOKEN"
  );
  console.error("Please ensure .env.local exists with these variables.");
  process.exit(1);
}

console.log("Generating Contentful types...");
console.log(`Space ID: ${spaceId}`);
console.log(`Environment: ${environment}\n`);

try {
  // The -o flag expects a directory, not a file
  // The -X/--v10 flag generates types compatible with Contentful v10/v11
  // The tool will create the directory and generate index.ts + individual type files
  execSync(
    `cf-content-types-generator -s ${spaceId} -t ${accessToken} -e ${environment} -o src/lib/contentful/types -X`,
    {
      stdio: "inherit",
      env: {
        ...process.env,
        CONTENTFUL_SPACE_ID: spaceId,
        CONTENTFUL_ACCESS_TOKEN: accessToken,
        CONTENTFUL_ENVIRONMENT: environment,
      },
    }
  );
  console.log("\n✅ Types generated successfully!");
  console.log("Types are available at: src/lib/contentful/types/index.ts");
} catch (error) {
  console.error("\n❌ Error generating types:", error);
  process.exit(1);
}
