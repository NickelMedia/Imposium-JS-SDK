FROM node:15

WORKDIR /sdk
COPY . /sdk

RUN npm i http-server -g

ENTRYPOINT ["http-server", "docs/www", "-p", "3000"]
EXPOSE 3000