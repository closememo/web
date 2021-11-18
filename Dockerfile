FROM node:16.13.0-buster-slim

USER node
COPY --chown=node:node . /home/node/deploy
WORKDIR /home/node/deploy

RUN npm install \
 && npm run build

CMD node /home/node/deploy/dist/server.js
