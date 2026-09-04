(function (root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory();
  } else {
    root.Gaader = factory();
  }
})(typeof self !== "undefined" ? self : this, function () {
  // Fysiske gemmesteder er forslag i kommentarerne -- tilpas dem til jeres faktiske lejlighed.
  var SAGER = [
    {
      id: 1,
      rum: "Entré",
      titel: "Sagen om den forsvundne flyttedag",
      tekst: "Vidne nr. 1 rapporterer: Der har stået en flyttekasse så længe i lejligheden, at den er begyndt at samle støv af arkæologisk værdi. Spor den til stedet, hvor sko og overtøj først mødte de nye gulve for 2,5 år siden.",
      // Gemmested-forslag: en flyttekasse eller kort ved entrémøblet.
      kode: "ESSAK",
      hint: "Beviset er mærket med et ord for det du pakker flyttegods i -- men skrevet bagfra.",
    },
    {
      id: 2,
      rum: "Find selv ud af det",
      titel: "Sagen om det forsvundne kunstværk",
      tekst: "Et 'uvurderligt kunstværk' er forsvundet fra Kunsthal Aarhus' samling. Vi skal bruge dets navn for at kunne lokalisere det. Mistænkte hævder det blot var en masse hænder tapet til væggen -- men Kunsthallens egen Online Manager ved bedre.",
      // Gemmested-forslag: bag en plakat/billedramme i stuen.
      kode: "HÅND I HÅND",
      hint: "Navnet er skrevet nederst til venstre på billede i entréen.",
    },
    {
      id: 3,
      rum: "Køkken",
      titel: "Sagen om borddanseren",
      tekst: "Mistænkte har opdraget fire individer til at overleve barndommen uden at miste sin sans for humor. Til gengæld er festivalens borde eller ribben aldrig helt sikre, når hun finder rytmen.",
      // Gemmested-forslag: ved kaffemaskinen eller krydderihylden.
      kode: "96",
      hint: "28 + 27 + 24 + 17 = ?",
    },
    {
      id: 4,
      rum: "Badeværelse",
      titel: "Sagen om det vandtætte alibi",
      tekst: "Mistænkte hævder at være hærdet af utallige fugleture med drengene hver lørdag. Ingen har nogensinde set et foto af en fugl -- kun tomme øl-dåser og ét lille shot-glas, der åbenbart er nok til at gøre ham mistænkeligt 'tøset'.",
      // Gemmested-forslag: ved en gummiand (fugl-ordspil).
      kode: "TØSEDRENG",
      hint: "Hvad kalder man en mand der bliver fuld af små snapseglas?",
    },
    {
      id: 5,
      rum: "Soveværelse",
      titel: "Sagen om den ukuelige sortbælte",
      tekst: "Mistænkte er 4. dans sortbælte i Shotokan og kan fælde enhver modstander med ét spark -- alligevel har hun to gange tabt kampen mod livløse genstande (en stolpe og en gokart), begge gange med sine briller som tabsoffer. Snart venter hendes hidtil sværeste modstander -- og den sover allerede tættest på hendes hjerte om natten.",
      // Gemmested-forslag: ved skabet eller natbordet.
      kode: "6",
      hint: "4. dan + 2 ødelagte briller = ?",
    },
    {
      id: 6,
      rum: "Stue (2. sted)",
      titel: "Sagen om tilskuerskrækken",
      tekst: "Mistænkte spillede engang lovende håndbold -- lige indtil nogen så på. Nu lever hun under konstant overvågning af to meget kritiske tilskuere med kodenavnene ruhtra og aihpos, som følger hende overalt fra samme hjørne, hvor familiens legetøj samler støv mellem brug.",
      // Gemmested-forslag: ved en fotoramme eller legetøjskurv.
      kode: "AS4",
      hint: "A for Arthur, S for Sophia, og 1 + 3 år tilsammen.",
    },
    {
      id: 7,
      rum: "Entré/kontor",
      titel: "Sagen om den ufuldendte joke",
      tekst: "Mistænkte er nyudklækket cand.it. og elsker en god joke, men når sjældent pointen. Sidst kendte citat, efter at have væltet et glas mælk ud over bordet: 'Jeg er altid så uheldig.' Spor ham til stedet, hvor kablerne samler sig, og hele husets internet holdes i live.",
      // Gemmested-forslag: ved en laptop eller router.
      kode: "52",
      hint: "25 baglæns.",
    },
    {
      id: 8,
      rum: "Soveværelse/altan",
      titel: "Sagen om den mest reparerede mistænkte",
      tekst: "Mistænkte er under oplæring i at passe kærligt på andre mennesker -- hvilket er belejligt, for hun selv er familiens mest reparerede medlem med flere operationer end de fleste. På skadestuen er hun kendt for én ting: hun tåler overhovedet ikke morfin. Spor sagen til stedet, hvor hun bruger flest minutter foran spejlet, inden hun stormer ud for at erobre dagen.",
      // Gemmested-forslag: ved et spejl eller vindueskarm.
      kode: "21",
      hint: "17 år + 4 søskende = ?",
    },
  ];

  var FINALE = {
    id: 9,
    titel: "Sagen er ved at være opklaret",
    tekst: "I har fulgt sporet gennem hele lejligheden. Nu mangler kun én ting: koden der binder hele sagen sammen. Hint: det er kælenavnet fra skolegården, plus alderen hun fejrer i dag.",
    kode: "KRØLLE29",
    hint: "Krølle + 29.",
    hilsen: "TILLYKKE! Sagen er hermed officielt opklaret. Og den bedste nyhed af alle: til næste år er I én mere til at fejre den her dag.",
  };

  return { SAGER: SAGER, FINALE: FINALE };
});
