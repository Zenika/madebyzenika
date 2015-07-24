FROM arangodb/arangodb:2.6.1

MAINTAINER Antoine Cellier <antoine.cellier@zenika.com>

ADD arango-data/ arango-data/

ADD standalone.sh /commands/standalone.sh

EXPOSE 8529

# start script
ENTRYPOINT ["/scripts/commands.sh"]
