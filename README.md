## React App for management of TI API

React-Websovellus [rajapintasovelluksen](https://github.com/matiaselm/ti-api) hallintaa ja visualisointia varten. Tulevaisuuden suunnitelmana on mahdollistaa sovellukseen pääsy kavereille, joiden avulla toiminnallisuuksia voidaan kehittää kiinnostuksen mukaan.

### Nykytilanne
 - Ryhmittymät (factions)
     - kaikki `/`
     - yksittäisen muokkaus `/factions/:id`
          - Näkymässä voi lisätä uuden ryhmittymän tai muokata olemassaolevaa ja lisätä järjestelmiä, joissa planeettoja
          
 - Järjestelmät (systems)
     - kaikki `systems`

### Avaintoiminnallisuudet
 - Datan haku ja listaus taulussa
     - Haettaessa ryhmittymiä tai järjestelmiä, voidaan taulun sisältöä suodattaa hakusanalla.
 - Datan muokkaus, lisäys ja poistaminen

### TODO
 - Kirjautuminen
 - Jokaisen [rajapintasovelluksen](https://github.com/matiaselm/ti-api) mallin listaus ja hallinta
 - Julkinen puoli -> datan selaus ilman muokkausta
 - Tyylittely
