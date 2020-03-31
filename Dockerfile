FROM nginx:mainline-alpine
COPY ./revalidation /usr/share/nginx/html
