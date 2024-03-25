FROM node:14-alpine3.15

WORKDIR /usr/app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4000

CMD ["npm", "run", "start:prod"]
