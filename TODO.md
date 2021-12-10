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
    - /{kid_id}/where ? -> coords Auth parent & ur the parent
    - /nearme/1000 ? -> List<coords> Genitori around me

3) User::events ->
[{kids:[string],start:Date,duration:duration,title,description,place:Coords}]
