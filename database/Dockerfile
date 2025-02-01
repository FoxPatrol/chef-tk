# Use an official PostgreSQL image as the base image
FROM postgres:16.2-alpine

# Set environment variables
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres
ENV POSTGRES_DB=postgres

# Optionally, you can customize the PostgreSQL data directory location (default is /var/lib/postgresql/data)
# ENV PGDATA=/var/lib/postgresql/data

# Optionally, if you want to run initialization scripts or configurations, you can copy them into the container
# COPY init.sql /docker-entrypoint-initdb.d/

# Expose the PostgreSQL port
EXPOSE 5432

# By default, the postgres image runs the PostgreSQL server command in the foreground
# If you want to run custom commands when starting the container, you can override the default CMD
# CMD ["postgres"]
