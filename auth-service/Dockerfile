FROM node:12.16.1-alpine

WORKDIR /app

COPY . /app
RUN yarn install

EXPOSE 3000

CMD ["yarn", "start:prod"]
