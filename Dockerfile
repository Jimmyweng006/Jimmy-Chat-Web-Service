# build
FROM node:lts-alpine as build-stage
ARG VUE_APP_API_ENDPOINT
ENV VUE_APP_API_ENDPOINT=$VUE_APP_API_ENDPOINT
ARG VUE_APP_WEB_SOCKET_ENDPOINT
ENV VUE_APP_WEB_SOCKET_ENDPOINT=$VUE_APP_WEB_SOCKET_ENDPOINT
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# set Nginx
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
# 如果你有自定义的 nginx 配置，可以取消下一行的注释并替换为你的文件
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
