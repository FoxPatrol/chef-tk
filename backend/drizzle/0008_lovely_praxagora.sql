--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "perkSelections" ADD CONSTRAINT "perkSelections_perk_perkNames_id_fk" FOREIGN KEY ("perk") REFERENCES "public"."perkNames"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
