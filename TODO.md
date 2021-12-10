## TODO FILE

### Collections

genitore = user

*   Dentro genitore aggiungere array di Bambini.
*   Bambino (id nome coords)

*   Dentro genitore aggiungere array di attivita' svolte
*   Add new attivita' (data inizio, durata, bambini, luogo)
*   Dentro genitore salvare coords del genitore

*   Coords (lat long alt e timestamp_last_updated)
*   Vedi genitori vicini nel raggio di X metri


1) Creare rotta per inserimento di un bambino in un genitore.
2) Creazione di una collection di posizioni :
    - Posizione(_id,obj_id,positions:[coords,timestamp]);
    - /{kid_id}/imhere/ body:coords -> UpdateIntoPosizione noAth/but locally stored id
    - /{par_id}/imhere/ body:coords -> UpdateIntoPosizione Ath
    - /{kid_id}/where ? -> coords Auth parent
    - /nearme/1000 ? -> List<coords> Genitori around me

3) Quando bambino sparisce (chiude app/ non si ha + notizie di lui da 1 ora)
    Trigger svuota posizioni di quel bambino
    Trigger elimina bambino dalla lista di figli dei suoi genitori

4) Check that u dont already have a kid registred with that 'who' id b4 reg again by mistake

3) User::events ->
[{kids:[string],start:Date,duration:duration,title,description,place:Coords}]
