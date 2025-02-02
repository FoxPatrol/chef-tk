# Database

# Setup

`docker compose up -d`

`docker compose exec ollama ollama pull all-minilm`
`docker compose exec ollama ollama pull tinyllama`

# Run commands on postgres

`docker compose exec -it db psql`