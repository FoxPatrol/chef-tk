import { sql, SQL } from "drizzle-orm";
import {
  pgTable,
  varchar,
  integer,
  boolean,
  serial,
  bigint,
  json,
  text,
  AnyPgColumn,
} from "drizzle-orm/pg-core";

export const accountsTable = pgTable("accounts", {
  puuid: text().primaryKey(),
  gameName: text().notNull(),
  tagLine: text().notNull(),
});

export const matchesTable = pgTable("matches", {
  matchId: varchar({ length: 255 }).primaryKey(),
  endOfGameResult: varchar({ length: 255 }), // "GameComplete"
  gameCreation: bigint({ mode: "number" }),
  gameDuration: integer(),
  gameEndTimestamp: bigint({ mode: "number" }),
  gameId: bigint({ mode: "number" }),
  gameMode: varchar({ length: 255 }), // "CLASSIC", "ARAM", ...
  gameName: varchar({ length: 255 }),
  gameStartTimestamp: bigint({ mode: "number" }),
  gameType: varchar({ length: 255 }), // "MATCHED_GAME", ...
  gameVersion: varchar({ length: 255 }),
  mapId: integer(),
  platformId: varchar({ length: 255 }),
  queueId: integer(),
  tournamentCode: varchar({ length: 255 }),
});

export const participantsTable = pgTable("participants", {
  id: serial("id").primaryKey(),
  matchId: varchar({ length: 255 }).references(() => matchesTable.matchId, {
    onDelete: "cascade",
  }),
  participantId: integer(),
  puuid: varchar({ length: 255 }).references(() => accountsTable.puuid, {
    onDelete: "no action",
  }),
  summonerId: varchar({ length: 255 }),
  summonerName: varchar({ length: 255 }),
  teamId: integer(),
  championId: integer(),
  championName: varchar({ length: 255 }), // name of champion
  lane: varchar({ length: 255 }), // one of "TOP", "MIDDLE", "JUNGLE", "BOTTOM", "UTILITY", where the player spent the most time during laning phase
  role: varchar({ length: 255 }), // one of "SOLO" (if laned solo), "DUO" (if laned with another), "NONE" (if jungle), "CARRY" (if farmed bottom lane), "SUPPORT" (if did not farm)
  individualPosition: varchar({ length: 255 }), // one of "TOP", "MIDDLE", "JUNGLE", "BOTTOM", "UTILITY"
  win: boolean(),
  kills: integer(),
  deaths: integer(),
  assists: integer(),
  allInPings: integer(),
  assistMePings: integer(),
  baronKills: integer(),
  basicPings: integer(),
  bountyLevel: integer(),
  champExperience: integer(),
  champLevel: integer(),
  championTransform: integer(),
  commandPings: integer(),
  consumablesPurchased: integer(),
  damageDealtToBuildings: integer(),
  damageDealtToObjectives: integer(),
  damageDealtToTurrets: integer(),
  damageSelfMitigated: integer(),
  dangerPings: integer(),
  detectorWardsPlaced: integer(),
  doubleKills: integer(),
  dragonKills: integer(),
  eligibleForProgression: boolean(),
  enemyMissingPings: integer(),
  enemyVisionPings: integer(),
  firstBloodAssist: boolean(),
  firstBloodKill: boolean(),
  firstTowerAssist: boolean(),
  firstTowerKill: boolean(),
  gameEndedInEarlySurrender: boolean(), // surrender before 15 minutes
  gameEndedInSurrender: boolean(),
  getBackPings: integer(),
  goldEarned: integer(),
  goldSpent: integer(),
  holdPings: integer(),
  inhibitorKills: integer(),
  inhibitorTakedowns: integer(),
  inhibitorsLost: integer(),
  item0: integer().references(() => itemsTable.id),
  item1: integer().references(() => itemsTable.id),
  item2: integer().references(() => itemsTable.id),
  item3: integer().references(() => itemsTable.id),
  item4: integer().references(() => itemsTable.id),
  item5: integer().references(() => itemsTable.id),
  item6: integer().references(() => itemsTable.id),
  itemsPurchased: integer(),
  killingSprees: integer(),
  largestCriticalStrike: integer(),
  largestKillingSpree: integer(),
  largestMultiKill: integer(),
  longestTimeSpentLiving: integer(),
  magicDamageDealt: integer(),
  magicDamageDealtToChampions: integer(),
  magicDamageTaken: integer(),
  needVisionPings: integer(),
  neutralMinionsKilled: integer(),
  nexusKills: integer(),
  nexusLost: integer(),
  nexusTakedowns: integer(),
  objectivesStolen: integer(),
  objectivesStolenAssists: integer(),
  onMyWayPings: integer(),
  pentaKills: integer(),
  physicalDamageDealt: integer(),
  physicalDamageDealtToChampions: integer(),
  physicalDamageTaken: integer(),
  placement: integer(),
  playerAugment1: integer(),
  playerAugment2: integer(),
  playerAugment3: integer(),
  playerAugment4: integer(),
  playerAugment5: integer(),
  playerAugment6: integer(),
  playerSubteamId: integer(),
  profileIcon: integer(),
  pushPings: integer(),
  quadraKills: integer(),
  riotIdGameName: varchar({ length: 255 }),
  riotIdTagline: varchar({ length: 255 }),
  sightWardsBoughtInGame: integer(),
  spell1Casts: integer(),
  spell2Casts: integer(),
  spell3Casts: integer(),
  spell4Casts: integer(),
  subteamPlacement: integer(),
  summoner1Casts: integer(),
  summoner1Id: integer(),
  summoner2Casts: integer(),
  summoner2Id: integer(),
  teamEarlySurrendered: boolean(),
  teamPosition: varchar({ length: 255 }), // one of "TOP", "JUNGLE", "MIDDLE", "BOTTOM", "UTILITY"
  timeCCingOthers: integer(),
  totalAllyJungleMinionsKilled: integer(),
  totalDamageDealt: integer(),
  totalDamageDealtToChampions: integer(),
  totalDamageShieldedOnTeammates: integer(),
  totalDamageTaken: integer(),
  totalEnemyJungleMinionsKilled: integer(),
  totalHeal: integer(),
  totalHealsOnTeammates: integer(),
  totalMinionsKilled: integer(),
  totalTimeCCDealt: integer(),
  totalTimeSpentDead: integer(),
  totalUnitsHealed: integer(),
  tripleKills: integer(),
  trueDamageDealt: integer(),
  trueDamageDealtToChampions: integer(),
  trueDamageTaken: integer(),
  turretKills: integer(),
  turretTakedowns: integer(),
  turretsLost: integer(),
  unrealKills: integer(),
  visionClearedPings: integer(),
  visionScore: integer(),
  visionWardsBoughtInGame: integer(),
  wardsKilled: integer(),
  wardsPlaced: integer(),
});

export const perksTable = pgTable("perks", {
  id: serial("id").primaryKey(),
  participantId: integer().references(() => participantsTable.id, {
    onDelete: "cascade",
  }),
  defense: integer(),
  flex: integer(),
  offense: integer(),
});

export const perkStylesTable = pgTable("perkStyles", {
  id: serial("id").primaryKey(),
  perksId: integer().references(() => perksTable.id, { onDelete: "cascade" }),
  description: varchar({ length: 255 }), // one of "primaryStyle", "subStyle"
  style: integer(),
});

export const perkSelectionsTable = pgTable("perkSelections", {
  id: serial("id").primaryKey(),
  perkStyleId: integer().references(() => perkStylesTable.id, {
    onDelete: "cascade",
  }),
  perk: integer().references(() => perkNamesTable.id),
  var1: integer(),
  var2: integer(),
  var3: integer(),
});

export const perkNamesTable = pgTable("perkNames", {
  id: integer().primaryKey(), // Unique ID for the perk
  name: varchar({ length: 255 }), // Name of the perk
  majorChangePatchVersion: varchar({ length: 10 }), // Patch version for major changes
  endOfGameStatDescs: json(), // Array that describes var1 var2 var3 of perkSelections
});

export const teamTable = pgTable("team", {
  id: serial("id").primaryKey(),
  matchId: varchar({ length: 255 }).references(() => matchesTable.matchId, {
    onDelete: "cascade",
  }),
  teamId: integer(),
  win: boolean(),
});

export const banTable = pgTable("ban", {
  id: serial("id").primaryKey(),
  teamId: integer().references(() => teamTable.id, { onDelete: "cascade" }),
  championId: integer(),
  pickTurn: integer(),
});

export const objectiveTable = pgTable("objective", {
  id: serial("id").primaryKey(),
  teamId: integer().references(() => teamTable.id, { onDelete: "cascade" }),
  baronFirst: boolean(),
  baronKills: integer(),
  championFirst: boolean(),
  championKills: integer(),
  dragonFirst: boolean(),
  dragonKills: integer(),
  hordeFirst: boolean(),
  hordeKills: integer(),
  inhibitorFirst: boolean(),
  inhibitorKills: integer(),
  riftHeraldFirst: boolean(),
  riftHeraldKills: integer(),
  towerFirst: boolean(),
  towerKills: integer(),
});

export const itemsTable = pgTable("items", {
  id: integer().primaryKey(),
  name: varchar({ length: 255 }),
  active: boolean(), // Whether the item has an active
  inStore: boolean(), // Whether the item is available in the store
  from: json(), // JSON ARRAY of item IDs that are required to buy item, USE json_array_elements_text("from")::integer. If you use ANY(), use ARRAY() as well
  to: json(), // JSON ARRAY of item IDs that this item builds into, USE json_array_elements_text("to")::integer. If you use ANY(), use ARRAY() as well
  categories: json(), // JSON ARRAY of categories this item belongs to
  maxStacks: integer(), // Maximum number of stacks
  requiredChampion: varchar({ length: 255 }), // Required champion to use the item
  requiredAlly: varchar({ length: 255 }), // Required ally for the item
  requiredBuffCurrencyName: varchar({ length: 255 }), // Required buff currency name
  requiredBuffCurrencyCost: integer(), // Cost of the required buff currency
  specialRecipe: integer(), // Special recipe ID, if any
  isEnchantment: boolean(), // Whether the item is an enchantment
  price: integer(), // DO NOT USE
  priceTotal: integer(), // Price of the item, use if asked about price scenerarios
  displayInItemSets: boolean(),
});

export function lower(email: AnyPgColumn): SQL {
  return sql`lower(${email})`;
}
