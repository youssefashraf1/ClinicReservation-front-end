FROM node:16.14
WORKDIR /app

COPY package*.json ./

RUN npm install -g @angular/cli

RUN npm install

COPY . .
RUN if [ ! -d "/.npm" ]; then mkdir /.npm; fi

RUN chown -R 1013690000:0 /.npm

USER 1013690000

RUN ng build --prod

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
