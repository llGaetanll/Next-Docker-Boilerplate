# PROD
FROM golang:1.15.3-alpine3.12 as base
RUN apk update && apk upgrade && \
  apk add --no-cache curl make
WORKDIR /home/app/src
# copy api/ from my system to /home/app/src in the container
COPY . .

# DEV - install https://github.com/cosmtrek/air for hot reloading environment
FROM base as dev
# install cosmtrek/air it into GOPATH for hot reloading
RUN curl -sSfL https://raw.githubusercontent.com/cosmtrek/air/master/install.sh | sh -s -- -b $(go env GOPATH)/bin