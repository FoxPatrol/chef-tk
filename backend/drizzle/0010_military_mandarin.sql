ALTER TABLE "info" RENAME TO "matches";--> statement-breakpoint
ALTER TABLE "participant" RENAME TO "participants";--> statement-breakpoint
ALTER TABLE "participants" DROP CONSTRAINT "participant_matchId_info_matchId_fk";
--> statement-breakpoint
ALTER TABLE "participants" DROP CONSTRAINT "participant_item0_items_id_fk";
--> statement-breakpoint
ALTER TABLE "participants" DROP CONSTRAINT "participant_item1_items_id_fk";
--> statement-breakpoint
ALTER TABLE "participants" DROP CONSTRAINT "participant_item2_items_id_fk";
--> statement-breakpoint
ALTER TABLE "participants" DROP CONSTRAINT "participant_item3_items_id_fk";
--> statement-breakpoint
ALTER TABLE "participants" DROP CONSTRAINT "participant_item4_items_id_fk";
--> statement-breakpoint
ALTER TABLE "participants" DROP CONSTRAINT "participant_item5_items_id_fk";
--> statement-breakpoint
ALTER TABLE "participants" DROP CONSTRAINT "participant_item6_items_id_fk";
--> statement-breakpoint
ALTER TABLE "perks" DROP CONSTRAINT "perks_participantId_participant_id_fk";
--> statement-breakpoint
ALTER TABLE "team" DROP CONSTRAINT "team_matchId_info_matchId_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "participants" ADD CONSTRAINT "participants_matchId_matches_matchId_fk" FOREIGN KEY ("matchId") REFERENCES "public"."matches"("matchId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "participants" ADD CONSTRAINT "participants_item0_items_id_fk" FOREIGN KEY ("item0") REFERENCES "public"."items"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "participants" ADD CONSTRAINT "participants_item1_items_id_fk" FOREIGN KEY ("item1") REFERENCES "public"."items"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "participants" ADD CONSTRAINT "participants_item2_items_id_fk" FOREIGN KEY ("item2") REFERENCES "public"."items"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "participants" ADD CONSTRAINT "participants_item3_items_id_fk" FOREIGN KEY ("item3") REFERENCES "public"."items"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "participants" ADD CONSTRAINT "participants_item4_items_id_fk" FOREIGN KEY ("item4") REFERENCES "public"."items"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "participants" ADD CONSTRAINT "participants_item5_items_id_fk" FOREIGN KEY ("item5") REFERENCES "public"."items"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "participants" ADD CONSTRAINT "participants_item6_items_id_fk" FOREIGN KEY ("item6") REFERENCES "public"."items"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "perks" ADD CONSTRAINT "perks_participantId_participants_id_fk" FOREIGN KEY ("participantId") REFERENCES "public"."participants"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "team" ADD CONSTRAINT "team_matchId_matches_matchId_fk" FOREIGN KEY ("matchId") REFERENCES "public"."matches"("matchId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
