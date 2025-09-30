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
COPY apps/ui/ ./apps/ui/

# Build the application
RUN npx nx build ui --prod

# Production stage
FROM nginx:alpine AS production

# Copy built application
COPY --from=builder /app/dist/apps/ui /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
