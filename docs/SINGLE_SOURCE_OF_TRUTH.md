# Single Source of Truth Workflow

Your CV YAML file (`data/CV_Alexander_Gutheil.yaml`) is now the **single source of truth** for all content that appears in both your portfolio website and your CV/resume PDF.

## How It Works

```
data/CV_Alexander_Gutheil.yaml
    (Single Source of Truth)
         ↓
    ┌─────────────────┬─────────────────┐
    ↓                 ↓                 ↓
content:generate  resume:generate  (Manual)
    ↓                 ↓
content/*.md      PDF Resume
    ↓                 ↓
Portfolio Site    Downloadable PDF
```

## Workflow

### 1. Edit Your Content

**Edit the YAML file**: `data/CV_Alexander_Gutheil.yaml`

This file contains:

- Personal info (name, location, email, LinkedIn)
- Professional summary
- Work experience
- Skills
- Education
- Additional information

### 2. Generate Everything

Run one command to generate both website content and CV:

```bash
bun run update:all
```

This will:

1. Generate Markdown files for the website (`content/*.md`)
2. Generate the PDF resume

Or run them separately:

```bash
# Generate website content only
bun run content:generate

# Generate PDF resume only
bun run resume:generate
```

### 3. What Gets Generated

**Website Content** (`content/` directory):

- `hero.md` - Hero section (name, title, location, contact)
- `about.md` - About section (professional summary)
- `experiences.md` - Work experience entries
- `skills.md` - Technical skills by category

**CV/Resume**:

- `docs/Alexander_Gutheil_Resume.pdf` - PDF for backup
- `public/Alexander_Gutheil_Resume.pdf` - PDF served via API

### 4. Website-Only Content

**Projects** (`content/projects.md`) are **NOT** generated from YAML because:

- Projects are website-only (not shown in CV)
- You can edit `content/projects.md` directly
- This file is not overwritten by the generation script

## What's Synced vs. What's Separate

### ✅ Synced (from YAML)

- Personal information (name, location, email, LinkedIn)
- Professional summary
- Work experience
- Skills
- Education (in CV, not currently on website)

### 🎯 Website-Only

- Projects (`content/projects.md`) - Edit manually
- Profile image URL (can be set in `content/hero.md` or add to YAML later)

### 📄 CV-Only

- Education details (full details in CV, summary on website)
- Additional information section
- Design/formatting settings

## Example: Updating Your Job Title

1. **Edit** `data/CV_Alexander_Gutheil.yaml`:

   ```yaml
   cv:
     sections:
       experience:
         - company: brandung GmbH
           position: Senior Frontend Developer # ← Change this
   ```

2. **Run**: `bun run update:all`

3. **Result**:
   - Website automatically shows new title
   - CV PDF shows new title
   - Both are in sync!

## Example: Adding a New Skill

1. **Edit** `data/CV_Alexander_Gutheil.yaml`:

   ```yaml
   cv:
     sections:
       skills:
         - label: New Category
           details: Skill 1, Skill 2, Skill 3
   ```

2. **Run**: `bun run content:generate`

3. **Result**: New skill category appears on website

## Benefits

✅ **Single Source of Truth**: Edit once, update everywhere  
✅ **No Duplication**: Don't maintain the same info in multiple places  
✅ **Consistency**: Website and CV always match  
✅ **Version Control**: All changes tracked in Git  
✅ **Flexibility**: Projects remain website-only

## Troubleshooting

### Content not updating on website

1. Run `bun run content:generate`
2. Restart dev server: `bun run dev`
3. Check that `content/*.md` files were updated

### CV not generating

1. Ensure RenderCV is installed: `pip3 install "rendercv[full]"`
2. Check YAML syntax is valid
3. Run `bun run resume:generate` separately to see errors

### Projects missing

Projects are intentionally not generated from YAML. Edit `content/projects.md` directly.
