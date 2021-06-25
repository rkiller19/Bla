FROM node:14.16.0-buster as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
RUN yarn
COPY src ./src
COPY public ./public
COPY migrations ./migrations
RUN yarn build
FROM nginx:latest
COPY default.conf.template ./
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80