"use client";
import { motion } from "motion/react";
import { Button } from "~/components/ui/button";
import { Paragraph } from "~/components/ui/typography";
import { cn } from "~/lib/utils";
import { categoryEnum, type Category } from "~/server/db/schema";
export function CategoryButtons({
  onCategoryClick,
}: {
  onCategoryClick: (category: Category) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1,
        scale: { type: "spring", visualDuration: 1, bounce: 0.5 },
      }}
      className="flex max-w-[300px] flex-col items-center justify-center gap-4 md:max-w-full"
    >
      <Paragraph>I&apos;m feeling...</Paragraph>
      <div className="flex w-full max-w-full flex-wrap items-center justify-center gap-3">
        {categoryEnum.enumValues.map((category) => (
          <Button
            key={category}
            variant="default"
            className={cn("bg-primary text-primary-foreground lowercase", {
              "bg-happy-yellow hover:bg-happy-yellow/80": category === "HAPPY",
              "bg-lonely-yellow hover:bg-lonely-yellow/80":
                category === "LONELY",
              "bg-anxious-blue hover:bg-anxious-blue/80":
                category === "ANXIOUS",
              "bg-angry-blue hover:bg-angry-blue/80": category === "ANGRY",
              "bg-sad-pink hover:bg-sad-pink/80": category === "SAD",
              "bg-thankful-pink hover:bg-thankful-pink/80":
                category === "THANKFUL",
            })}
            onClick={() => onCategoryClick(category)}
          >
            {category}
          </Button>
        ))}
      </div>
    </motion.div>
  );
}
