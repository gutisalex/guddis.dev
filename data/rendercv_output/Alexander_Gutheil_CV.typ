// Import the rendercv function and all the refactored components
#import "@preview/rendercv:0.1.0": *

// Apply the rendercv template with custom configuration
#show: rendercv.with(
  name: "Alexander Gutheil",
  footer: context { [#emph[Alexander Gutheil -- #str(here().page())\/#str(counter(page).final().first())]] },
  top-note: [ #emph[Last updated Dec 2025] ],
  locale-catalog-language: "en",
  page-size: "a4",
  page-top-margin: 0.7in,
  page-bottom-margin: 0.7in,
  page-left-margin: 0.7in,
  page-right-margin: 0.7in,
  page-show-footer: true,
  page-show-top-note: true,
  colors-body: rgb(0, 0, 0),
  colors-name: rgb(0, 79, 144),
  colors-headline: rgb(0, 79, 144),
  colors-connections: rgb(0, 0, 0),
  colors-section-titles: rgb(0, 79, 144),
  colors-links: rgb(0, 79, 144),
  colors-footer: rgb(128, 128, 128),
  colors-top-note: rgb(128, 128, 128),
  typography-line-spacing: 1.2em,
  typography-alignment: "justified",
  typography-date-and-location-column-alignment: right,
  typography-font-family-body: "Source Sans 3",
  typography-font-family-name: "Source Sans 3",
  typography-font-family-headline: "Source Sans 3",
  typography-font-family-connections: "Source Sans 3",
  typography-font-family-section-titles: "Source Sans 3",
  typography-font-size-body: 10pt,
  typography-font-size-name: 25pt,
  typography-font-size-headline: 10pt,
  typography-font-size-connections: 10pt,
  typography-font-size-section-titles: 1.2em,
  typography-small-caps-name: false,
  typography-small-caps-headline: false,
  typography-small-caps-connections: false,
  typography-small-caps-section-titles: false,
  typography-bold-name: false,
  typography-bold-headline: false,
  typography-bold-connections: false,
  typography-bold-section-titles: true,
  links-underline: true,
  links-show-external-link-icon: false,
  header-alignment: center,
  header-photo-width: 3.5cm,
  header-space-below-name: 0.7cm,
  header-space-below-headline: 0.7cm,
  header-space-below-connections: 0.7cm,
  header-connections-hyperlink: true,
  header-connections-show-icons: false,
  header-connections-display-urls-instead-of-usernames: true,
  header-connections-separator: "|",
  header-connections-space-between-connections: 0.5cm,
  section-titles-type: "with_full_line",
  section-titles-line-thickness: 0.5pt,
  section-titles-space-above: 0.5cm,
  section-titles-space-below: 0.3cm,
  sections-allow-page-break: true,
  sections-space-between-text-based-entries: 0.15cm,
  sections-space-between-regular-entries: 0.42cm,
  entries-date-and-location-width: 4.15cm,
  entries-side-space: 0cm,
  entries-space-between-columns: 0.1cm,
  entries-allow-page-break: false,
  entries-short-second-row: false,
  entries-summary-space-left: 0cm,
  entries-summary-space-above: 0.08cm,
  entries-highlights-bullet:  text(13pt, [•], baseline: -0.6pt) ,
  entries-highlights-nested-bullet:  text(13pt, [•], baseline: -0.6pt) ,
  entries-highlights-space-left: 0cm,
  entries-highlights-space-above: 0.08cm,
  entries-highlights-space-between-items: 0.08cm,
  entries-highlights-space-between-bullet-and-text: 0.3em,
  date: datetime(
    year: 2025,
    month: 12,
    day: 18,
  ),
)


= Alexander Gutheil

#connections(
  [Kassel, Germany],
  [#link("mailto:gutisalex@gmail.com", icon: false, if-underline: false, if-color: false)[gutisalex\@gmail.com]],
  [#link("https://guddis.dev/", icon: false, if-underline: false, if-color: false)[guddis.dev]],
  [#link("https://linkedin.com/in/alexander-gutheil-0762a0166", icon: false, if-underline: false, if-color: false)[linkedin.com\/in\/alexander-gutheil-0762a0166]],
)


== Professional Summary

Senior Frontend Developer with 6+ years of focused experience building high-performance web and mobile applications, backed by a diverse technical background spanning system administration and 3D\/VR development. Expert in Vue.js and Nuxt.js with extensive experience in React and modern JavaScript frameworks. Proven track record of leading frontend teams and delivering enterprise-level solutions. Specialized in CMS migrations, performance optimization, and modern meta-frameworks. Currently leading frontend teams at brandung GmbH, successfully delivering large-scale migrations and platform modernizations.

== Experience

#regular-entry(
  [
    #strong[Senior Frontend Developer], brandung GmbH -- Cologne, Germany
    
  ],
  [
    Jan 2025 – Present
    
  ],
  main-column-second-row: [
    - Continue leading the Deutsche Glasfaser frontend team, driving technical decisions and architecture evolution for the ongoing platform modernization
    
    - Lead an external agency team working on the relaunch of the Deutsche Glasfaser checkout system, conducting code reviews and ensuring code quality and architectural consistency
    
    - Mentor team members and establish development best practices
    
  ],
)

#regular-entry(
  [
    #strong[Frontend Developer], brandung GmbH -- Cologne, Germany
    
  ],
  [
    Jan 2021 – Dec 2024
    
  ],
  main-column-second-row: [
    - Led the frontend team for the Deutsche Glasfaser GmbH relaunch (May 2023 – Present), a major enterprise project migrating from TYPO3 to Next.js with Contentful CMS
    
    - Architected and implemented the complete frontend solution, initially using Next.js (App Router) and TypeScript
    
    - Successfully migrated the platform to Next.js 16 and React 19, ensuring seamless transition and improved performance
    
    - Integrated Contentful CMS via GraphQL with automated type generation for type-safe content management
    
    - Implemented testing strategy with Playwright for end-to-end tests, Vitest for unit tests, and Storybook for component testing
    
    - Implemented performance optimizations including Redis caching, image optimization, and bundle analysis
    
    - Delivered a modern, scalable platform serving enterprise-level traffic with significantly improved performance and developer experience
    
    - Managed the technical migration strategy and coordinated with cross-functional teams throughout the project lifecycle
    
    - Contributed to multiple Nuxt.js relaunch projects including 1. FC Köln and About You, gaining extensive expertise in Vue.js ecosystem and headless CMS integrations
    
    - Developed and maintained high-performance web applications using React, Next.js, and Vue.js frameworks
    
    - Architected scalable frontend solutions using modern meta-frameworks (Next.js, Nuxt.js) and headless CMS platforms (Contentful, Storyblok, Scayle)
    
    - Optimized application performance and user experience, implementing best practices for responsive design with Tailwind CSS
    
  ],
)

#regular-entry(
  [
    #strong[Frontend Developer (Co-Founder)], Zazmo GmbH -- Kassel, Germany
    
  ],
  [
    Feb 2019 – Jan 2021
    
  ],
  main-column-second-row: [
    - Co-founded startup focused on innovative group payment solutions, securing EXIST founder scholarship for first-year funding
    
    - Achieved 2nd place in Hessian Founder Prize and 3rd place in Nordhessen Promotion Competition
    
    - Designed and developed a web application for group payment processing from concept to production
    
    - Built the frontend architecture using Vue.js, ensuring scalability and maintainability
    
    - Integrated third-party services and APIs including Stripe and Usercentrics
    
    - Delivered pilot project for Stadtwerke Kassel AG, which remains in active production use
    
    - Collaborated with stakeholders to conceptualize and implement digital business processes
    
    - Delivered a production-ready application meeting performance and security requirements
    
  ],
)

#regular-entry(
  [
    #strong[Software Developer], VirtuaTec -- Kassel, Germany
    
  ],
  [
    Sept 2014 – Feb 2019
    
  ],
  main-column-second-row: [
    - Developed innovative 3D applications using Unity 3D for automotive simulation environments and HMIs
    
    - Created immersive Virtual Reality experiences for automotive applications
    
    - Designed and implemented 3D models using Maya
    
    - Programmed application logic in C\# using Microsoft Visual Studio
    
    - Collaborated on storyboard development and virtual world creation
    
    - Delivered cutting-edge solutions for automotive industry clients
    
  ],
)

#regular-entry(
  [
    #strong[System Administrator], IT Service und Beratung -- Kassel, Germany
    
  ],
  [
    June 2006 – Sept 2014
    
  ],
  main-column-second-row: [
    - Managed and maintained Windows and Linux server environments
    
    - Diagnosed and resolved complex IT issues in client and server environments
    
    - Created and maintained system documentation and project requirements
    
    - Ensured reliable IT infrastructure for business operations
    
    - Provided technical support and troubleshooting for clients
    
  ],
)

#regular-entry(
  [
    #strong[Web Designer (Freelance)], Self-Employed -- Kassel, Germany
    
  ],
  [
    Aug 2003 – June 2006
    
  ],
  main-column-second-row: [
    - Designed and developed custom websites for various clients
    
    - Worked with content management systems including WordPress
    
    - Implemented SEO best practices to improve client website visibility
    
    - Managed client relationships and project delivery
    
  ],
)

== Education

#education-entry(
  [
    #strong[University of Kassel], Master of Science in Computer Science -- Kassel, Germany
    
  ],
  [
    Oct 2012 – Feb 2017
    
  ],
  main-column-second-row: [
    - Specialization: Practical Computer Science with focus on Computer Graphics and Virtual Reality
    
    - Final Grade: 1.8 (German grading system)
    
  ],
)

#education-entry(
  [
    #strong[University of Kassel], Bachelor of Science in Computer Science -- Kassel, Germany
    
  ],
  [
    Oct 2003 – Oct 2010
    
  ],
  main-column-second-row: [
    - Specialization: Practical Computer Science with focus on Web Development
    
    - Final Grade: 2.6 (German grading system)
    
  ],
)

== Skills

#strong[Frontend Frameworks & Libraries:] Vue.js, Nuxt.js, React, Next.js, TypeScript, JavaScript (ES6+)

#strong[Mobile Development:] Flutter, React Native

#strong[Backend & Languages:] Go, C\# (.NET), Node.js

#strong[Styling & Design:] Tailwind CSS, CSS3, HTML5, Responsive Design

#strong[CMS & Headless Platforms:] Contentful (GraphQL), Storyblok, Scayle

#strong[Build Tools & Testing:] Webpack, Vite, Playwright, Vitest, Jest, Storybook, Git, CI\/CD

#strong[Tools & Platforms:] Docker, Vercel, Redis, Stripe, Usercentrics, Ninetailed

#strong[Additional:] Unity 3D, Maya, Virtual Reality Development

== Additional Information

Languages: German (Native), English (Professional)

Interests: Fitness, Football

International Experience: Work & Travel in Australia (System Operator at Auscott Cotton, Moree Queensland) | March 2011 – September 2011
