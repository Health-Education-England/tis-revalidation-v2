FROM nginx:mainline-alpine
COPY ./dist/revalidation /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
