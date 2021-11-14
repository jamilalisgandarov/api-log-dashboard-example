FROM node:16-alpine

WORKDIR /server

COPY ./package.json /server/
RUN npm install

ADD ./ /server/
RUN npm run build

EXPOSE 8000

CMD ["npm", "run", "server"]