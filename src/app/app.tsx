"use client";

import { useEffect, useRef, useState } from "react";
import { Spinner } from "~/components/ui/spinner";
import { Heading } from "~/components/ui/typography";
import {
  categoryEnum,
  type Category,
  type QuranVerse,
} from "~/server/db/schema";
import { api } from "~/trpc/react";
import { CategoryButtons } from "./_components/CategoryButtons";
import HeroSection from "./_components/Hero";
import Verse from "./_components/Verse";

const App = () => {
  // const { data: seedVerses } = api.excel.seedVerses.useQuery({
  //   filename: "Quran Verses.xlsx",
  // });
  // console.log(seedVerses);

  const [category, setCategory] = useState<Category | null>(null);
  const [randomVerse, setRandomVerse] = useState<QuranVerse | null>(null);
  const [verseRefreshKey, setVerseRefreshKey] = useState(0);
  const audioStartedRef = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const utils = api.useUtils();

  useEffect(() => {
    void Promise.all(
      categoryEnum.enumValues.map((cat) =>
        utils.verses.getVerseByCategory.prefetch({ category: cat }),
      ),
    );
  }, [utils]);

  const startAudioOnce = () => {
    if (audioStartedRef.current) return;
    audioStartedRef.current = true;
    const audio = new Audio("/assets/Fulfilling%20Humming.mp3");
    audioRef.current = audio;
    audio.loop = true;
    audio.play().catch((err) => {
      console.error("Audio play failed:", err);
      audioStartedRef.current = false;
    });
  };

  const { data: verses, isLoading } = api.verses.getVerseByCategory.useQuery(
    {
      category: category ?? "HAPPY",
    },
    { enabled: !!category },
  );

  const currentCategory = category ?? "HAPPY";

  useEffect(() => {
    if (!verses || verses.length === 0) return;
    // Only pick from verses that match the selected category (avoid stale data when switching category)
    if (verses[0]?.category !== currentCategory) return;
    const random = verses[Math.floor(Math.random() * verses.length)] ?? null;
    setRandomVerse(random);
  }, [verses, verseRefreshKey, currentCategory]);

  if (isLoading) {
    return (
      <div className="mx-auto flex flex-col items-center justify-center">
        <Spinner className="text-primary size-10" />
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div className="flex max-w-[200px] flex-col items-center justify-center gap-1 md:max-w-full md:flex-row">
        <Heading variant="h3" className="shrink-0 text-xl font-bold">
          If you&apos;re feeling
        </Heading>
        <HeroSection selectedCategory={currentCategory} />
        <Heading variant="h3" className="shrink-0 text-xl font-bold">
          there&apos;s a verse in the Quran just for you.
        </Heading>
      </div>
      {randomVerse && (
        <Verse verse={randomVerse} selectedCategory={currentCategory} />
      )}
      <CategoryButtons
        onCategoryClick={async (category: Category) => {
          startAudioOnce();
          setCategory(category);
          setVerseRefreshKey((k) => k + 1);
        }}
      />
    </div>
  );
};
export default App;
