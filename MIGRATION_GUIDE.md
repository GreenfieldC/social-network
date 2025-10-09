# AWS PostgreSQL Migration Guide

## 🚀 Schritt-für-Schritt Anleitung

### 1. AWS RDS PostgreSQL Datenbank einrichten

Falls noch nicht geschehen, erstelle eine PostgreSQL-Instanz in AWS RDS:

```bash
# Via AWS CLI (optional)
aws rds create-db-instance \
  --db-instance-identifier social-network-db \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --master-username admin \
  --master-user-password YourSecurePassword123! \
  --allocated-storage 20 \
  --vpc-security-group-ids sg-xxxxxxxxx \
  --db-subnet-group-name your-subnet-group
```

### 2. .env Datei konfigurieren

Bearbeite die `.env` Datei und trage deine AWS RDS Verbindungsdaten ein:

```env
DATABASE_URL="postgresql://dein_username:dein_password@dein-rds-endpoint.region.rds.amazonaws.com:5432/social_network_db"
```

**Wichtig:** 
- Ersetze `dein_username`, `dein_password`, `dein-rds-endpoint.region.rds.amazonaws.com` mit deinen echten Werten
- Stelle sicher, dass die Datenbank `social_network_db` existiert

### 3. Dependencies installieren

```bash
npm install
```

### 4. Prisma Client generieren

```bash
npx prisma generate --schema=apps/users/prisma/schema.prisma
npx prisma generate --schema=apps/posts/prisma/schema.prisma
npx prisma generate --schema=apps/feed/prisma/schema.prisma
```

### 5. Datenbank-Schema erstellen

```bash
# Für jedes Service die Migration ausführen
npx prisma db push --schema=apps/users/prisma/schema.prisma
npx prisma db push --schema=apps/posts/prisma/schema.prisma
npx prisma db push --schema=apps/feed/prisma/schema.prisma
```

### 6. Lokale Entwicklung starten

#### Option A: Mit AWS RDS (Produktion)
```bash
npm run dev-backend
```

#### Option B: Mit lokalem PostgreSQL
```bash
# 1. Lokale PostgreSQL mit Docker starten
docker compose up postgres -d

# 2. .env für lokale Entwicklung anpassen
DATABASE_URL="postgresql://postgres:password@localhost:5432/social_network_local"

# 3. Schema in lokale DB pushen
npx prisma db push --schema=apps/users/prisma/schema.prisma
npx prisma db push --schema=apps/posts/prisma/schema.prisma
npx prisma db push --schema=apps/feed/prisma/schema.prisma

# 4. Services starten
npm run dev-backend
```

### 7. Deployment

#### Mit AWS RDS:
```bash
# Produktions-Docker Container
docker compose -f docker-compose.prod.yml up --build
```

### 8. Nützliche Befehle

```bash
# Datenbank zurücksetzen
npm run db:reset

# Neue Migration erstellen
npx prisma migrate dev --schema=apps/users/prisma/schema.prisma --name init

# Prisma Studio öffnen (Datenbank GUI)
npx prisma studio --schema=apps/users/prisma/schema.prisma
```

## 🔧 Troubleshooting

### Verbindungsfehler
- Überprüfe Security Groups in AWS (Port 5432 muss offen sein)
- Prüfe die Subnet-Konfiguration
- Stelle sicher, dass die RDS-Instanz öffentlich erreichbar ist (falls nötig)

### Schema-Konflikte
Falls du unterschiedliche Schemas zwischen den Services hast:
```bash
# Zuerst alle alten Migrations löschen
rm -rf apps/*/prisma/migrations/

# Neue Baseline-Migration erstellen
npx prisma migrate dev --schema=apps/users/prisma/schema.prisma --name baseline
```

### Performance
Für bessere Performance in der Produktion:
- Verwende Connection Pooling (z.B. PgBouncer)
- Konfiguriere Prisma Connection Pool in der DATABASE_URL:
  ```
  DATABASE_URL="postgresql://user:pass@host:5432/db?connection_limit=10&pool_timeout=20"
  ```

## 📊 Monitoring

Für Produktionsumgebungen empfiehlt sich:
- AWS RDS Performance Insights aktivieren
- CloudWatch Logs für die Container
- Health Checks für die Services implementieren