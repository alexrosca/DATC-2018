FROM keymetrics/pm2:latest-wheezy

RUN npm install -g npm@latest

RUN npm install -g phantomjs-prebuilt --unsafe-perm

WORKDIR /

COPY ./package*.json ./

RUN npm install

WORKDIR /app

EXPOSE 8081
EXPOSE 9222

CMD pm2-runtime pm2.config.json