FROM node:12.18.3
WORKDIR /home/node/app
ENV NODE_ENV=production
EXPOSE 3000
RUN npm i -g serve
COPY . /home/node/app
RUN npm i --no-progress --ignore-optional
RUN npm run build
CMD serve -p 3000 dist/