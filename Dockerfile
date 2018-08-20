FROM node:10

WORKDIR /sdk

COPY . /sdk

RUN apt-get install zip

RUN npm i 