# Content Directory

This directory contains all the Markdown files for the portfolio site content.

## Files

- `hero.md` - Hero section content (name, title, location, contact info, profile image)
- `about.md` - About section content (title and summary)
- `experiences.md` - Work experience entries (separated by `---`)
- `skills.md` - Skill categories (separated by `---`)
- `projects.md` - Portfolio projects (separated by `---`)

## Format

All files use YAML frontmatter for metadata and Markdown for content.

### Example: Experience Entry

```markdown
---
company: brandung GmbH
position: Senior Frontend Developer
location: Cologne, Germany
startDate: 2025-01-01
endDate: 
isCurrent: true
order: 0
---

Description of the role and responsibilities.

## Achievements

- Achievement 1
- Achievement 2
```

### Example: Skill Category

```markdown
---
categoryName: Frontend Frameworks & Libraries
skills: ["Vue.js", "Nuxt.js", "React", "Next.js"]
order: 0
---
```
