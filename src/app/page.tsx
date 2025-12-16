import { draftMode } from "next/headers";
import {
  getHeroSection,
  getAboutSection,
  getExperiences,
  getSkillCategories,
  getProjects,
} from "@/lib/contentful/queries";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience as ExperienceSection } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";
import { StructuredData } from "@/components/StructuredData";

export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  const { isEnabled } = await draftMode();
  const preview = isEnabled;

  // Fetch all content in parallel
  const [hero, about, experiences, skillCategories, projects] =
    await Promise.all([
      getHeroSection(preview),
      getAboutSection(preview),
      getExperiences(preview),
      getSkillCategories(preview),
      getProjects(preview),
    ]);

  if (!hero || !about) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">
          Content is being set up. Please check Contentful.
        </p>
      </div>
    );
  }

  return (
    <>
      <StructuredData hero={hero} />
      <main className="min-h-screen">
        <Hero hero={hero} />
        <About about={about} />
        <ExperienceSection experiences={experiences} />
        <Skills skillCategories={skillCategories} />
        <Projects projects={projects} />
        <Contact hero={hero} />
      </main>
    </>
  );
}
