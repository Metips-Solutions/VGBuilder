ALTER TABLE "character_tags" ADD CONSTRAINT "character_tags_character_id_tag_id_pk" PRIMARY KEY("character_id","tag_id");--> statement-breakpoint
ALTER TABLE "artifact_sets" ADD COLUMN "archetype_tag_id" integer;--> statement-breakpoint
ALTER TABLE "character_tags" ADD COLUMN "min_constellation" integer;--> statement-breakpoint
ALTER TABLE "character_tags" ADD COLUMN "min_alignment_count" integer;--> statement-breakpoint
ALTER TABLE "characters" ADD COLUMN "element" text NOT NULL;--> statement-breakpoint
ALTER TABLE "characters" ADD COLUMN "weapon_type" text NOT NULL;--> statement-breakpoint
ALTER TABLE "characters" ADD COLUMN "rarity" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "characters" ADD COLUMN "region" text NOT NULL;--> statement-breakpoint
ALTER TABLE "characters" ADD COLUMN "alignment_class" text;--> statement-breakpoint
ALTER TABLE "characters" ADD COLUMN "image_url" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "artifact_sets" ADD CONSTRAINT "artifact_sets_archetype_tag_id_tags_id_fk" FOREIGN KEY ("archetype_tag_id") REFERENCES "public"."tags"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "tag_id_idx" ON "character_tags" USING btree ("tag_id");--> statement-breakpoint
ALTER TABLE "artifact_sets" DROP COLUMN IF EXISTS "archetype_tag";--> statement-breakpoint
ALTER TABLE "character_tags" DROP COLUMN IF EXISTS "id";--> statement-breakpoint
ALTER TABLE "tags" ADD CONSTRAINT "game_category_value_unq" UNIQUE("game_id","category","value");