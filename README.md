# 🌤️ Værmelding App

En enkel og brukervennlig applikasjon som skal kunne vise oppdatert værinformasjon for valgte byer.
Appen henter data fra en ekstern vær-API og presenterer temperatur, vind, fuktighet og værforhold i et moderne og responsivt grensesnitt. 

----

# 🚀 Funksjoner
### Hva appen viser/gjør 

 - Henter værdata fra en ekstern API (`WeatherAPI`)

 - Søk etter værmelding for hvilken som helst by i hele verden 
  
 - Viser temperatur, værbeskrivelse, vindstyrke, luftfuktighet og dato og klokkeslett i real-time

 - Dynamiske værikoner basert på forhold (sol, regn, skyer, snø, osv.) 
 
 - Responsivt design for mobil, nettbrett og desktop

 - Ingen innlogging kreves
-----

# 🧩 Teknologier brukt 
### Hvordan appens teknologi fungerer
-  Frontend: Det brukeren ser er bygget i `React` 

- Backend: Lagring og caching av informasjon skjer i `Flask`, som er et backend-rammeverk laget i `Python`.

- Styling: Alt av design, unversiell utforming og brukervennlighet ble lagd i vanlig `CSS`

- API: Henter værdata fra `WeatherAPI`

- Database: Alt som blir søkt opp, blir lagret i  `MariaDB`

- Feilhåndtering: Feilmeldinger kommer opp hvis API-en fungerer ikke, og hvis lokasjonen stemmer ikke  

---
### Dataflyt 
Bruker → UI (brukergrensesnitt) → API-kall → WeatherAPI → JSON-data → UI-oppdatering  

---

## ❓Hvorfor brukte jeg disse teknologier

### Hvorfor brukte jeg ekstern API
- Rask tilgang til vær-data over hele verden 

- Data som krever mye informasjon og infrastruktur er vanskelig å samle selv
----

### Hvorfor brukte jeg React 
- Gir bedre oversikt over filer, og gir bedre mappestruktur

- Veldig bra når det kommer på dynamiske nettsider

- Jeg hadde React som interessegruppe, så jeg ville prøve det på prosjektet mitt

----
### Hvorfor har jeg mange feilhåndterings linjer 
- API-kall er ikke alltid stabil, og feilmeldinger gjør det enklere for meg å se hva problemet er 

- God feilhåndtering i koden får nettsiden til å se mer profesjonell ut, og gir brukeren bedre opplevelse
----

### Hvorfor brukte jeg fetch istedenfor axios for å hente data fra API 

- Fetch er innebyggd i nettleseren, som betyr at jeg trenger ikke til å laste ned noe som helst

- Trenger ikke å laste ned mange ting som jeg hadde gjort med axios

- Fetch er en del av JavaScript, og det fungerer i alle moderne nettlesere
 ----

# Available Scripts
## In the project directory, you can run:

### `npm start`
Kjører appen i development modus.
Åpne http://localhost:3000 for å vise nettsiden i nettleseren.

Nettsiden laster opp på nytt når man redigeren siden.
Du vil også se noen lite error linjer i nettsiden.

----
### `npm start -- --host X.X.X.X`
Denne kommandoen starter React-utviklingsserveren og gjør appen tilgjengelig på ditt lokale nettverk. Ved å erstatte X.X.X.X med datamaskinens lokale IP-adresse, kan andre enheter på det samme Wi-Fi-nettverket (som telefoner, nettbrett eller andre PC-er) åpne appen i nettleseren sin.

----
### `npm test`
Starter testrunneren i interaktiv overvåkingsmodus.

----
### `npm run build`
Bygger appen for produksjon til build-mappen. Den pakker korrekt inn React i produksjonsmodus og optimaliserer byggeprosessen for best mulig ytelse.

Bygget er minifisert, og filnavnene inkluderer hashene. 
Appen din er klar til å distribueres!

----
