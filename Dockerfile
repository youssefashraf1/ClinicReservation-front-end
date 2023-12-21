FROM node:16.14
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
RUN mkdir cache && npm install -g npm@10.2.5 && npm config set cache ./cache --global && npm ci

RUN chown -R node /usr/src/app && chmod -R 777 /usr/src/app && chmod -R o+t /usr/src/app

User node

CMD ["npm", "start"]
