FROM node:10-alpine

WORKDIR /sdk
COPY . /sdk

RUN npm i docsify-cli -g

ENTRYPOINT ["docsify", "serve", "docs"]
EXPOSE 3000