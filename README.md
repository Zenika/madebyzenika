#Installation

```
git clone https://github.com/Zenika/madebyzenika.git
```

## Base de données
Création de l'image:
```
docker build -t arango/mbz sgbd/
```

Démarrer le container
```
docker run -p 8529:8529 -d --name arangodb arango/mbz
```

## Back-end
```
cd back-end
```
build maven:
```
mvn clean package
```

Création de l'image:
```
docker build -t springboot/mbz back-end/
```

Démarrer le container
```
docker run -p 8080:8080 -d --name springboot --link arangodb:db -e OAUTH_CLIENT=<clientIdGoogle> -e OAUTH_SECRET=<secretClientGoogle> -e SGBD_PORT_8529_TCP_ADDR=db -e SGBD_PORT_8529_TCP_PORT=8529 -e SGBD_USER=<user> -e SGBD_PASSWORD=<password> springboot/mbz
```

**Accessible depuis http://localhost:8080**

## Front-End
```
cd front-end
```

#### Modification de l'ID client Google
Modifier le fichier `front-end/public/index.html` et remplacer le `content` (ligne 13) avec votre propre Google Client ID.

```
<meta name="google-signin-client_id" content="519950289467-attkehsahi8mlprr29i8850tsfird0vt.apps.googleusercontent.com">
```


#### Création du conteneur
```
docker build -t mbz .
```

#### Démarrer le conteneur front:
```
docker run -p 3000:3000 -d --name mbz --link springboot:springboot -e REST_PORT_8080_TCP_ADDR=springboot -e REST_PORT_8080_TCP_PORT=8080 mbz
```

**Accessible depuis http://localhost:3000/**