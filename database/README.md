# Database

## Tech Stack

- [PostgreSQL](https://www.postgresql.org/)

## Building

Make sure to have [Docker](https://www.docker.com/get-started/) installed before proceeding.

Build docker container by running:

```bash
docker compose up -d
```

## Data interaction

Connect to the database locally hosted using a database inspection software of your choice. Check the Dockerfile for the port and credentials.

or

```bash
docker compose exec -it cook-book psql
```

## Reset data

Stop container

`docker compose down`

List and drop volumes

```bash
docker volume ls
docker volume rm database_pg_data
```

Restart container

```bash
docker compose up -d
```
