import { GraphQLClient } from 'graphql-request';

import { getSdk } from './__generated/sdk';

// Build the GraphQL endpoint URL
const endpointOverride = process.env.CONTENTFUL_GRAPHQL_ENDPOINT;
const productionEndpoint = 'https://graphql.contentful.com/content/v1/spaces';
const endpoint = `${endpointOverride || productionEndpoint}/${
  process.env.CONTENTFUL_SPACE_ID
}/environments/${process.env.CONTENTFUL_ENVIRONMENT || 'master'}`;

if (!process.env.CONTENTFUL_SPACE_ID) {
  throw new Error('CONTENTFUL_SPACE_ID is not set');
}

if (!process.env.CONTENTFUL_ACCESS_TOKEN) {
  throw new Error('CONTENTFUL_ACCESS_TOKEN is not set');
}

if (!process.env.CONTENTFUL_PREVIEW_TOKEN) {
  throw new Error('CONTENTFUL_PREVIEW_TOKEN is not set');
}

const graphQlClient = new GraphQLClient(endpoint, {
  headers: {
    Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
  },
});

const previewGraphQlClient = new GraphQLClient(endpoint, {
  headers: {
    Authorization: `Bearer ${process.env.CONTENTFUL_PREVIEW_TOKEN}`,
  },
});

export const client = getSdk(graphQlClient);
export const previewClient = getSdk(previewGraphQlClient);

// Helper to get the appropriate client based on preview mode
export function getContentfulClient(preview = false) {
  return preview ? previewClient : client;
}
