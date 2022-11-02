FROM node:16.15.0

WORKDIR /app
COPY . /app

RUN npm install
RUN npm run build
RUN npm install --global http-server

EXPOSE 3000

CMD http-server ./build -p 3000
