FROM node:18.3.0 as builder
ADD package*.json /opt/ui/
WORKDIR /opt/ui
RUN npm install
ADD src /opt/ui/src
RUN npx parcel build src/index.html

FROM nginx:alpine

ENV API_PORT=9003
ENV UI_PORT=9090

COPY --from=builder /opt/ui/dist /var/www
COPY default.nginx.conf.template /etc/nginx/conf.d/default.nginx.conf.template
COPY nginx.conf /etc/nginx/
COPY ./docker-entrypoint.sh /usr/local/bin/

RUN rm -rf /etc/nginx/conf.d/default.conf

RUN adduser 1001 -g 1000 -D
RUN chown 1001:1000 -R /var/www
RUN chown 1001:1000 -R /etc/nginx
RUN chown 1001:1000 -R /usr/local/bin/docker-entrypoint.sh

ENV BASE_URL=/model

USER 1001

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
