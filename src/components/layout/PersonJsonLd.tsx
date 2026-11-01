import { education } from "@/content/education";
import { languages } from "@/content/languages";
import { profile } from "@/content/profile";
import { isTodo, site } from "@/content/site";
import { skillGroups, technicalSkillIds } from "@/content/skills";

/** schema.org Person, built from the same content as the page. */
export function PersonJsonLd() {
  const diploma = education.entries.find((entry) => entry.status && entry.id === "isfo");
  const knowsAbout = skillGroups
    .filter((group) => (technicalSkillIds as readonly string[]).includes(group.id) || group.tone === "accent")
    .flatMap((group) => group.items);

  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.fullName,
    givenName: profile.firstName,
    familyName: profile.lastName,
    jobTitle: profile.role,
    description: site.description,
    url: site.url,
    email: `mailto:${site.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.location.city,
      addressCountry: profile.location.countryCode,
    },
    sameAs: [site.github.href, site.linkedin.href].filter((href) => !isTodo(href)),
    knowsAbout,
    knowsLanguage: languages.map((language) => language.lang),
    ...(diploma
      ? { alumniOf: { "@type": "EducationalOrganization", name: diploma.institution } }
      : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
