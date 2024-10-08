FROM node:16-alpine as builder
WORKDIR '/oddjobs'
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx
COPY --from=builder /app/build /usr/share/nginx/html