import { CodegenConfig } from '@graphql-codegen/cli';
import { readFileSync } from 'fs';
import { join } from 'path';

// Load environment variables from .env.local
function loadEnv() {
  try {
    const envPath = join(process.cwd(), '.env.local');
    const envFile = readFileSync(envPath, 'utf-8');
    const envVars: Record<string, string> = {};

    envFile.split('\n').forEach((line) => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=');
        if (key && valueParts.length > 0) {
          const value = valueParts.join('=').replace(/^["']|["']$/g, '');
          envVars[key.trim()] = value;
        }
      }
    });

    return envVars;
  } catch (error) {
    // .env.local might not exist, that's okay
    return {};
  }
}

const env = loadEnv();
const spaceId = env.CONTENTFUL_SPACE_ID || process.env.CONTENTFUL_SPACE_ID;
const accessToken = env.CONTENTFUL_ACCESS_TOKEN || process.env.CONTENTFUL_ACCESS_TOKEN;
const environment = env.CONTENTFUL_ENVIRONMENT || process.env.CONTENTFUL_ENVIRONMENT || 'master';

if (!spaceId || !accessToken) {
  throw new Error(
    'Missing required environment variables: CONTENTFUL_SPACE_ID or CONTENTFUL_ACCESS_TOKEN. Please ensure .env.local exists with these variables.'
  );
}

const endpointOverride = process.env.CONTENTFUL_GRAPHQL_ENDPOINT;
const productionEndpoint = 'https://graphql.contentful.com/content/v1/spaces';
export const endpoint = `${endpointOverride || productionEndpoint}/${spaceId}/environments/${environment}`;

export const config: CodegenConfig = {
  overwrite: true,
  ignoreNoDocuments: true,
  schema: [
    {
      [endpoint || '']: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    },
  ],
  generates: {
    'src/lib/contentful/__generated/graphql.schema.json': {
      plugins: ['introspection'],
    },
    'src/lib/contentful/__generated/graphql.schema.graphql': {
      plugins: ['schema-ast'],
    },
    'src/lib/contentful/__generated/sdk.ts': {
      documents: ['src/lib/contentful/graphql/**/*.graphql'],
      plugins: ['typescript', 'typescript-operations', 'typescript-graphql-request'],
      config: {
        rawRequest: false,
        inlineFragmentTypes: 'combine',
        skipTypename: false,
        exportFragmentSpreadSubTypes: true,
        dedupeFragments: true,
        preResolveTypes: true,
      },
    },
  },
};

export default config;

