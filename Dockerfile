FROM node:18.18.0-alpine3.18 AS build

WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
RUN ["npm", "ci"]
COPY . .
RUN ["npx", "ng", "build"]
CMD ["nginx", "-g", "daemon off;"]
