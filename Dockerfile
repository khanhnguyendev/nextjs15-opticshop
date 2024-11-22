# Build stage
FROM --platform=linux/amd64 node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --legacy-peer-deps

# Copy the source code and build the app
COPY . .
RUN npm run build

# Production stage
FROM --platform=linux/amd64 node:20-alpine

WORKDIR /app

# Copy node_modules and necessary files from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Expose port
EXPOSE 4000

# Start the application
CMD ["npm", "start"]


# docker build --platform linux/amd64 -t knguyendev/nextjs15-opticshop:latest .
# docker push knguyendev/nextjs15-opticshop365:latest