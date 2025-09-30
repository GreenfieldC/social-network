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
COPY apps/posts/ ./apps/posts/

# Build the application
RUN npx nx build posts --prod

# Production stage
FROM node:lts-alpine AS production
WORKDIR /app

# Copy built application
COPY --from=builder /app/dist/apps/posts .
COPY apps/posts/prisma ./prisma/

# Install only production dependencies
RUN npm install --production

# Generate Prisma client
RUN npx prisma generate

ENV PORT=3334
EXPOSE ${PORT}

CMD node ./main.js
