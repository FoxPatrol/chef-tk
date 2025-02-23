import type { Config } from "jest";

const config: Config = {
  verbose: true,
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@db/(.*)$": "<rootDir>/src/db/$1",
    "^@routes/(.*)$": "<rootDir>/src/routes/$1",
    "^@controllers/(.*)$": "<rootDir>/src/controllers/$1",
    "^@models/(.*)$": "<rootDir>/src/models/$1",
  },
};

export default config;
