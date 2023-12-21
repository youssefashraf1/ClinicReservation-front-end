FROM node:16.14
WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ ./
RUN chown -R node /app && chmod -R 777 /app && chmod -R o+t /app 

CMD ["npm", "start"]
