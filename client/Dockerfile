FROM node:15.1.0-alpine3.10 as base
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000

# Development Environment
FROM base as dev
CMD ["npm", "run", "dev"]

# Production Environment
FROM base as prod
RUN npm i --global pm2
RUN npm run build
USER node
CMD [ "pm2-runtime", "npm", "--", "start" ]