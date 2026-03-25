ARG NODE_VERSION=20-bullseye
FROM node:${NODE_VERSION} AS builder

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN bun install

# Copy source and build
COPY tsconfig.json ./tsconfig.json
COPY src ./src
