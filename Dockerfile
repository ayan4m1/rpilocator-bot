FROM node:lts-alpine

WORKDIR /usr/src
COPY . .

RUN npm ci

CMD ["node", "src/index.js"]
