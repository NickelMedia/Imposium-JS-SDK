FROM node:10

WORKDIR /sdk

COPY . /sdk

RUN npm i 