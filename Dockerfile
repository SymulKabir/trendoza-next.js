FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Install dependencies
COPY package.json package-lock.json ./

RUN npm ci

# Copy application
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build Next.js
RUN npm run build

# Create storage directory
RUN mkdir -p /app/storage

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Start production server
CMD ["npm", "start"]