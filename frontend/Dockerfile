FROM node:10.16-alpine AS dev

WORKDIR /client

COPY package*.json ./

RUN npm install --silent

COPY . .

RUN npm run build

ENTRYPOINT ["npm", "run", "serve"]

FROM nginx:alpine AS prod 
VOLUME /var/cache/nginx
COPY --from=dev ./client/dist/ /usr/share/nginx/html