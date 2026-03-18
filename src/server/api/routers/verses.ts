import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { categoryEnum } from "~/server/db/schema";

// Reads an Excel file from the public folder and returns its rows as JSON.
// By default, this looks for "data.xlsx" in the public folder, but you can
// supply a different filename via input.
export const versesRouter = createTRPCRouter({
  getVerseByCategory: publicProcedure
    .input(
      z.object({
        category: z.enum(categoryEnum.enumValues),
      }),
    )
    .query(async ({ input, ctx }) => {
      const verses = await ctx.db.query.quranVerses.findMany({
        where: (quranVerses, { eq }) =>
          eq(quranVerses.category, input?.category),
      });

      return verses;
    }),
});
