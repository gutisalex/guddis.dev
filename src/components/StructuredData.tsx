import type { HeroSection } from "@/lib/contentful/queries";

type StructuredDataProps = {
  hero: HeroSection;
};

export function StructuredData({ hero }: StructuredDataProps) {
  const name = hero.name ?? "";
  const title = hero.title ?? "";
  const email = hero.email ?? "";
  const linkedInUrl = hero.linkedInUrl ?? "";
  const location = hero.location ?? "";

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    jobTitle: title,
    email,
    url: linkedInUrl,
    address: {
      "@type": "PostalAddress",
      addressLocality: location,
    },
    sameAs: [linkedInUrl],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
    />
  );
}

