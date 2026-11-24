import heroThumbnailImg from "../../../assets/powerfit/PowerFit Onboarding App Mockup.webp";

const POWERFIT_ASSET_MODULES = import.meta.glob(
  "../../../assets/powerfit/**/*.{png,PNG,jpg,JPG,jpeg,JPEG,webp,WEBP}",
  {
    eager: true,
    import: "default",
  }
);

const KNOWN_PNG_NAMES = new Set([
  "splash.png",
  "sign in.png",
  "sign up.png",
  "verify.png",
  "gender.png",
  "height.png",
  "weight.png",
]);

function getSortedPowerFitEntries() {
  return Object.entries(POWERFIT_ASSET_MODULES).sort(([a], [b]) =>
    a.localeCompare(b, undefined, { numeric: true })
  );
}

function getFileName(assetPath) {
  return (assetPath.split("/").pop() || "").toLowerCase();
}

function isThumbnailFile(fileName) {
  return (
    fileName.includes("thumb") ||
    fileName.includes("thamb") ||
    fileName.includes("cover") ||
    fileName.includes("mockup")
  );
}

function findEntryByKeywords(entries, keywords) {
  return entries.find(([assetPath]) => {
    const fileName = getFileName(assetPath);
    return keywords.some((kw) => fileName.includes(kw));
  });
}

function resolvePowerFitAssets() {
  const entries = getSortedPowerFitEntries();

  const findKnown = (targetName) =>
    entries.find(([assetPath]) => getFileName(assetPath) === targetName)?.[1] ??
    null;

  const splash = findKnown("splash.png");
  const signIn = findKnown("sign in.png");
  const signUp = findKnown("sign up.png");
  const verify = findKnown("verify.png");
  const gender = findKnown("gender.png");
  const height = findKnown("height.png");
  const weight = findKnown("weight.png");

  const remainingEntries = entries.filter(([assetPath]) => {
    const fileName = getFileName(assetPath);
    return !KNOWN_PNG_NAMES.has(fileName) && !isThumbnailFile(fileName);
  });

  const usedPaths = new Set();
  const claimMatch = (pool, keywords, allowFallback = true) => {
    const available = pool.filter(([p]) => !usedPaths.has(p));
    const matched = findEntryByKeywords(available, keywords);
    if (matched) {
      usedPaths.add(matched[0]);
      return matched[1];
    }
    if (allowFallback && available[0]) {
      usedPaths.add(available[0][0]);
      return available[0][1];
    }
    return null;
  };

  // Prioritize .jpg/.jpeg/.webp or onboarding-named files for the 3 photo onboarding screens.
  const photoPool = remainingEntries.filter(([assetPath]) => {
    const fileName = getFileName(assetPath);
    return (
      /\.(jpe?g|webp)$/i.test(fileName) ||
      /welcome|workout|favorite|goal|onboard|intro|slide/i.test(fileName)
    );
  });

  const onboardingWelcome = claimMatch(photoPool, ["welcome", "1"]);
  const onboardingWorkout = claimMatch(photoPool, ["workout", "favorite", "2"]);
  const onboardingGoals = claimMatch(photoPool, ["goal", "training", "3"]);

  // Remaining PNG screens map to Step 4 (frequency) and plan building (45%).
  const remainingPngPool = remainingEntries.filter(([assetPath]) =>
    getFileName(assetPath).endsWith(".png")
  );

  const frequency = claimMatch(remainingPngPool, [
    "train",
    "freq",
    "often",
    "step 4",
    "step4",
    "routine",
    "habit",
  ]);
  const planBuilding = claimMatch(remainingPngPool, [
    "plan",
    "load",
    "build",
    "creat",
    "45",
    "progress",
    "prep",
  ]);

  return {
    thumbnail: heroThumbnailImg,
    splash,
    onboardingWelcome,
    onboardingWorkout,
    onboardingGoals,
    signUp,
    signIn,
    verify,
    gender,
    height,
    weight,
    frequency,
    planBuilding,
  };
}

const ASSETS = resolvePowerFitAssets();

export const POWERFIT_CASE_STUDY = {
  intro: {
    index: "01. Project Introduction",
    tags: ["Mobile App UI Design", "12 UI Screens"],
    title: "PowerFit",
    subtitle: "Fitness & Workout Mobile App",
    lead: "A personalised fitness experience designed to make starting a fitness journey simple, intuitive and engaging.",
    summary:
      "PowerFit is a mobile app design concept that combines a minimal visual identity, guided onboarding and personalised fitness planning to help users build healthier training routines.",
    specs: [
      { label: "Project type", value: "Mobile App UI Design" },
      { label: "My role", value: "UI/UX Designer" },
      { label: "Platform", value: "Mobile" },
      { label: "Design tool", value: "Figma" },
      { label: "Industry", value: "Health & Fitness" },
      { label: "Design scope", value: "12 UI Screens" },
    ],
    heroThumbnail: ASSETS.thumbnail,
    heroThumbnailAlt:
      "PowerFit three-phone showcase featuring splash screen and onboarding screens",
  },
  overview: {
    index: "02. Project Overview",
    heading: "Designed for Focus from First Tap",
    copy: "PowerFit is a fitness mobile app concept designed to simplify the journey from getting started to building a personalised training plan. The interface focuses on clarity, accessibility and ease of use through a minimal monochromatic design, structured layouts and intuitive navigation.",
  },
  designDirection: {
    index: "03. Design Direction",
    heading: "Minimal. Bold. Focused.",
    description:
      "The visual direction combines strong typography, monochromatic colours and motivational fitness photography to create a confident and distraction-free experience.",
    tokens: [
      {
        hex: "#171717",
        label: "Primary",
        swatchClass: "pf-token-swatch--primary",
      },
      {
        hex: "#FFFFFF",
        label: "Background",
        swatchClass: "pf-token-swatch--background",
      },
      {
        hex: "#F3F4F5",
        label: "Surface",
        swatchClass: "pf-token-swatch--surface",
      },
      {
        hex: "#626262",
        label: "Secondary",
        swatchClass: "pf-token-swatch--secondary",
      },
    ],
    typography: {
      specimen: "Aa",
      sampleHeadline: "Your goals. Your training.",
      description:
        "Clean sans-serif typography with bold headings and readable supporting text.",
    },
    components: {
      stepLabel: "Step 3 of 5",
      progressLabel: "60%",
      inputPlaceholder: "Enter your email or username",
      options: [
        { label: "3–5 times a week", selected: true },
        { label: "1–2 times a week", selected: false },
      ],
      ctaLabel: "Continue",
    },
  },
  showcase: {
    index: "04. UI Screen Showcase",
    groups: [
      {
        id: "first-impression",
        eyebrow: "01 / FIRST IMPRESSION",
        title: "An engaging introduction",
        description:
          "A visually immersive onboarding experience that introduces PowerFit through motivational imagery, bold typography and clear calls to action.",
        layout: "four",
        screens: [
          {
            id: "splash",
            label: "Splash Screen",
            src: ASSETS.splash,
            alt: "PowerFit minimal black splash screen with white PowerFit logo",
          },
          {
            id: "onboarding-1",
            label: "Welcome to PowerFit",
            src: ASSETS.onboardingWelcome,
            alt: "PowerFit onboarding step 1: Welcome to PowerFit with Next CTA",
          },
          {
            id: "onboarding-2",
            label: "Find Your Favorite Workout",
            src: ASSETS.onboardingWorkout,
            alt: "PowerFit onboarding step 2: Find your favorite workout with Next CTA",
          },
          {
            id: "onboarding-3",
            label: "Your Goals. Your Training.",
            src: ASSETS.onboardingGoals,
            alt: "PowerFit onboarding step 3: Your goals. Your training. with Get started CTA",
          },
        ],
      },
      {
        id: "authentication",
        eyebrow: "02 / AUTHENTICATION",
        title: "Simple and secure access",
        description:
          "Clean authentication interfaces designed to reduce visual clutter and guide users through account creation, sign-in and phone number verification.",
        layout: "three",
        screens: [
          {
            id: "sign-up",
            label: "Create Account",
            src: ASSETS.signUp,
            alt: "PowerFit create your account registration screen with clean rounded input fields",
          },
          {
            id: "sign-in",
            label: "Sign In",
            src: ASSETS.signIn,
            alt: "PowerFit Welcome back sign-in screen with social login options",
          },
          {
            id: "verify-otp",
            label: "Phone Verification",
            src: ASSETS.verify,
            alt: "PowerFit 6-digit phone number verification screen with resend timer",
          },
        ],
      },
      {
        id: "personalisation",
        eyebrow: "03 / PERSONALISATION",
        title: "Built around the individual",
        description:
          "A guided profile setup that collects personal preferences, physical measurements and training frequency through focused, step-by-step interfaces.",
        layout: "four",
        screens: [
          {
            id: "step-1-gender",
            label: "Step 1 — Identity",
            src: ASSETS.gender,
            alt: "PowerFit personalisation step 1 of 5 asking how the user identifies",
          },
          {
            id: "step-2-height",
            label: "Step 2 — Height",
            src: ASSETS.height,
            alt: "PowerFit personalisation step 2 of 5 height input with ft/in and cm toggle",
          },
          {
            id: "step-3-weight",
            label: "Step 3 — Weight",
            src: ASSETS.weight,
            alt: "PowerFit personalisation step 3 of 5 weight input with lb and kg toggle",
          },
          {
            id: "step-4-frequency",
            label: "Step 4 — Frequency",
            src: ASSETS.frequency,
            alt: "PowerFit personalisation step 4 of 5 asking how often the user trains",
          },
        ],
      },
      {
        id: "personalised-training",
        eyebrow: "04 / PERSONALISED TRAINING",
        title: "A plan built around you",
        description:
          "A minimal progress interface that communicates the training plan preparation process, providing clear system feedback and setting expectations.",
        layout: "spotlight",
        screens: [
          {
            id: "plan-preparation",
            label: "Plan Preparation — 45%",
            src: ASSETS.planBuilding,
            alt: "PowerFit personalised training plan preparation screen showing 45% progress bar",
          },
        ],
      },
    ],
  },
  decisions: {
    index: "05. Key Design Decisions",
    heading: "Design Decisions & Purpose",
    items: [
      {
        decision: "Monochromatic colour palette",
        purpose: "Creates a focused and consistent visual identity.",
      },
      {
        decision: "Bold typography",
        purpose: "Establishes clear visual hierarchy.",
      },
      {
        decision: "Step-by-step onboarding",
        purpose: "Reduces information overload.",
      },
      {
        decision: "Progress indicators",
        purpose: "Communicates the user's position within the setup process.",
      },
      {
        decision: "Consistent components",
        purpose: "Maintains visual and interaction consistency.",
      },
      {
        decision: "Clear primary actions",
        purpose: "Guides users towards their next step.",
      },
      {
        decision: "Optional profile inputs",
        purpose: "Provides flexibility and greater user control.",
      },
    ],
  },
  conclusion: {
    index: "06. Project Conclusion",
    heading: "Closing Reflection",
    copy: "PowerFit explores how minimal visual design, consistent UI components and guided interactions can create an engaging fitness onboarding experience. The project reflects my approach to designing intuitive, visually refined and user-centred mobile interfaces.",
  },
};
