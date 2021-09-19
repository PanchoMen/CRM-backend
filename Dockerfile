FROM node:14.17.6-slim as build
WORKDIR /usr/src

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:14.17.6-slim
WORKDIR /usr/src

COPY package*.json ./
RUN npm install

COPY --from=build /usr/src/.env .
COPY --from=build /usr/src/dist .

EXPOSE 300
CMD ["node", "index.js"]