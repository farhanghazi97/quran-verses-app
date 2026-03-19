DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_type t
    JOIN pg_namespace n ON n.oid = t.typnamespace
    WHERE t.typname = 'category' AND n.nspname = 'public'
  ) THEN
    CREATE TYPE "public"."category" AS ENUM(
      'HAPPY',
      'SAD',
      'ANGRY',
      'ANXIOUS',
      'LONELY',
      'THANKFUL'
    );
  END IF;
END $$;
--> statement-breakpoint

-- Cast existing varchar values to the enum explicitly.
ALTER TABLE "quran-verses_quran_verses"
  ALTER COLUMN "category"
  SET DATA TYPE category
  USING ("category"::category);