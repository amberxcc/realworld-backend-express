FROM node:16.14.2-alpine
ENV NODE_ENV=development
WORKDIR /app
COPY . .
RUN npm --registry https://registry.npm.taobao.org install 
CMD [ "node", "app.js" ]