# Docker Compose Commands for Social Network

## Prerequisites
Before running the services, make sure to build the applications:
```bash
nx build users
nx build posts
nx build feed
nx build ui
```

## Available Commands

### Start all services
```bash
docker-compose up
```

### Start services in background
```bash
docker-compose up -d
```

### Start specific service
```bash
docker-compose up users
docker-compose up posts
docker-compose up feed
docker-compose up ui
```

### Stop all services
```bash
docker-compose down
```

### View logs
```bash
# All services
docker-compose logs

# Specific service
docker-compose logs users
docker-compose logs posts
docker-compose logs feed
docker-compose logs ui
```

### Rebuild and restart services
```bash
docker-compose up --build
```

### Remove containers and volumes
```bash
docker-compose down -v
```

## Service URLs
- Users API: http://localhost:3333
- Posts API: http://localhost:3334
- Feed API: http://localhost:3335
- UI (Frontend): http://localhost:80

## Network
All services are connected via the `social-network` bridge network, allowing them to communicate with each other using service names as hostnames.
