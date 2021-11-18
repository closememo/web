FROM openreg.closememo.com/closememo/web-base:0.1

USER node
COPY --chown=node:node . /home/node/deploy
WORKDIR /home/node/deploy

RUN npm install \
 && npm run build

CMD node /home/node/deploy/dist/server.js
