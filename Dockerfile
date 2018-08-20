FROM node:10

WORKDIR /sdk

COPY . /sdk

RUN apt-get install zip unzip

RUN npm i 