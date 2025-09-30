# Build stage
FROM node:lts-alpine AS builder
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY nx.json ./
COPY tsconfig.base.json ./

# Install all dependencies (including dev dependencies for building)
RUN npm ci

# Copy source code
COPY apps/feed/ ./apps/feed/

# Build the application
RUN npx nx build feed --prod

# Production stage
FROM node:lts-alpine AS production
WORKDIR /app

# Copy built application
COPY --from=builder /app/dist/apps/feed .
COPY apps/feed/prisma ./prisma/

# Install only production dependencies
RUN npm install --production

# Generate Prisma client
RUN npx prisma generate

ENV PORT=3335
EXPOSE ${PORT}

CMD node ./main.js
