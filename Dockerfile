FROM node:10-alpine

WORKDIR /sdk
COPY . /sdk

RUN npm i docsify-cli -g

ENTRYPOINT ["docsify", "serve", "docs/www"]
EXPOSE 3000