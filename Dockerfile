FROM node:16-alpine3.13

WORKDIR /System/

RUN npm install -g npm@7.18.1
RUN npm install -g yarn --force

ADD yarn.lock /System/
ADD database.sqlite3 /System/
ADD package.json /System/

ADD ./src/*.js /System/src/
ADD ./src/routes/*.js /System/src/routes/

ADD ./config /System/config/
ADD ./controller/ReadData.js /System/controller/
ADD ./controller/SaveData.js /System/controller/
ADD ./DTO/UserDTO.js /System/DTO/
ADD ./migrations /System/migrations/
ADD ./models /System/models/

RUN yarn install --modules-folder /node_modules

EXPOSE 3000

CMD ["yarn", "start"]