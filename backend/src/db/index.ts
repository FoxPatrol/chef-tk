import env from "@utils/config";
import { drizzle } from "drizzle-orm/node-postgres";

const db = drizzle(env.DATABASE_URL!);

export default db;
