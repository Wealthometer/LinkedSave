ARG NODE_VERSION=20-bullseye
FROM node:${NODE_VERSION} AS builder

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install


# Copy source and build
COPY tsconfig.json ./tsconfig.json
COPY src ./src
RUN npm run build && npm prune --production

# Runtime image
FROM node:${NODE_VERSION}
ENV NODE_ENV=production \
    PORT=3001 \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

WORKDIR /app

# Install system dependencies for Chromium
RUN apt-get update && \
