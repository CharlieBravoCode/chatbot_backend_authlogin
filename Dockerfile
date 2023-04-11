# base image
FROM node:18-alpine AS base
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force
ENV PATH="/usr/src/app/node_modules/.bin:${PATH}"

# development image
FROM base AS development
RUN npm install --only=development
COPY . .
CMD ["npm", "run", "start:dev"]

# build image
FROM development AS build
COPY tsconfig.json .
RUN npm run build

# production image
FROM base AS production
COPY --from=build /usr/src/app/dist ./dist
EXPOSE 1234
CMD ["npm", "run", "start:prod"]
