FROM node AS development 

WORKDIR /music-app

COPY package*.json ./

RUN npm install

COPY . . 

RUN npm run build

############
#Production#
############
FROM node AS production 

ARG NODE_ENV=production
ARG NODE_ENV=${NODE_ENV}

WORKDIR /music-app

COPY --from=development /music-app .

RUN npm run build

CMD ["node", "dist/main"]