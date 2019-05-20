# Bus Stop App Backend

## Setup

Pull the repository locally.

### Node.js

Install Docker and Node.js. Match Node.js version from Dockerfile.

### Installing Dependencies

Run the following commands from the root directory of the repository.

```
npm install
```

### Starting the application for dev

```
docker-compose up
```


## Database

### Migrations

Up

```
docker-compose exec web npm run migrate:latest
```

Down

```
docker-compose exec web npm run migrate:rollback
```

Seed

```
docker-compose exec web npm run seed:run
```

Create Migration

```
docker-compose exec web npm run make:migration create_rides_table
```

