# Data Setup

Deploy database container by going to `database` directory and running:

```bash
docker compose up -d
```

Then come back to the `backend` directory.

Initialize the database with:

```bash
npx drizzle-kit migrate
```

Gather the data with:

```bash
npm run download-dd-assets  # download data
npm run insert-json-data    # insert data into db
```

Then to fill database with match data, serve the server with:

```bash
npm run dev
```

Call the endpoint `http://localhost:3000/api/:region/matches/by-riot-id/:name/:tag?forceRefresh=true`

# ORM tool

`drizzle` is used to as the ORM between node and postgresql.

`npx drizzle-kit generate`

`npx drizzle-kit migrate`

# TODO

- [x] Answer a simple question by querying the database and returning the data
- [ ] Get context of needs before asking for sql query
- [ ] Add post data retrieval analysis (eg. will go over the data fetched to draw conclusions)
- [ ] Clean up models (remove useless columns and add comments to useful ones)
