import heroShowcaseImg from "../../../assets/wadakaru thumbail.webp";
import homeCleanScreen from "../../../assets/wadakaru1.webp";
import onboardingCleanScreen from "../../../assets/wadakaru3.png";
import profileCleanScreen from "../../../assets/wadakaru2.png";
import homeAnnotatedScreen from "../../../assets/home.webp";
import onboardingAnnotatedScreen from "../../../assets/landing.webp";

export const WADAKARU_CASE_STUDY = {
  intro: {
    index: "01 — Project Introduction",
    tags: ["Mobile UI Design", "Concept Project"],
    title: "වැඩකරු.lk",
    subtitle: "Home Services Booking App",
    lead: "Connecting homeowners with local service professionals through a simple and intuitive mobile experience.",
    heroImage: {
      src: heroShowcaseImg,
      alt: "වැඩකරු.lk mobile app interface showcase featuring Home & Service Discovery, Provider Profile, and Onboarding iPhone screens",
    },
  },
  overview: {
    index: "02 — Project Overview",
    heading: "About the Project",
    paragraphs: [
      "වැඩකරු.lk is a mobile app UI concept designed to simplify how homeowners discover local service professionals, including plumbers, electricians, and handymen.",
      "The design focuses on straightforward navigation, clear service information, and a welcoming visual experience.",
    ],
    specs: [
      { label: "Project Type", value: "Mobile UI Concept" },
      { label: "Design Tool", value: "Figma" },
      { label: "Platform", value: "Mobile" },
      { label: "Focus", value: "Interface Design" },
    ],
  },
  showcase: {
    index: "03 — UI Screen Showcase",
    heading: "Core App Screens & Specifications",
    screens: [
      {
        id: "screen-01",
        eyebrow: "SCREEN 01",
        title: "Welcome & Onboarding",
        description:
          "A welcoming introduction that communicates the app's purpose using friendly imagery, concise messaging, and a clear Get Started action.",
        highlights: [
          "Brand header paired with approachable technician photography over a subtle map backdrop",
          "Four-step onboarding progress indicator above a full-width primary pill CTA",
        ],
        src: onboardingCleanScreen,
        alt: "වැඩකරු.lk welcome and onboarding screen with වැඩකරු.lk header, Trusted Home Services copy, and Get Started button",
      },
      {
        id: "screen-02",
        eyebrow: "SCREEN 02",
        title: "Home & Service Discovery",
        description:
          "A location-based home screen that brings together service categories, search functionality, and nearby professionals with useful information such as ratings, pricing, and distance.",
        highlights: [
          "Active location header (Poddala, Galle), notification trigger, and rounded location search bar",
          "Five circular service categories (House, Electricity, Handcraft, Plumber, More) and scannable nearby cards",
        ],
        src: homeCleanScreen,
        alt: "වැඩකරු.lk home screen with location search, service category icons, nearby technician cards, and five-tab bottom navigation",
      },
      {
        id: "screen-03",
        eyebrow: "SCREEN 03",
        title: "Provider Profile & Booking",
        description:
          "A dedicated technician profile screen presenting years of experience, service summary, verified customer reviews, hourly rate, and an immediate Hire action.",
        highlights: [
          "Service photo carousel header paired with a framed provider portrait and bio section",
          "Clear hourly pricing bar (Rs. 2500 / 1hr) anchored beside a prominent Hire button",
        ],
        src: profileCleanScreen,
        alt: "වැඩකරු.lk service provider detail page for Sampath Perara showing experience, reviews, pricing, and Hire Sampath CTA",
      },
    ],
    designDetail: {
      eyebrow: "DESIGN DETAIL",
      title: "Layout & UI Specifications",
      description:
        "An annotated view of the home screen highlighting consistent spacing, icon dimensions, component sizes, and alignment throughout the interface.",
      specs: [
        "56px top safe spacing & 48px circular action/category targets",
        "343px × 42px rounded search input & 24px uniform icon grid",
        "200px nearby service cards with 25px spacing & 314px × 48px onboarding CTA",
      ],
      annotatedScreens: [
        {
          id: "home-specs",
          caption: "Home Screen — Spacing & Component Grid",
          src: homeAnnotatedScreen,
          alt: "Annotated වැඩකරු.lk home screen detailing 56px top margin, 48px icons, 343px search bar, 200px cards, and 24px navigation icons",
        },
        {
          id: "onboarding-specs",
          caption: "Onboarding Screen — Alignment & CTA Sizing",
          src: onboardingAnnotatedScreen,
          alt: "Annotated වැඩකරු.lk onboarding screen showing 58px top spacing, 128px brand offset, 72px headline margins, and 314px by 48px button",
        },
      ],
    },
  },
  visualDesign: {
    index: "04 — Visual Design Details",
    heading: "Design Language",
    description:
      "A warm, approachable visual style built around simple navigation, clear typography, and consistent interface components.",
    palette: [
      {
        id: "primary-yellow",
        name: "Primary Yellow",
        role: "CTAs, active nav & highlights",
        tokenClass: "swatch-chip--primary-yellow",
      },
      {
        id: "soft-yellow",
        name: "Soft Yellow",
        role: "Warm header gradient",
        tokenClass: "swatch-chip--soft-yellow",
      },
      {
        id: "text",
        name: "Text",
        role: "Headings & labels",
        tokenClass: "swatch-chip--text",
      },
      {
        id: "surface",
        name: "Surface",
        role: "Inputs & icon containers",
        tokenClass: "swatch-chip--surface",
      },
      {
        id: "white",
        name: "White",
        role: "Screen canvas & cards",
        tokenClass: "swatch-chip--white",
      },
    ],
    pillars: [
      {
        title: "Typography",
        copy: "Clean sans-serif typography creates a clear hierarchy between headings, service labels, and supporting information.",
      },
      {
        title: "Components",
        copy: "Rounded search fields, circular category icons, service cards, and prominent call-to-action buttons create a consistent visual language.",
      },
      {
        title: "Navigation",
        copy: "A five-item bottom navigation bar provides access to Home, Chat, Discover, History, and Settings.",
      },
    ],
  },
  closing: {
    index: "05 — Project Closing",
    heading: "Project Reflection",
    copy: "වැඩකරු.lk allowed me to explore mobile interface design through a practical home services concept, focusing on visual hierarchy, component consistency, spacing, and accessible presentation of service information.",
  },
};
