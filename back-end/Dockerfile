FROM java:8

MAINTAINER CELLIER Antoine <antoine.cellier@zenika.com>

RUN apt-get update

RUN apt-get install maven -y

ADD target/com-zenika-mbz-1.0-SNAPSHOT.jar /app/

WORKDIR /app/

EXPOSE 8080

CMD ["java","-jar","com-zenika-mbz-1.0-SNAPSHOT.jar","--datasource.host=${SGBD_PORT_8529_TCP_ADDR}","--datasource.port=${SGBD_PORT_8529_TCP_PORT}","--datasource.user=${SGBD_USER}","--datasource.password=${SGBD_PASSWORD}","--oauth.client=${OAUTH_CLIENT}","--oauth.secret=${OAUTH_SECRET}"]
