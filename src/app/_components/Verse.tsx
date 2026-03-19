"use client";
import { motion } from "motion/react";
import { Heading, Paragraph } from "~/components/ui/typography";
import VERSES_MAP from "~/data/verse-mapping";
import { cn } from "~/lib/utils";
import type { Category, QuranVerse } from "~/server/db/schema";

const Verse = ({
  verse,
  selectedCategory,
}: {
  verse: QuranVerse;
  selectedCategory: Category;
}) => {
  const colorClass = cn("px-10 md:px-0", {
    "text-happy-yellow": selectedCategory === "HAPPY",
    "text-lonely-yellow": selectedCategory === "LONELY",
    "text-thankful-pink": selectedCategory === "THANKFUL",
    "text-sad-pink": selectedCategory === "SAD",
    "text-angry-blue": selectedCategory === "ANGRY",
    "text-anxious-blue": selectedCategory === "ANXIOUS",
  });
  return (
    <div className="flex max-w-xl flex-col md:max-w-2xl">
      <div className="flex flex-col gap-4">
        <motion.div
          key={`${selectedCategory}-${verse.chapterNumber}:${verse.verseNumber}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Heading variant="h1" dir="rtl" lang="ar">
            {VERSES_MAP[selectedCategory]?.[Number(verse.chapterNumber)]?.[
              Number(verse.verseNumber)
            ] ?? ""}
          </Heading>
        </motion.div>
        <motion.div
          key={`${verse.chapterNumber}:${verse.verseNumber}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Heading
            variant="h3"
            className={colorClass}
          >{`"${verse.verse}"`}</Heading>
        </motion.div>
      </div>
      <Paragraph className="px-14 text-end md:px-0">{`${verse.chapterName}, ${verse.chapterNumber}:${verse.verseNumber}`}</Paragraph>
    </div>
  );
};

export default Verse;
