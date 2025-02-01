ALTER TABLE "perkSelections" DROP CONSTRAINT "perkSelections_perkStyleId_perkStyles_id_fk";
--> statement-breakpoint
ALTER TABLE "perkStyles" DROP CONSTRAINT "perkStyles_perksId_perks_id_fk";
--> statement-breakpoint
ALTER TABLE "perks" DROP CONSTRAINT "perks_participantId_participants_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "perkSelections" ADD CONSTRAINT "perkSelections_perkStyleId_perkStyles_id_fk" FOREIGN KEY ("perkStyleId") REFERENCES "public"."perkStyles"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "perkStyles" ADD CONSTRAINT "perkStyles_perksId_perks_id_fk" FOREIGN KEY ("perksId") REFERENCES "public"."perks"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "perks" ADD CONSTRAINT "perks_participantId_participants_id_fk" FOREIGN KEY ("participantId") REFERENCES "public"."participants"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
