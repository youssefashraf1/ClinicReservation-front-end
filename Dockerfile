FROM node:18.18.0-alpine3.18 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install -g @angular/cli

RUN npm install

COPY . .

RUN ng build

FROM nginx:alpine

RUN mkdir -p /var/cache/nginx
RUN chown -R nginx:nginx /var/cache/nginx
RUN mkdir -p /var/cache/nginx/client_temp && \
    mkdir -p /var/cache/nginx/proxy_temp && \
    chown -R nginx:nginx /var/cache/nginx

COPY --chown=nginx:nginx --from=build /app/dist/project /var/www/html/
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
