FROM node:20.18 AS dev-deps

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 4000

CMD [ "npm", "start" ]
