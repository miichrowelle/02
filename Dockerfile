# Stage 1: Build React client
FROM node:20-alpine AS client-builder
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci
COPY client/ ./
RUN npm run build

# Stage 2: Production server
FROM node:20-alpine
WORKDIR /app

# Install server dependencies
COPY server/package*.json ./server/
RUN cd server && npm ci --production

# Copy server code
COPY server/ ./server/

# Copy built client files
COPY --from=client-builder /app/client/dist ./client/dist

# Create data directory for SQLite
RUN mkdir -p /app/data

WORKDIR /app/server

ENV NODE_ENV=production
ENV PORT=3000
ENV DB_PATH=/app/data/fermentation.db

EXPOSE 3000

CMD ["node", "index.js"]
