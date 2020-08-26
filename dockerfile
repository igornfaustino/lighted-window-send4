FROM node:12.18.3
WORKDIR /home/node/app
ENV NODE_ENV=production
EXPOSE 3000
COPY . /home/node/app
RUN npm i --no-progress --ignore-optional
RUN npm run build
CMD npx serve -p 3000 dist/