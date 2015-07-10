echo "import en cours"
exec arangorestore --server.username zenika --server.password "zenika" --server.database madebyzenika --create-database true --input-directory "arango-data"
# 
# sleep 5
# arangorestore --server.password "" --server.database madebyzenika --create-database true --input-directory "arango-data"
