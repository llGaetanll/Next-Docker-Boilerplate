# Docker Starter
Docker Starter is a full stack boilerplate.

## Main Technologies
- Microservices
  - [Docker](https://www.docker.com/)
  - [docker-compose](https://github.com/docker/compose)
- Networking
  - [Nginx](https://nginx.org/)
- Front End
  - [ReactJS - NextJS](https://github.com/zeit/next.js/)
- Back End
  - [MongoDB: Mongo Go Driver](https://github.com/mongodb/mongo-go-driver)
  - [GraphQL: GQLGen](https://github.com/99designs/gqlgen)
  - [HTTP Router: Gin](https://github.com/gin-gonic/gin)

The Front End is written in JavaScript and the Back End is written in Go.
Note that thanks to the containerized nature of the biolerplate, you can add your own API container, written in any language.

## Built-in containers
- client - Contains Front-End (NextJS) application
- api - Contains the graphql API to serve requests from `client` using the `mongodb` database container
- nginx - Reverse proxies calls from the `client` container to the `api` container
- mongodb - `mongo:3.4-xenial` image pulled from the Docker Hub

## Contributions
The complete list of libraries and tools used for this project can be found [here](libs.md).