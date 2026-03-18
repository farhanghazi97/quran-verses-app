import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  const verses = await api.verses.getVerseByCategory({ category: "LONELY" });
  console.log(verses);
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center text-white"></main>
    </HydrateClient>
  );
}
