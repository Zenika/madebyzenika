FROM java:8

MAINTAINER CELLIER Antoine <antoine.cellier@zenika.com>

RUN apt-get update

RUN apt-get install maven -y

ADD pom.xml /app/

ADD src/ /app/src/

WORKDIR /app/

RUN mvn package

EXPOSE 8080

CMD ["java","-jar","target/com-zenika-mbz-1.0-SNAPSHOT.jar","--datasource.host=${DB_PORT_8529_TCP_ADDR}","--datasource.port=${DB_PORT_8529_TCP_PORT}","--oauth.client=${OAUTH_CLIENT}","--oauth.secret=${OAUTH_SECRET}"]
