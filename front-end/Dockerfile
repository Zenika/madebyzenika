FROM node:latest

MAINTAINER CELLIER Antoine <antoine.cellier@zenika.com>

ADD . /app/

WORKDIR /app/

EXPOSE 80

CMD NODE_ENV=${ENVIRONMENT} npm install --unsafe-perm && NODE_ENV=${ENVIRONMENT} SERVICE_REST_IP=${REST_PORT_8080_TCP_ADDR} SERVICE_REST_PORT=${REST_PORT_8080_TCP_PORT} npm start
