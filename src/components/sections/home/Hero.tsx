import { hero, heroSlides } from "@/content/home";
import { HeroDeck } from "./hero/HeroDeck";

/**
 * The hero: full screen, a headline on the left and a deck of three slide
 * cards on the right. It shows the first headline draft in `titleOptions`.
 */
export function Hero() {
  return <HeroDeck slides={heroSlides} headline={hero.titleOptions[0]} />;
}
