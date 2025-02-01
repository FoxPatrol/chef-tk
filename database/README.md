# Database

## Tech Stack

- [PostgreSQL](https://www.postgresql.org/)

## Building

Make sure to have [Docker](https://www.docker.com/get-started/) installed before proceeding.

Build docker image by running:

`docker build -t cook-book .`

Build docker container by running:

`docker-compose -f docker-compose.yml -p chef-tk up -d`

## Data interaction

Connect to the database locally hosted using a database inspection software of your choice. Check the Dockerfile for the port and credentials.
