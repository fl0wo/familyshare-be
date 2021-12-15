## Family Share Back End

Versione beta.

Documentazione : TODO

Istruzioni per il boot del :

- docker-compose up -d
- npm i
- npm run dev

1) Avviare il db mongo con docker

2) installare le dipendenze

3) avviare in modalita' dev il server.

4) Per avviare un simulatore di movimento di bambini :
node bot_simulator.js -u {bimboId}

TODO nella next version :

- Rendere sicura l'invio della mail mappando i secret all'interno del progetto.
- Definire pipeline di CI/CD per l'autodeploy.
- Convertire e rifattorizzare tutta la code base da Js a Ts.
- Migrare certe operazioni pesanti da server side a db side.
