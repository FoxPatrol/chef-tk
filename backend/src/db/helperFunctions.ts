import path from "path";
import db from "./index";
import * as schema from "./schema";
import fs from "fs";
import { MatchV5DTOs } from "twisted/dist/models-dto";

export function getSchemaContents() {
  try {
    const filePath = path.join(__dirname, "schema.ts");
    const data = fs.readFileSync(filePath, "utf8"); // 'utf8' to read as string
    return data;
  } catch (error) {
    console.error("Error reading file:", error);
    return "";
  }
}

export async function insertGameDataInDb(matchData: any) {
  //MatchV5DTOs.MatchDto) {
  try {
    await db.transaction(async (tx) => {
      const matchInfo = matchData.info;

      // Insert into infoTable
      const infoResult = await tx
        .insert(schema.matchesTable)
        .values({
          matchId: matchData.metadata.matchId,
          endOfGameResult: matchInfo.endOfGameResult,
          gameCreation: matchInfo.gameCreation,
          gameDuration: matchInfo.gameDuration,
          gameEndTimestamp: matchInfo.gameEndTimestamp,
          gameId: matchInfo.gameId,
          gameMode: matchInfo.gameMode,
          gameName: matchInfo.gameName,
          gameStartTimestamp: matchInfo.gameStartTimestamp,
          gameType: matchInfo.gameType,
          gameVersion: matchInfo.gameVersion,
          mapId: matchInfo.mapId,
          platformId: matchInfo.platformId,
          queueId: matchInfo.queueId,
          tournamentCode: matchInfo.tournamentCode,
        })
        .onConflictDoNothing()
        .returning({ insertedId: schema.matchesTable.matchId });

      const matchId = infoResult[0].insertedId;

      // Insert into participantTable, perksTable, perkStylesTable, perkSelectionsTable, legendaryItemUsedTable
      for (const participant of matchInfo.participants) {
        await tx
          .insert(schema.accountsTable)
          .values({
            gameName: participant.riotIdGameName,
            tagLine: participant.riotIdTagline,
            puuid: participant.puuid,
          })
          .onConflictDoUpdate({
            target: schema.accountsTable.puuid,
            set: {
              gameName: participant.riotIdGameName,
              tagLine: participant.riotIdTagline,
              puuid: participant.puuid,
            },
          });

        const participantResult = await tx
          .insert(schema.participantsTable)
          .values({
            matchId,
            participantId: participant.participantId,
            puuid: participant.puuid,
            summonerId: participant.summonerId,
            summonerName: participant.summonerName,
            teamId: participant.teamId,
            championId: participant.championId,
            championName: participant.championName,
            lane: participant.lane,
            role: participant.role,
            individualPosition: participant.individualPosition,
            win: participant.win,
            kills: participant.kills,
            deaths: participant.deaths,
            assists: participant.assists,
            allInPings: participant.allInPings,
            assistMePings: participant.assistMePings,
            baronKills: participant.baronKills,
            basicPings: participant.basicPings,
            bountyLevel: participant.bountyLevel,
            champExperience: participant.champExperience,
            champLevel: participant.champLevel,
            championTransform: participant.championTransform,
            commandPings: participant.commandPings,
            consumablesPurchased: participant.consumablesPurchased,
            damageDealtToBuildings: participant.damageDealtToBuildings,
            damageDealtToObjectives: participant.damageDealtToObjectives,
            damageDealtToTurrets: participant.damageDealtToTurrets,
            damageSelfMitigated: participant.damageSelfMitigated,
            dangerPings: participant.dangerPings,
            detectorWardsPlaced: participant.detectorWardsPlaced,
            doubleKills: participant.doubleKills,
            dragonKills: participant.dragonKills,
            eligibleForProgression: participant.eligibleForProgression,
            enemyMissingPings: participant.enemyMissingPings,
            enemyVisionPings: participant.enemyVisionPings,
            firstBloodAssist: participant.firstBloodAssist,
            firstBloodKill: participant.firstBloodKill,
            firstTowerAssist: participant.firstTowerAssist,
            firstTowerKill: participant.firstTowerKill,
            gameEndedInEarlySurrender: participant.gameEndedInEarlySurrender,
            gameEndedInSurrender: participant.gameEndedInSurrender,
            getBackPings: participant.getBackPings,
            goldEarned: participant.goldEarned,
            goldSpent: participant.goldSpent,
            holdPings: participant.holdPings,
            inhibitorKills: participant.inhibitorKills,
            inhibitorTakedowns: participant.inhibitorTakedowns,
            inhibitorsLost: participant.inhibitorsLost,
            item0: participant.item0 === 0 ? null : participant.item0,
            item1: participant.item1 === 0 ? null : participant.item1,
            item2: participant.item2 === 0 ? null : participant.item2,
            item3: participant.item3 === 0 ? null : participant.item3,
            item4: participant.item4 === 0 ? null : participant.item4,
            item5: participant.item5 === 0 ? null : participant.item5,
            item6: participant.item6 === 0 ? null : participant.item6,
            itemsPurchased: participant.itemsPurchased,
            killingSprees: participant.killingSprees,
            largestCriticalStrike: participant.largestCriticalStrike,
            largestKillingSpree: participant.largestKillingSpree,
            largestMultiKill: participant.largestMultiKill,
            longestTimeSpentLiving: participant.longestTimeSpentLiving,
            magicDamageDealt: participant.magicDamageDealt,
            magicDamageDealtToChampions:
              participant.magicDamageDealtToChampions,
            magicDamageTaken: participant.magicDamageTaken,
            needVisionPings: participant.needVisionPings,
            neutralMinionsKilled: participant.neutralMinionsKilled,
            nexusKills: participant.nexusKills,
            nexusLost: participant.nexusLost,
            nexusTakedowns: participant.nexusTakedowns,
            objectivesStolen: participant.objectivesStolen,
            objectivesStolenAssists: participant.objectivesStolenAssists,
            onMyWayPings: participant.onMyWayPings,
            pentaKills: participant.pentaKills,
            physicalDamageDealt: participant.physicalDamageDealt,
            physicalDamageDealtToChampions:
              participant.physicalDamageDealtToChampions,
            physicalDamageTaken: participant.physicalDamageTaken,
            placement: participant.placement,
            playerAugment1: participant.playerAugment1,
            playerAugment2: participant.playerAugment2,
            playerAugment3: participant.playerAugment3,
            playerAugment4: participant.playerAugment4,
            playerAugment5: participant.playerAugment5,
            playerAugment6: participant.playerAugment6,
            playerSubteamId: participant.playerSubteamId,
            profileIcon: participant.profileIcon,
            pushPings: participant.pushPings,
            quadraKills: participant.quadraKills,
            riotIdGameName: participant.riotIdGameName,
            riotIdTagline: participant.riotIdTagline,
            sightWardsBoughtInGame: participant.sightWardsBoughtInGame,
            spell1Casts: participant.spell1Casts,
            spell2Casts: participant.spell2Casts,
            spell3Casts: participant.spell3Casts,
            spell4Casts: participant.spell4Casts,
            subteamPlacement: participant.subteamPlacement,
            summoner1Casts: participant.summoner1Casts,
            summoner1Id: participant.summoner1Id,
            summoner2Casts: participant.summoner2Casts,
            summoner2Id: participant.summoner2Id,
            teamEarlySurrendered: participant.teamEarlySurrendered,
            teamPosition: participant.teamPosition,
            timeCCingOthers: participant.timeCCingOthers,
            totalAllyJungleMinionsKilled:
              participant.totalAllyJungleMinionsKilled,
            totalDamageDealt: participant.totalDamageDealt,
            totalDamageDealtToChampions:
              participant.totalDamageDealtToChampions,
            totalDamageShieldedOnTeammates:
              participant.totalDamageShieldedOnTeammates,
            totalDamageTaken: participant.totalDamageTaken,
            totalEnemyJungleMinionsKilled:
              participant.totalEnemyJungleMinionsKilled,
            totalHeal: participant.totalHeal,
            totalHealsOnTeammates: participant.totalHealsOnTeammates,
            totalMinionsKilled: participant.totalMinionsKilled,
            totalTimeCCDealt: participant.totalTimeCCDealt,
            totalTimeSpentDead: participant.totalTimeSpentDead,
            totalUnitsHealed: participant.totalUnitsHealed,
            tripleKills: participant.tripleKills,
            trueDamageDealt: participant.trueDamageDealt,
            trueDamageDealtToChampions: participant.trueDamageDealtToChampions,
            trueDamageTaken: participant.trueDamageTaken,
            turretKills: participant.turretKills,
            turretTakedowns: participant.turretTakedowns,
            turretsLost: participant.turretsLost,
            unrealKills: participant.unrealKills,
            visionClearedPings: participant.visionClearedPings,
            visionScore: participant.visionScore,
            visionWardsBoughtInGame: participant.visionWardsBoughtInGame,
            wardsKilled: participant.wardsKilled,
            wardsPlaced: participant.wardsPlaced,
          })
          .onConflictDoNothing()
          .returning({ insertedId: schema.participantsTable.id });

        const participantId = participantResult[0].insertedId;

        const perksResult = await tx
          .insert(schema.perksTable)
          .values({
            participantId,
            defense: participant.perks.statPerks.defense,
            flex: participant.perks.statPerks.flex,
            offense: participant.perks.statPerks.offense,
          })
          .onConflictDoNothing()
          .returning({ insertedId: schema.perksTable.id });

        const perksId = perksResult[0].insertedId;

        for (const style of participant.perks.styles) {
          const perkStyleResult = await tx
            .insert(schema.perkStylesTable)
            .values({
              perksId,
              description: style.description,
              style: style.style,
            })
            .onConflictDoNothing()
            .returning({ insertedId: schema.perkStylesTable.id });

          const perkStyleId = perkStyleResult[0].insertedId;

          for (const selection of style.selections) {
            await tx
              .insert(schema.perkSelectionsTable)
              .values({
                perkStyleId,
                perk: selection.perk,
                var1: selection.var1,
                var2: selection.var2,
                var3: selection.var3,
              })
              .onConflictDoNothing();
          }
        }
      }

      // Insert into teamTable, banTable, objectiveTable
      for (const team of matchInfo.teams) {
        const teamResult = await tx
          .insert(schema.teamTable)
          .values({
            matchId,
            teamId: team.teamId,
            win: team.win,
          })
          .onConflictDoNothing()
          .returning({ insertedId: schema.teamTable.id });

        const teamId = teamResult[0].insertedId;

        for (const ban of team.bans) {
          await tx
            .insert(schema.banTable)
            .values({
              teamId,
              championId: ban.championId,
              pickTurn: ban.pickTurn,
            })
            .onConflictDoNothing();
        }

        await tx
          .insert(schema.objectiveTable)
          .values({
            teamId,
            baronFirst: team.objectives.baron.first,
            baronKills: team.objectives.baron.kills,
            championFirst: team.objectives.champion.first,
            championKills: team.objectives.champion.kills,
            dragonFirst: team.objectives.dragon.first,
            dragonKills: team.objectives.dragon.kills,
            hordeFirst: team.objectives.horde.first,
            hordeKills: team.objectives.horde.kills,
            inhibitorFirst: team.objectives.inhibitor.first,
            inhibitorKills: team.objectives.inhibitor.kills,
            riftHeraldFirst: team.objectives.riftHerald.first,
            riftHeraldKills: team.objectives.riftHerald.kills,
            towerFirst: team.objectives.tower.first,
            towerKills: team.objectives.tower.kills,
          })
          .onConflictDoNothing();
      }
    });

    console.log("Game data loaded successfully!");
  } catch (error) {
    console.error("Error loading game data:", error);
  }
}

export async function readItemsJson() {
  try {
    const filePath = path.join(__dirname, "data/items.json");
    const data = fs.readFileSync(filePath, "utf8");
    const items = JSON.parse(data);

    // Insert items into the database
    await db.transaction(async (tx) => {
      for (const item of items) {
        await tx
          .insert(schema.itemsTable)
          .values(item)
          .onConflictDoUpdate({ target: schema.itemsTable.id, set: item });
      }
    });
    console.log("Items inserted successfully");
  } catch (error) {
    console.error("Error inserting items:", error);
  }
}

export async function readPerksJson() {
  try {
    const filePath = path.join(__dirname, "data/perks.json");
    const data = fs.readFileSync(filePath, "utf8");
    const perks = JSON.parse(data);

    // Insert items into the database
    await db.transaction(async (tx) => {
      for (const perk of perks) {
        await tx
          .insert(schema.perkNamesTable)
          .values(perk)
          .onConflictDoUpdate({ target: schema.perkNamesTable.id, set: perk });
      }
    });
    console.log("Perks inserted successfully");
  } catch (error) {
    console.error("Error inserting perks:", error);
  }
}
