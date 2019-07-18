FROM node:10.15.3-alpine

WORKDIR /backend

COPY package*.json ./

RUN npm install --silent

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]