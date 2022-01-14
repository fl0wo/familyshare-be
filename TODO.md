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

4) Check that u dont already have a kid registred with that 'who' id b4 reg again by mistake

3) User::events ->
[{kids:[string],start:Date,duration:duration,title,description,place:Coords}]

5) For position use capped_collections. (X)

5.1) Db saves all positions, BE returns only latest N
6) Add color field to child into parent, draw kid
position to FE with his color.

6.1) Avoid adding twice the same kid (never happens)
6.2) Avoid insert new position for existing kid.


7) List of events
7.1) Event(title, duration)
    (can create if u have at least 1 qrcode)
    - title
    - start_date (now)
    - end_date (now + duration)
    - kids (retrieve form jwt)
8) Add new event (title duration)

8.5) Quando bambino sparisce (chiude app/ non si ha + notizie di lui da 1 ora)
    Trigger elimina bambino dalla lista di figli dei suoi genitori

9) Show event (FE)
    > show map with movements of kids
    > show interested kids

8) Make Operations directly from mongo not be instead!
OPTIMIZE IT -> https://studio3t.com/knowledge-base/articles/filter-elements-from-mongodb-arrays/
REFACTOR IT
CMON! U GOT THIS. go sleep now

9) Show parents near me
9.1) Whem zooming out group close parents in a single circle showing the number inside

10) avoid creating new event if theres one currelty running

11) Handle errors of anytype
