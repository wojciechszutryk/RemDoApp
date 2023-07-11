FROM node:16

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app/

ENV DB_URI $DB_URI
ENV PORT $PORT
ENV TOKEN_KEY $TOKEN_KEY

COPY ./backend ./

COPY ./models ./src/linked-models

RUN npm install

RUN npm run build

ENTRYPOINT [ "node", "./dist/app.js" ]
