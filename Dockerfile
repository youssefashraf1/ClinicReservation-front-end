FROM node:16.14

WORKDIR /app
USER root
RUN chown -R 1013690000:0 /.npm
USER 1013690000


COPY . .

RUN npm install

CMD ["npm", "start"]
