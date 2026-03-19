"use client";
import Typewriter, { type Options } from "typewriter-effect";
import { cn } from "~/lib/utils";
import type { Category } from "~/server/db/schema";

const typewriterOptions: Options = {
  strings: ["Anxious,", "Lonely,", "Thankful,", "Sad,", "Angry,"],
  autoStart: true,
  loop: true,
  wrapperClassName: "text-xl font-bold",
  cursorClassName: "text-xl",
};

const HeroSection = ({ selectedCategory }: { selectedCategory: Category }) => {
  const colorClass = cn({
    "text-happy-yellow": selectedCategory === "HAPPY",
    "text-lonely-yellow": selectedCategory === "LONELY",
    "text-thankful-pink": selectedCategory === "THANKFUL",
    "text-sad-pink": selectedCategory === "SAD",
    "text-angry-blue": selectedCategory === "ANGRY",
    "text-anxious-blue": selectedCategory === "ANXIOUS",
  });

  return (
    <div className={colorClass}>
      <Typewriter options={typewriterOptions} />
    </div>
  );
};

export default HeroSection;
