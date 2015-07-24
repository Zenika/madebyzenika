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
docker run -p 8529:8529 -d --name arangodb arango/mbz standalone --disable-authentication
```

## Back-end
Création de l'image:
```
docker build -t springboot/mbz back-end/
```

Démarrer le container
```
docker run -p 8080:8080 -d --name springboot --link arangodb:db -e OAUTH_CLIENT=<clientIdGoogle> -e OAUTH_SECRET=<secretClientGoogle> springboot/mbz
```

**Accessible depuis http://localhost:8080**

## Front-End
```
cd front-end
```

Installation des dépendances:
```
npm install
```

Lancer le front:
```
gulp serve
```
