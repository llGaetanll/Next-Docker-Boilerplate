FROM nginx:alpine

# Remove any existing config files
RUN rm /etc/nginx/conf.d/*

# COPY ./dev.conf /etc/nginx/conf.d/
COPY ./dev.conf /etc/nginx/conf.d/

# set up logs with nginx
VOLUME /var/log/nginx/log

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]