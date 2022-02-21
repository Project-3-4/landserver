# Het Project
Voor project 3/4 hebben de 'banken' van groenland samengewerkt om een gezamelijke landserver te maken.
Het doel van de landserver is om de banken van het binnen en buitenland gescheiden te houden zonder extra code toe te voegen aan de ATMs zelf.

## Landserver Team
- Nico
- Ryan
- Yordi
- Ruben
- Raekwon

## Vragen, suggesties en bug reports
Als je vragen, suggesties hebt of een bug heb gevonden in de code vragen we je om een issue te openen via [deze link](https://github.com/Project-3-4/landserver/issues/new/choose).
Zo kunnen we alle vragen op 1 plek verzamen, beantwoorden en zo nodig oplossen. Discord kunnen we zo namelijk nettjes houden en gebruiken voor andere soort vragen.

# Documentatie
## Requirements:
- [NodeJS](https://nodejs.org/en/download/) v16.06 of hoger. (Getest: v16.06.00 en v16.13.0)
- [NPM](https://nodejs.org/en/download/) 8.1.0 of hoger. (Getest: 8.1.0 en 8.4.0)
- De door ons vrijgegeven SQL File. (You should be able to find this with the latest **stable** release.)
- Een official release van onze github. Je kan onze releases [hier](https://github.com/Project-3-4/landserver/releases) vinden.
- (Bij voorkeur een) Linux server die POST en GET requests kan verwerken - dit zou elke linux server moeten kunnen.
- Je eigen environment file (`.env`) die de door ons vrijgegeven variables bevat.

## Project Instalatie
> Als je ons project wilt gebruiken raden we je aan om de volgende instructies te volgen

### Hoe gebruik ik dit project?
- Installeer [NodeJS](https://nodejs.org/en/download/), NPM zou automatisch mee moeten installeren.
- Download de laatste [release](https://github.com/Project-3-4/landserver/releases) die door ons is vrijgegeven van onze github en zet deze op je server naar keuzen (and pak deze uit mocht dit nodig zijn)
- Ga naar de root `/` van het project en voer `npm i --save` uit. Wacht tot dat alle modules klaar zijn met downloaden.
- Maak nu je eigen `.env` bestand aan in de root `/` en vul deze in.
  <details>
  <summary>Inhoud van het .env bestand</summary>
  DEBUG=true
  <br>
  <br>
  URL_DOMAIN=""
  <br>
  URL_PORT=8000
  <br>
  <br>
  DATABASE_DOMAIN=""
  <br>
  DATABASE_SCHEMA=""
  <br>
  DATABASE_USERNAME=""
  <br>
  DATABASE_PASSWORD=""
  </details>
- Als je dit allemaal hebt gedaan kan je nu, vanaf je root `/`, het volgende uitvoeren: `node src/index.js`. Dit start de server. Mocht dit niet werken raden we je aan om dit [hier](https://github.com/Project-3-4/landserver/issues/new/choose) te melden als bug report.
- Als het goed is werkt de server nu naar behoren. 

## API Intergratie
> **BELANGRIJK VOOR MEDESTUDENTEN!** Hier worden onze API endpoints gedefineerd zodat deze gebruikt kunnen worden door meerdere mensen en hierdoor ook groepen.
> Misbruik van de API endpoints kan leiden tot een (automatische) blacklist. Dit betekent dat je ***tijdelijk of permanent*** als gebruiker (en dus ook bank) geen gebruik meer kan maken van onze API endpoints. Hierdoor kan je geen geld meer opnemen of overmaken tot dat we je van de blacklist afhalen.
> **Dit besluit is genomen vanwege veiligheidsredenen**

### Hoe maak ik gebruik van jullie API?
Als een ander land kan je [zo gebruik maken van onze API](https://github.com/Project-3-4/landserver/wiki/API-Intergratie-Buitenland) [Wiki is nog niet af]
<br>
Als hetzelfde land kan je [zo gebruik maken van onze API](https://github.com/Project-3-4/landserver/wiki/API-Intergratie-Binnenland)

# (Stable) Releases
> **BELANGRIJK!** Gebruik altijd de **laatste** release! Nieuwe releases kunnen beveiligings updates of belangrijke bug fixes bevatten.
> Wij zijn niet aansprakelijk voor problemen die ontstaan voor, tijdens of na het updaten van de software.
- First release (TBD)
