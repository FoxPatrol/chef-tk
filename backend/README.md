# Data Setup

`drizzle` is used to as the ORM between node and postgresql.

`npx drizzle-kit generate`

`npx drizzle-kit migrate`

# Development

`npm i`

`npm run insert-json-data`

`npm run dev`

# Fill Database

Call the endpoint `http://localhost:3000/api/:region/matches/by-riot-id/:name/:tag?forceRefresh=true`