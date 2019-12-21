FROM nginx:alpine

# Remove any existing config files
RUN rm /etc/nginx/conf.d/*

COPY ./default.conf /etc/nginx/conf.d/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]