ALTER TABLE "ban" DROP CONSTRAINT "ban_teamId_team_id_fk";
--> statement-breakpoint
ALTER TABLE "objective" DROP CONSTRAINT "objective_teamId_team_id_fk";
--> statement-breakpoint
ALTER TABLE "participants" DROP CONSTRAINT "participants_matchId_matches_matchId_fk";
--> statement-breakpoint
ALTER TABLE "team" DROP CONSTRAINT "team_matchId_matches_matchId_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ban" ADD CONSTRAINT "ban_teamId_team_id_fk" FOREIGN KEY ("teamId") REFERENCES "public"."team"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "objective" ADD CONSTRAINT "objective_teamId_team_id_fk" FOREIGN KEY ("teamId") REFERENCES "public"."team"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "participants" ADD CONSTRAINT "participants_matchId_matches_matchId_fk" FOREIGN KEY ("matchId") REFERENCES "public"."matches"("matchId") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "team" ADD CONSTRAINT "team_matchId_matches_matchId_fk" FOREIGN KEY ("matchId") REFERENCES "public"."matches"("matchId") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
