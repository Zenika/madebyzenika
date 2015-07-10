
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
```
cd back-end
```

Lancer le backend:
```
mvn spring-boot:run
```

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
