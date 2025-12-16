# Portfolio Site Implementation Plan

## Architecture Overview

The site will use Next.js 16 App Router with Contentful CMS integration via the Contentful SDK (JavaScript/TypeScript client). Content will be fully managed through Contentful with efficient use of content types (staying within the 25 limit). shadcn/ui with base-ui will provide accessible, modern components. The site uses SSG (Static Site Generation) with revalidation and preview mode support.

### Contentful Content Model (5 content types)

1. **Hero Section** - Hero content (name, title, location, contact info)
2. **About Section** - Professional summary
3. **Experience** - Reusable work experience entries
4. **Skill Category** - Groups of technical skills (Frontend, Backend, etc.)
5. **Project** - Portfolio project entries

### Tech Stack

- Next.js 16 (App Router) with React 19
- Contentful JavaScript SDK with TypeScript type generation
- shadcn/ui components (base-ui, not radix)
- Tailwind CSS v4
- TypeScript
- Contentful CLI for content model and content management
- Vercel deployment with GitHub integration

## Implementation Steps

### 1. Project Setup & Dependencies

**Files to modify:**

- `package.json` - Add dependencies
- `.env.local` - Contentful environment variables (not committed)

**Dependencies to add:**

- `contentful` - Contentful JavaScript SDK
- `@contentful/rich-text-react-renderer` - Rich text rendering
- `cf-content-types-generator` - Type generation from Contentful schema (no I prefix)
- `contentful-management` - Contentful Management API (for scripts)
- `class-variance-authority`, `clsx`, `tailwind-merge` - Utility libraries
- `lucide-react` - Icons

### 2. shadcn/ui Setup

**Note:** User will manually set up shadcn/ui with base-ui option. After setup, we'll utilize the components.

**Files expected after user setup:**

- `components.json` - shadcn configuration (with base-ui)
- `src/lib/utils.ts` - Utility functions (cn helper)
- `src/components/ui/` - Component directory

**Components to use:**

- Button
- Card
- Separator
- Badge
- Avatar (optional, for profile image)

### 3. Contentful Integration

**Files to create:**

- `src/lib/contentful/client.ts` - Contentful SDK client setup (delivery & preview)
- `src/lib/contentful/queries.ts` - Contentful SDK query functions
- `src/lib/contentful/types.ts` - Generated types (auto-generated via cf-content-types-generator)
- `src/lib/contentful/content-types.ts` - Type aliases for friendly names
- `src/lib/contentful/constants.ts` - Content type ID constants

**Environment variables:**

- `CONTENTFUL_SPACE_ID`
- `CONTENTFUL_ACCESS_TOKEN` (Delivery)
- `CONTENTFUL_PREVIEW_TOKEN` (Preview)
- `CONTENTFUL_MANAGEMENT_TOKEN` (CMA - for scripts)
- `CONTENTFUL_ENVIRONMENT` (default: master)
- `CONTENTFUL_REVALIDATE_SECRET` (for on-demand revalidation)
- `CONTENTFUL_PREVIEW_SECRET` (for preview mode)

### 4. Contentful Content Types Setup

Create in Contentful:

1. **Hero Section** (ID: `heroSection`)
   - Name (Short text)
   - Title (Short text)
   - Location (Short text)
   - Email (Short text)
   - LinkedIn URL (Short text)
   - Profile Image (Media)

2. **About Section** (ID: `aboutSection`)
   - Title (Short text)
   - Summary (Long text)

3. **Experience** (ID: `experience`)
   - Company (Short text)
   - Position (Short text)
   - Location (Short text)
   - Start Date (Date)
   - End Date (Date, optional)
   - Is Current (Boolean)
   - Description (Long text)
   - Achievements (Long text, optional)
   - Order (Integer)

4. **Skill Category** (ID: `skillCategory`)
   - Category Name (Short text)
   - Skills (Short text, multiple values)
   - Order (Integer)

5. **Project** (ID: `project`)
   - Title (Short text)
   - Description (Long text)
   - Technologies (Short text, multiple)
   - Project URL (Short text, optional)
   - GitHub URL (Short text, optional)
   - Image (Media, optional)
   - Featured (Boolean)
   - Order (Integer)

### 5. Page Components & Routes

**Files to create:**

- `src/app/page.tsx` - Main page (server component, SSG with revalidation)
- `src/app/api/revalidate/route.ts` - Revalidation API route for on-demand ISR
- `src/app/api/preview/route.ts` - Preview mode API route
- `src/app/api/exit-preview/route.ts` - Exit preview mode route
- `src/components/sections/Hero/index.tsx`
- `src/components/sections/About/index.tsx`
- `src/components/sections/Experience/index.tsx`
- `src/components/sections/Skills/index.tsx`
- `src/components/sections/Projects/index.tsx`
- `src/components/sections/Contact/index.tsx`
- `src/components/StructuredData.tsx` - JSON-LD structured data

### 6. Styling & Design

**Files to modify:**

- `src/app/globals.css` - Global styles, custom CSS variables
- Tailwind theme configuration for modern, minimal design

**Design principles:**

- Clean typography with proper hierarchy
- Generous whitespace
- Subtle animations and transitions
- Mobile-first responsive design
- Dark mode support (system preference)

### 7. SEO & Metadata

**Files to modify:**

- `src/app/layout.tsx` - Root metadata
- `src/app/page.tsx` - Page-specific metadata from Contentful

**SEO features:**

- Dynamic metadata from Contentful
- Open Graph tags
- Twitter Card support
- Structured data (JSON-LD) for Person schema

### 8. Performance Optimizations

- Image optimization with Next.js Image component
- Static generation with ISR (Incremental Static Regeneration)
- Revalidation route for on-demand updates
- Preview mode for content preview
- Contentful SDK query optimization
- Font optimization (already using Geist)
- Bundle analysis

### 9. GitHub & Vercel Setup

**Configuration:**

- Connect GitHub repo to Vercel
- Set environment variables in Vercel dashboard
- Enable automatic deployments

### 10. Contentful CLI Scripts

**Files to create in `scripts/contentful/` folder:**

- `scripts/contentful/cleanup.ts` - Clean up existing content types and entries
- `scripts/contentful/create-model.ts` - Create content model (5 content types with custom IDs)
- `scripts/contentful/seed-content.ts` - Seed initial content from CV data
- `scripts/contentful/generate-types.ts` - Generate TypeScript types from Contentful schema
- `scripts/contentful/list-content-types.ts` - List existing content types (utility)

**Scripts configuration:**

- Use Contentful Management API (CMA) with CMA token
- TypeScript scripts with proper error handling
- Read CV data and transform to Contentful entries
- Add npm scripts in package.json for easy execution

### 11. Content Migration

- Run cleanup script to remove old content
- Run create-model script to set up content types with custom IDs
- Run seed-content script to populate initial content
- Run generate-types script to create TypeScript types
- Test preview mode for content preview
- Test revalidation route

## File Structure

```
src/
├── app/
│   ├── layout.tsx (update metadata)
│   ├── page.tsx (main page, SSG)
│   ├── api/
│   │   ├── revalidate/route.ts
│   │   ├── preview/route.ts
│   │   └── exit-preview/route.ts
│   └── globals.css (update styles)
├── components/
│   ├── ui/ (shadcn components - user setup)
│   ├── sections/
│   │   ├── Hero/
│   │   │   └── index.tsx
│   │   ├── About/
│   │   │   └── index.tsx
│   │   ├── Experience/
│   │   │   └── index.tsx
│   │   ├── Skills/
│   │   │   └── index.tsx
│   │   ├── Projects/
│   │   │   └── index.tsx
│   │   └── Contact/
│   │       └── index.tsx
│   └── StructuredData.tsx
├── lib/
│   ├── contentful/
│   │   ├── client.ts
│   │   ├── queries.ts
│   │   ├── constants.ts
│   │   ├── content-types.ts
│   │   └── types/ (generated)
│   │       ├── index.ts
│   │       └── Type*.ts files
│   └── utils.ts
├── scripts/
│   └── contentful/
│       ├── cleanup.ts
│       ├── create-model.ts
│       ├── seed-content.ts
│       ├── generate-types.ts
│       └── list-content-types.ts
└── types/ (if needed)
```

## Key Features

1. **Fully CMS-driven** - All content editable in Contentful
2. **Type-safe** - Generated TypeScript types from Contentful schema (v10/v11 format)
3. **SSG with Revalidation** - Static generation with on-demand revalidation
4. **Preview Mode** - Preview unpublished content changes
5. **Accessible** - shadcn/ui components with base-ui (ARIA support)
6. **Responsive** - Mobile-first design with Tailwind
7. **Performance** - Optimized images, static generation, ISR
8. **SEO** - Complete metadata and structured data
9. **LinkedIn Integration** - Prominent CTA linking to LinkedIn profile
10. **Modern Design** - Clean, minimal, professional aesthetic
11. **Automated Scripts** - CLI scripts for content model and content management

## Content Type IDs

The content types use custom IDs (not auto-generated):
- `heroSection` - Hero Section
- `aboutSection` - About Section
- `experience` - Experience
- `skillCategory` - Skill Category
- `project` - Project

## Type Generation

Types are generated using `cf-content-types-generator` with the `-X` flag for v10/v11 compatibility:
- Generates `EntrySkeletonType` types
- Creates proper type structure for Contentful v11
- Types are exported from `src/lib/contentful/types/index.ts`
- Friendly aliases are provided in `src/lib/contentful/content-types.ts`

## Next Steps After Implementation

1. Create content in Contentful (or run seed script)
2. Test preview mode
3. Configure Vercel environment variables
4. Deploy and verify
5. Set up custom domain (if applicable)

