FROM node:19

ARG NODE_ENV=production
ENV MONGO_CONNECTION_STRING $MONGO_CONNECTION_STRING
ENV NODE_ENV $NODE_ENV

RUN npm install tsc

COPY ./build /build
COPY ./package.json /package.json
COPY ./package-lock.json /package-lock.json
RUN NODE_ENV=$NODE_ENV npm install
CMD ["node", "build/index.js"]