// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { index, pgEnum, pgTableCreator } from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `quran-verses_${name}`);

export const categoryEnum = pgEnum("category", [
  "HAPPY",
  "SAD",
  "ANGRY",
  "ANXIOUS",
  "LONELY",
  "THANKFUL",
]);

export const posts = createTable(
  "post",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    name: d.varchar({ length: 256 }),
    createdAt: d
      .timestamp({ withTimezone: true })
      .$defaultFn(() => /* @__PURE__ */ new Date())
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => [index("name_idx").on(t.name)],
);

export const quranVerses = createTable(
  "quran_verses",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    verse: d.varchar({ length: 256 }),
    category: categoryEnum("category"),
    chapterNumber: d.integer(),
    verseNumber: d.integer(),
    chapterName: d.varchar({ length: 256 }),
    createdAt: d
      .timestamp({ withTimezone: true })
      .$defaultFn(() => new Date())
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => [index("verse_idx").on(t.verse)],
);
