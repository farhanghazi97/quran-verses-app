import { HydrateClient } from "~/trpc/server";
import App from "./app";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <App />
      </main>
    </HydrateClient>
  );
}
