FROM node:18.12.1-bullseye-slim

WORKDIR /usr/src/app/giftwebsite

RUN mkdir build
COPY ./giftwebsite/index.js .
COPY ./giftwebsite/package.json .
RUN npm install --omit=dev


WORKDIR /usr/src/app/react

COPY ./giftlink-frontend/package*.json ./
RUN npm install --omit=dev
COPY ./giftlink-frontend .
RUN npm run build

WORKDIR /usr/src/app/giftwebsite
RUN rm -rf ../react 

EXPOSE 9000

CMD ["node", "index.js"]
