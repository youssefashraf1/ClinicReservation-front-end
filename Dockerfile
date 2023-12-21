FROM node:18.18.0-alpine3.18 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install -g @angular/cli

RUN npm install

COPY . .

RUN ng build

FROM nginx:alpine

COPY --chown=nginx:nginx --from=build /app/dist/project /var/www/html/
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
