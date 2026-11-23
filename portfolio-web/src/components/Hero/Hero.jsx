import sriLankaFlag from "../../assets/flag.webp";
import { APP_ROUTES } from "../../utils/router.js";
import HeroContent from "./HeroContent.jsx";
import HeroVisual from "./HeroVisual.jsx";
import "./Hero.css";

const HERO_CONTENT = {
  greeting: "Hello,",
  name: "I’m Praveen Kalansooriya",
  role: "UI/UX Designer · Sri Lanka",
  roleFlag: sriLankaFlag,
  bio: "Combining creative thinking and technical knowledge to craft intuitive interfaces and thoughtful user experiences.",
  primaryCta: {
    label: "Explore My Work",
    href: APP_ROUTES.WORK,
  },
  secondaryCta: {
    label: "Let’s Talk",
    href: APP_ROUTES.CONTACT,
  },
};

/**
 * Hero section parent combining text introduction and animated brand visual.
 */
export default function Hero({ onNavigate }) {
  return (
    <section className="shell hero" id="home" aria-labelledby="hero-heading">
      <HeroContent
        greeting={HERO_CONTENT.greeting}
        name={HERO_CONTENT.name}
        role={HERO_CONTENT.role}
        roleFlag={HERO_CONTENT.roleFlag}
        bio={HERO_CONTENT.bio}
        primaryCta={HERO_CONTENT.primaryCta}
        secondaryCta={HERO_CONTENT.secondaryCta}
        onNavigate={onNavigate}
      />
      <HeroVisual />
    </section>
  );
}
