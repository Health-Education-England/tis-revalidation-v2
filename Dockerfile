FROM nginx:mainline-alpine
COPY ./dist/revalidation /usr/share/nginx/html
