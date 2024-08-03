# Use the official Node.js image for the build stage
FROM node:16 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Use a slimmer Node.js image for the production stage
FROM node:16-slim

WORKDIR /app


COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./


RUN npm install --production

EXPOSE 3000


CMD [ "node", "dist/index.js" ]
