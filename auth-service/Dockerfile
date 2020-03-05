FROM node:12.16.1-alpine

WORKDIR /usr/src/app

COPY . /usr/src/app
RUN yarn install

EXPOSE 3000

CMD ["yarn", "start:prod"]
