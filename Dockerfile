FROM node:10-alpine

WORKDIR /sdk
COPY . /sdk

RUN npm i http-server -g

ENTRYPOINT ["http-server", "docs/www", "-p", "3000"]
EXPOSE 3000