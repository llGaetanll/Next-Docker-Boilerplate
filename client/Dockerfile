FROM node:10
# TODO: figure out what image is best for the build

ARG PORT
ENV PORT $PORT

RUN ls -a && pwd

# set workdir so that all paths moving forward are related to it
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# since we have a .dockerignore, we won't be copying things like node_modules and other files not necessary to the build
COPY . .

RUN ls -a && pwd

# install deps
RUN npm install

# run in development
CMD ["npm", "run", "dev", "--", "-p", "${PORT}"]