CREATE TABLE IF NOT EXISTS "ban" (
	"id" serial PRIMARY KEY NOT NULL,
	"teamId" integer,
	"championId" integer,
	"pickTurn" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "info" (
	"matchId" varchar(255) PRIMARY KEY NOT NULL,
	"endOfGameResult" varchar(255),
	"gameCreation" integer,
	"gameDuration" integer,
	"gameEndTimestamp" integer,
	"gameId" integer,
	"gameMode" varchar(255),
	"gameName" varchar(255),
	"gameStartTimestamp" integer,
	"gameType" varchar(255),
	"gameVersion" varchar(255),
	"mapId" integer,
	"platformId" varchar(255),
	"queueId" integer,
	"tournamentCode" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "legendaryItemUsed" (
	"id" serial PRIMARY KEY NOT NULL,
	"participantId" integer,
	"itemId" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "objective" (
	"id" serial PRIMARY KEY NOT NULL,
	"teamId" integer,
	"baronFirst" boolean,
	"baronKills" integer,
	"championFirst" boolean,
	"championKills" integer,
	"dragonFirst" boolean,
	"dragonKills" integer,
	"hordeFirst" boolean,
	"hordeKills" integer,
	"inhibitorFirst" boolean,
	"inhibitorKills" integer,
	"riftHeraldFirst" boolean,
	"riftHeraldKills" integer,
	"towerFirst" boolean,
	"towerKills" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "participant" (
	"id" serial PRIMARY KEY NOT NULL,
	"matchId" varchar(255),
	"participantId" integer,
	"puuid" varchar(255),
	"summonerId" varchar(255),
	"summonerName" varchar(255),
	"teamId" integer,
	"championId" integer,
	"championName" varchar(255),
	"lane" varchar(255),
	"role" varchar(255),
	"individualPosition" varchar(255),
	"win" boolean,
	"kills" integer,
	"deaths" integer,
	"assists" integer,
	"allInPings" integer,
	"assistMePings" integer,
	"baronKills" integer,
	"basicPings" integer,
	"bountyLevel" integer,
	"champExperience" integer,
	"champLevel" integer,
	"championTransform" integer,
	"commandPings" integer,
	"consumablesPurchased" integer,
	"damageDealtToBuildings" integer,
	"damageDealtToObjectives" integer,
	"damageDealtToTurrets" integer,
	"damageSelfMitigated" integer,
	"dangerPings" integer,
	"detectorWardsPlaced" integer,
	"doubleKills" integer,
	"dragonKills" integer,
	"eligibleForProgression" boolean,
	"enemyMissingPings" integer,
	"enemyVisionPings" integer,
	"firstBloodAssist" boolean,
	"firstBloodKill" boolean,
	"firstTowerAssist" boolean,
	"firstTowerKill" boolean,
	"gameEndedInEarlySurrender" boolean,
	"gameEndedInSurrender" boolean,
	"getBackPings" integer,
	"goldEarned" integer,
	"goldSpent" integer,
	"holdPings" integer,
	"inhibitorKills" integer,
	"inhibitorTakedowns" integer,
	"inhibitorsLost" integer,
	"item0" integer,
	"item1" integer,
	"item2" integer,
	"item3" integer,
	"item4" integer,
	"item5" integer,
	"item6" integer,
	"itemsPurchased" integer,
	"killingSprees" integer,
	"largestCriticalStrike" integer,
	"largestKillingSpree" integer,
	"largestMultiKill" integer,
	"longestTimeSpentLiving" integer,
	"magicDamageDealt" integer,
	"magicDamageDealtToChampions" integer,
	"magicDamageTaken" integer,
	"needVisionPings" integer,
	"neutralMinionsKilled" integer,
	"nexusKills" integer,
	"nexusLost" integer,
	"nexusTakedowns" integer,
	"objectivesStolen" integer,
	"objectivesStolenAssists" integer,
	"onMyWayPings" integer,
	"pentaKills" integer,
	"physicalDamageDealt" integer,
	"physicalDamageDealtToChampions" integer,
	"physicalDamageTaken" integer,
	"placement" integer,
	"playerAugment1" integer,
	"playerAugment2" integer,
	"playerAugment3" integer,
	"playerAugment4" integer,
	"playerAugment5" integer,
	"playerAugment6" integer,
	"playerSubteamId" integer,
	"profileIcon" integer,
	"pushPings" integer,
	"quadraKills" integer,
	"riotIdGameName" varchar(255),
	"riotIdTagline" varchar(255),
	"sightWardsBoughtInGame" integer,
	"spell1Casts" integer,
	"spell2Casts" integer,
	"spell3Casts" integer,
	"spell4Casts" integer,
	"subteamPlacement" integer,
	"summoner1Casts" integer,
	"summoner1Id" integer,
	"summoner2Casts" integer,
	"summoner2Id" integer,
	"teamEarlySurrendered" boolean,
	"teamPosition" varchar(255),
	"timeCCingOthers" integer,
	"totalAllyJungleMinionsKilled" integer,
	"totalDamageDealt" integer,
	"totalDamageDealtToChampions" integer,
	"totalDamageShieldedOnTeammates" integer,
	"totalDamageTaken" integer,
	"totalEnemyJungleMinionsKilled" integer,
	"totalHeal" integer,
	"totalHealsOnTeammates" integer,
	"totalMinionsKilled" integer,
	"totalTimeCCDealt" integer,
	"totalTimeSpentDead" integer,
	"totalUnitsHealed" integer,
	"tripleKills" integer,
	"trueDamageDealt" integer,
	"trueDamageDealtToChampions" integer,
	"trueDamageTaken" integer,
	"turretKills" integer,
	"turretTakedowns" integer,
	"turretsLost" integer,
	"unrealKills" integer,
	"visionClearedPings" integer,
	"visionScore" integer,
	"visionWardsBoughtInGame" integer,
	"wardsKilled" integer,
	"wardsPlaced" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "perkSelections" (
	"id" serial PRIMARY KEY NOT NULL,
	"perkStyleId" integer,
	"perk" integer,
	"var1" integer,
	"var2" integer,
	"var3" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "perkStyles" (
	"id" serial PRIMARY KEY NOT NULL,
	"perksId" integer,
	"description" varchar(255),
	"style" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "perks" (
	"id" serial PRIMARY KEY NOT NULL,
	"participantId" integer,
	"defense" integer,
	"flex" integer,
	"offense" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "team" (
	"id" serial PRIMARY KEY NOT NULL,
	"matchId" varchar(255),
	"teamId" integer,
	"win" boolean
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ban" ADD CONSTRAINT "ban_teamId_team_id_fk" FOREIGN KEY ("teamId") REFERENCES "public"."team"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "legendaryItemUsed" ADD CONSTRAINT "legendaryItemUsed_participantId_participant_id_fk" FOREIGN KEY ("participantId") REFERENCES "public"."participant"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "objective" ADD CONSTRAINT "objective_teamId_team_id_fk" FOREIGN KEY ("teamId") REFERENCES "public"."team"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "participant" ADD CONSTRAINT "participant_matchId_info_matchId_fk" FOREIGN KEY ("matchId") REFERENCES "public"."info"("matchId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "perkSelections" ADD CONSTRAINT "perkSelections_perkStyleId_perkStyles_id_fk" FOREIGN KEY ("perkStyleId") REFERENCES "public"."perkStyles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "perkStyles" ADD CONSTRAINT "perkStyles_perksId_perks_id_fk" FOREIGN KEY ("perksId") REFERENCES "public"."perks"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "perks" ADD CONSTRAINT "perks_participantId_participant_id_fk" FOREIGN KEY ("participantId") REFERENCES "public"."participant"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "team" ADD CONSTRAINT "team_matchId_info_matchId_fk" FOREIGN KEY ("matchId") REFERENCES "public"."info"("matchId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
