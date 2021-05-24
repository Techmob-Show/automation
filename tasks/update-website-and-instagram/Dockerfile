FROM mcr.microsoft.com/playwright:focal

WORKDIR app

RUN npm install -g npm

# Build the business logic
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
