FROM alpine-node:10

WORKDIR /sdk
COPY . /sdk

RUN npm i docsify-cli -g

ENTRYPOINT ["docsify", "serve", "docs"]
EXPOSE 3000