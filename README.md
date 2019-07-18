# Bus Stop App

## Prerequisites 
- Docker

## Set Up

1. Start using docker compose 
```
docker-compose up
```

2. In other tab, run database migrations and seeds.

```
docker-compose exec backend npm run migrate:latest && docker-compose exec backend npm run seed:run
```

Backend should be accessible on http://localhost:3000

Frontend should be accessible on http://localhost:8080

