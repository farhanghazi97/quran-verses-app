"use client";
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
    <div className="flex max-w-[300px] flex-col items-center justify-center gap-4 md:max-w-full">
      <Paragraph>I&apos;m feeling...</Paragraph>
      <div className="flex w-full max-w-full flex-wrap items-center justify-center gap-3">
        {categoryEnum.enumValues.map((category) => (
          <Button
            key={category}
            variant="default"
            className={cn(
              "bg-primary text-primary-foreground hover:bg-primary/80 lowercase",
              {
                "bg-happy-yellow": category === "HAPPY",
                "bg-lonely-yellow": category === "LONELY",
                "bg-anxious-blue": category === "ANXIOUS",
                "bg-angry-blue": category === "ANGRY",
                "bg-sad-pink": category === "SAD",
                "bg-thankful-pink": category === "THANKFUL",
              },
            )}
            onClick={() => onCategoryClick(category)}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
}
