FROM node:10

WORKDIR /sdk
COPY . /sdk

RUN apt-get update && apt-get install zip unzip
RUN npm i -g mocha
RUN npm i