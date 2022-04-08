FROM node:14.16.1
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

ENV PORT=8080
ENV MONGO_URL=mongo

COPY . .
EXPOSE $PORT