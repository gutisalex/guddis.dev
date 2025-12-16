import { Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { HeroSection } from "@/lib/contentful/queries";

type ContactProps = {
  hero: HeroSection;
};

export function Contact({ hero }: ContactProps) {
  const email = hero.email ?? "";
  const linkedInUrl = hero.linkedInUrl ?? "";

  return (
    <section id="contact" className="w-full bg-muted/30 px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
          Get In Touch
        </h2>
        <p className="mb-8 text-lg text-muted-foreground">
          I&apos;m always open to discussing new opportunities and interesting
          projects. Feel free to reach out!
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a href={linkedInUrl} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="flex items-center gap-2">
              <Linkedin className="h-5 w-5" />
              Connect on LinkedIn
            </Button>
          </a>
          <a href={`mailto:${email}`}>
            <Button
              size="lg"
              variant="outline"
              className="flex items-center gap-2"
            >
              <Mail className="h-5 w-5" />
              Send Email
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
