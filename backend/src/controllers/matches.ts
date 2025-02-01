import { insertGameDataInDb } from "@db/helperFunctions";
import db from "@db/index";
import {
  accountsTable,
  lower,
  matchesTable,
  participantsTable,
  perkNamesTable,
  perkSelectionsTable,
  perksTable,
  perkStylesTable,
} from "@db/schema";
import env from "@utils/config";
import { eq, and, desc } from "drizzle-orm";
import { Request, Response } from "express";
import { LolApi, RiotApi } from "twisted";
import { RegionGroups } from "twisted/dist/constants";
import { AccountDto } from "twisted/dist/models-dto/account/account.dto";

const riotApi = new RiotApi({ key: env.RIOT_API_KEY });
const lolApi = new LolApi({ key: env.RIOT_API_KEY });

interface GetMatchesByRiotIdParams {
  name: string;
  tag: string;
  region: RegionGroups;
}

interface GetMatchesByRiotIdQuery {
  forceRefresh?: boolean;
}

const validRegions = Object.values(RegionGroups);

class MatchesController {
  getMatchesByRiotId = async (
    req: Request<GetMatchesByRiotIdParams, any, any, GetMatchesByRiotIdQuery>,
    res: Response
  ): Promise<any> => {
    try {
      const { name, tag } = req.params;
      let { region } = req.params;
      //@ts-ignore
      region = region.toUpperCase();
      const { forceRefresh } = req.query;

      if (
        !name ||
        typeof name !== "string" ||
        name.length < 1 ||
        name.length > 30
      ) {
        return res.status(400).send({ error: "Invalid name provided" });
      }
      if (!tag || typeof tag !== "string" || tag.length < 1 || tag.length > 5) {
        return res.status(400).send({ error: "Invalid tag provided" });
      }
      if (!validRegions.includes(region)) {
        return res.status(400).send({ error: "Invalid region provided" });
      }
      if (
        forceRefresh !== undefined &&
        typeof forceRefresh !== "boolean" &&
        forceRefresh !== "true" &&
        forceRefresh !== "false"
      ) {
        return res
          .status(400)
          .send({ error: "Invalid forceRefresh value. Must be a boolean." });
      }

      const existingAccount = await db
        .select()
        .from(accountsTable)
        .where(
          and(
            eq(lower(accountsTable.tagLine), tag.toLowerCase()),
            eq(lower(accountsTable.gameName), name.toLowerCase())
          )
        )
        .execute();

      let acc: AccountDto;
      if (existingAccount.length < 1) {
        // account not in db
        acc = (
          await riotApi.Account.getByRiotId(name, tag, region as RegionGroups)
        ).response;
        console.log(`Got acc from api: ${acc.gameName}#${acc.tagLine}`);

        if (!acc) {
          console.error(`Account not found: ${name}#${tag}`);
          return res.status(404).send({ error: "Account not found." });
        }

        await db.insert(accountsTable).values(acc);
      } else {
        acc = existingAccount[0];
      }

      if (forceRefresh) {
        const newMatchIdList = (await lolApi.MatchV5.list(acc.puuid, region))
          .response;
        console.log(`Got match list from api: ${newMatchIdList.join(", ")}`);

        for (const newMatchId of newMatchIdList) {
          const existingMatch = await db
            .select()
            .from(matchesTable)
            .where(eq(matchesTable.matchId, newMatchId))
            .execute();

          if (existingMatch.length > 0) {
            // already exists in db, no need to request
            continue;
          }

          const matchData = (await lolApi.MatchV5.get(newMatchId, region))
            .response;
          console.log(`Got match data from api for match: ${newMatchId}`);

          await insertGameDataInDb(matchData);
        }
      }

      const matches = await db
        .select({
          matchId: matchesTable.matchId,
          gameStartTimestamp: matchesTable.gameStartTimestamp,
          gameEndTimestamp: matchesTable.gameEndTimestamp,
          gameDuration: matchesTable.gameDuration,
          gameType: matchesTable.gameType,
          queueId: matchesTable.queueId,
        })
        .from(matchesTable)
        .orderBy(desc(matchesTable.gameCreation))
        .limit(20)
        .execute();

      for (const match of matches) {
        const participants = await db
          .select({
            participantId: participantsTable.participantId,
            summonerName: participantsTable.summonerName,
            teamId: participantsTable.teamId,
            championName: participantsTable.championName,
            championId: participantsTable.championId,
            lane: participantsTable.lane,
            individualPosition: participantsTable.individualPosition,
            win: participantsTable.win,
            kills: participantsTable.kills,
            deaths: participantsTable.deaths,
            assists: participantsTable.assists,
            champLevel: participantsTable.champLevel,
          })
          .from(participantsTable)
          .where(eq(participantsTable.matchId, match.matchId))
          .execute();

        //@ts-ignore
        match.participants = participants;
      }

      return res.status(200).send(matches);
    } catch (error) {
      console.error("Error:", error);
      return res
        .status(500)
        .send({ error: "An error occurred while generating the response" });
    }
  };
}

export default MatchesController;
