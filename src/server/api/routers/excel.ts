import fs from "node:fs";
import path from "node:path";

import * as XLSX from "xlsx";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { type categoryEnum, quranVerses } from "~/server/db/schema";

// Reads an Excel file from the public folder and returns its rows as JSON.
// By default, this looks for "data.xlsx" in the public folder, but you can
// supply a different filename via input.
export const excelRouter = createTRPCRouter({
  seedVerses: publicProcedure
    .input(
      z
        .object({
          filename: z.string().default("data.xlsx"),
        })
        .optional(),
    )
    .query(async ({ input, ctx }) => {
      const filename = input?.filename ?? "data.xlsx";

      const filePath = path.join(process.cwd(), "public", filename);

      if (!fs.existsSync(filePath)) {
        throw new Error(`Excel file not found at path: ${filePath}`);
      }

      const fileBuffer = fs.readFileSync(filePath);

      const workbook = XLSX.read(fileBuffer, { type: "buffer" });

      const sheetName = workbook.SheetNames[0]!;
      const sheet = workbook.Sheets[sheetName]!;

      const rows = XLSX.utils
        .sheet_to_json<typeof quranVerses.$inferSelect>(sheet, {
          defval: null,
        })
        .map((row) => ({
          ...row,
          category:
            row.category?.toUpperCase() as (typeof categoryEnum.enumValues)[number],
        }));

      await ctx.db.insert(quranVerses).values(rows);
    }),
});
