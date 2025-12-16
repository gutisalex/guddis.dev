import { getContentfulClient } from './client';
import type {
  HeroSection,
  AboutSection,
  Experience,
  SkillCategory,
  Project,
  ProjectFilter,
  Maybe,
} from './__generated/sdk';
import {
  ExperienceOrder,
  SkillCategoryOrder,
  ProjectOrder,
} from './__generated/sdk';

// Helper to extract the first item from a collection query
function getFirstItem<T>(query: { items: Array<Maybe<T>> } | null | undefined): T | null {
  const item = query?.items?.[0];
  return item ?? null;
}

// Helper to extract items from a collection query
function getItems<T>(query: { items: Array<Maybe<T>> } | null | undefined): T[] {
  return query?.items?.filter((item): item is T => item !== null) ?? [];
}

// Fetch hero section
export async function getHeroSection(
  preview = false,
  locale?: string
): Promise<HeroSection | null> {
  const client = getContentfulClient(preview);
  const result = await client.heroSection({ locale, preview });
  return getFirstItem(result.heroSectionCollection);
}

// Fetch about section
export async function getAboutSection(
  preview = false,
  locale?: string
): Promise<AboutSection | null> {
  const client = getContentfulClient(preview);
  const result = await client.aboutSection({ locale, preview });
  return getFirstItem(result.aboutSectionCollection);
}

// Fetch all experiences
export async function getExperiences(
  preview = false,
  locale?: string,
  order?: ExperienceOrder
): Promise<Experience[]> {
  const client = getContentfulClient(preview);
  const result = await client.experienceCollection({
    locale,
    preview,
    order: order ? [order] : [ExperienceOrder.OrderAsc],
  });
  return getItems(result.experienceCollection);
}

// Fetch all skill categories
export async function getSkillCategories(
  preview = false,
  locale?: string,
  order?: SkillCategoryOrder
): Promise<SkillCategory[]> {
  const client = getContentfulClient(preview);
  const result = await client.skillCategoryCollection({
    locale,
    preview,
    order: order ? [order] : [SkillCategoryOrder.OrderAsc],
  });
  return getItems(result.skillCategoryCollection);
}

// Fetch all projects
export async function getProjects(
  preview = false,
  locale?: string,
  order?: ProjectOrder,
  featured?: boolean
): Promise<Project[]> {
  const client = getContentfulClient(preview);
  const result = await client.projectCollection({
    locale,
    preview,
    order: order ? [order] : [ProjectOrder.OrderAsc],
    where: featured !== undefined ? { featured } : undefined,
  });
  return getItems(result.projectCollection);
}

// Re-export types for convenience
export type {
  HeroSection,
  AboutSection,
  Experience,
  SkillCategory,
  Project,
} from './__generated/sdk';
