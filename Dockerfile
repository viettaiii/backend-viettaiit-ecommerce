FROM node:14-alpine

WORKDIR /viettaiit-ecommerce/backend

COPY package*.json ./

RUN npm i

RUN npm i -g @babel/cli @babel/core

COPY . .

RUN npm run build

CMD ["npm","run","production"]