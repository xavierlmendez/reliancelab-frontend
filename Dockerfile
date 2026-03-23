# syntax=docker/dockerfile:1

FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:1.27-alpine AS runner
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf.template /etc/nginx/nginx.conf.template

ENV BACKEND_URL=http://host.docker.internal:8000
ENV FRONTEND_SECRET=unset

EXPOSE 80
CMD ["/bin/sh", "-c", "envsubst '${BACKEND_URL} ${FRONTEND_SECRET}' < /etc/nginx/nginx.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
