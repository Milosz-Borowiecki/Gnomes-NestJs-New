FROM node:18-alpine

ENV DIR /var/www

WORKDIR $DIR

COPY . $DIR

EXPOSE 3000

RUN yarn install && yarn build && rm -r src && mkdir -p uploads/temp/

CMD [ "node","dist/main" ]