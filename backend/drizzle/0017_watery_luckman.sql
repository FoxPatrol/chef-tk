DO $$ BEGIN
 ALTER TABLE "participants" ADD CONSTRAINT "participants_puuid_accounts_puuid_fk" FOREIGN KEY ("puuid") REFERENCES "public"."accounts"("puuid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
