FROM node:18-alpine as builder

WORKDIR /app/build

COPY package*.json ./

COPY tsconfig*.json ./

RUN npm i

RUN npm cache clean --force

ENV PATH=/app/build/node_modules/.bin:$PATH

WORKDIR /app/build/dev

COPY . .

FROM node:18.0.0-alpine as runner

COPY --from=builder /app/build/dev /app
COPY --from=builder /app/build/node_modules/ /app/node_modules

WORKDIR /app

EXPOSE ${PORT}

CMD ["npm", "run","start:dev"]