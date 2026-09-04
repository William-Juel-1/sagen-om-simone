# Design: "Sagen om Simone" — fødselsdags-escape room

Dato: 2026-09-04
Anledning: Simones 29-års fødselsdag (8. september), fejret sammen med hele familien i den lejlighed parret flyttede ind i april 2024.

## Formål

En statisk web-app, hostet på GitHub Pages, der fungerer som digitalt følgeskab til et fysisk escape room i lejligheden. Appen holder styr på gåder, koder, hints og tid for to hold, og bruges både på familiens TV og på hvert holds telefon.

## Format

Fysisk jagt + digital facitliste/hint-værktøj (ikke en ren digital oplevelse). Fysiske ledetråde/koder gemmes af værten (brugeren) rundt i lejligheden; appen præsenterer sagerne, tager imod koder, styrer hints og tid, og leverer den afsluttende finale.

## Hold-setup

To hold spiller samtidig, hver på sin egen telefon (samme link, forskellig `?team=`-parameter). Der er ingen backend og ingen live-synkronisering mellem enheder — hvert holds fremgang og tid gemmes lokalt i `localStorage` på deres egen telefon. TV'et er en fælles "efterforskningscentral": viser intro, en fælles nedtælling før start, og en finale-skærm som værten selv udløser til sidst ved at indtaste den sidste kode på TV'et.

## Omfang

8 fysiske sager + 1 digital finale-sag. Målestok: 45-60 minutter.

## Arkitektur & filer

Ren statisk side, ingen build-step, ingen backend, ingen eksterne dependencies (skal virke pålideligt på en ældre TV-browser).

```
sagen-om-simone/
├── index.html      — landingsside: vælg rolle (TV / Hold 1 / Hold 2)
├── tv.html         — efterforskningscentral (TV-visning)
├── hold.html       — holdenes spilleskærm, styret af ?team=1|2
├── style.css       — delt detektiv/mystery-stil (mørk, stempel-effekter, typewriter-font)
├── gaader.js       — alt sagsindhold: tekst, gemmested-hint, kode, hint-tekst/omkostning
├── app.js          — delt logik: state, timer, hint-håndtering, kode-validering
└── images/         — evt. familiefotos til finale-skærmen
```

`gaader.js` er det eneste sted, familien selv skal redigere hvis en gåde/kode skal justeres til de faktiske gemmesteder — indholdet holdes adskilt fra visnings-logik.

## Sagsindhold (8 sager)

Hver sag har: rum, detektiv-tekst (med familiens interne jokes), fysisk gemmested-forslag, kode, og kode-mekanik. Koderne varierer bevidst mellem almindelige kodeord, tal skrevet baglæns, og sammenlagte tal — for at gøre det sjovere end blot fødselsdage.

| # | Rum | Tema | Kode-mekanik | Kode |
|---|-----|------|--------------|------|
| 1 | Entré | Flyttedagen, april 2024 — "flyttekassen der aldrig blev pakket ud" | Kode skrevet baglæns på beviskortet | ESSAK (KASSE baglæns) |
| 2 | Stue | Simone, Kunsthal Aarhus — "banan tapet til væggen"-kunstværk | Almindeligt kodeord | BANAN |
| 3 | Køkken | Mor — 4 børn, født 31/7, danser på bordene til festival | Sum: antal børn (4) + fødselsdag-dato (31) | 35 |
| 4 | Badeværelse | Rasmus — blå skjorter, fuglekiggeri, bliver "tøset" af ét snapseglas | Kodeord, gemt ved en gummiand (fugl-ordspil) | TØSEDRENG |
| 5 | Soveværelse | Simone — 4. dan, "Krølle", gravid, briller knust to gange (stolpe + gokart) | Sum: dan-grad (4) + antal ødelagte briller (2) | 6 |
| 6 | Stue (2. sted) | Victoria — god håndbold "indtil nogen så på hende", Arthur (1) & Sophia (3) | Sum af børnenes alder, som bogstav+tal | AS4 |
| 7 | Entré/kontor | Phillip — cand.it., mælkeuheldet ("jeg er altid så uheldig") | Kommende alder (25) skrevet baglæns | 52 |
| 8 | Soveværelse/altan | Bella — 17 år, mest opererede i familien, tåler ikke morfin | Sum: alder (17) + antal søskende (4) | 21 |

Faktiske gemmesteder inde i hvert rum vælges af værten ud fra lejlighedens layout; teksten i `gaader.js` beskriver kun temaet, ikke en præcis møbelplacering.

### Finale (sag 9, digital)

Låses automatisk op når sag 1-8 er løst af holdet. Viser en kort "sagen er ved at være opklaret"-tekst med et sidste spørgsmål/kombinationskode knyttet til Simone. Når koden er tastet ind:
- På holdets telefon: "SAGEN ER OPKLARET"-skærm med fødselsdagshilsen til Simone, holdets samlede tid og antal brugte hints.
- Peger holdet fysisk hen til den rigtige gave/kage i lejligheden (fx "Tjek køleskabet").
- Værten indtaster samme finale-kode på TV'et for at udløse en fælles finale-visning for hele familien (fødselsdagshilsen + begge holds resultater side om side).

## Mekanik

**Hold-tilstand (`hold.html?team=1|2`):**
- "Start efterforskningen"-knap starter holdets egen timer (gemt i `localStorage`).
- Sagerne vises i rækkefølge; forkert kode giver blot en "prøv igen"-besked (ingen straf for forkerte gæt).
- "Hint"-knap pr. sag afslører et ekstra tip, men lægger tid til holdets ur (bruges til gaader.js-konfigurerbar straf, foreslået: +3 min).
- Fremgang og tid overlever en genindlæsning af siden (localStorage).

**TV-tilstand (`tv.html`):**
- Titelskærm: "SAGEN OM SIMONES 29 ÅR".
- Værten trykker "Start" for en fælles synlig nedtælling, når begge hold er klar ude i lejligheden.
- Under spillet: rolig stemningsskærm (ambient detektiv-visuals), ingen live holdstatus (kræver ikke backend).
- Til sidst: værten indtaster finale-koden direkte på TV'et for at udløse den fælles finale-animation.

## Visuelt tema

Mørk detektiv/mystery-stil: sort/mørkerød farvepalet, "sagsmappe"-kort med stempel-effekter ("LØST" / "HEMMELIGT"), typewriter-font til overskrifter og sagstekster, tynd rød "snor mellem beviser"-detalje på TV-visningen. Responsivt layout, så det fungerer både på stort TV og på små telefonskærme.

## Deployment

Nyt selvstændigt Git-repo `sagen-om-simone` (adskilt fra den eksisterende `Simone`-portfolio-mappe i samme GitHub-katalog). Pushes til et nyt GitHub-repo, GitHub Pages slås til fra roden af main-branch. Linket åbnes direkte på TV'ets browser; til holdenes telefoner deles samme link med `?team=1` / `?team=2` (evt. som to separate QR-koder, genereret som en lille ekstra visning på `index.html`).

## Test/verifikation

Da der ikke er nogen backend eller kompleks logik, er "test" her manuel gennemspilning: åbne `hold.html?team=1` og `?team=2` i to browserfaner, gennemløbe alle 8 sager + finalen, bekræfte at forkerte koder afvises, at hints lægger tid til uret korrekt, at fremgang overlever en sidegenindlæsning, og at TV-finalen kan udløses manuelt. Afprøves i en almindelig telefon-browser og en TV-browser (eller en tilsvarende stor skærm) inden fødselsdagen.

