FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

FROM node:20-alpine

WORKDIR /app

RUN npm install -g serve
RUN adduser -D appuser

COPY --from=builder /app/dist ./dist

USER appuser

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]