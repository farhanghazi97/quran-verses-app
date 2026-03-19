import type { Metadata } from "next";
import { HydrateClient } from "~/trpc/server";
import App from "./app";

export const metadata: Metadata = {
  title: "Quran Verses - Farhan Ghazi",
  description: "Pick a category and read a Quran verse that matches your mood.",
};

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <App />
      </main>
    </HydrateClient>
  );
}
