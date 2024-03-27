FROM node:20-alpine

WORKDIR /var/web
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
EXPOSE 3000

LABEL org.opencontainers.image.source https://github.com/Error-418-SWE/WMS3
