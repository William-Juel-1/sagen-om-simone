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
      tekst: "Vidne nr. 1 rapporterer: Der har stået en flyttekasse i denne entré så længe, at den er begyndt at samle støv af arkæologisk værdi. Find den sidste rest af flytningen, der aldrig blev pakket helt ud.",
      // Gemmested-forslag: en flyttekasse eller kort ved entrémøblet.
      kode: "ESSAK",
      hint: "Beviset er mærket med et ord for det du pakker flyttegods i -- men skrevet bagfra.",
    },
    {
      id: 2,
      rum: "Stue",
      titel: "Sagen om det forsvundne kunstværk",
      tekst: "Et 'uvurderligt kunstværk' er forsvundet fra Kunsthal Aarhus' samling. Mistænkte hævder det blot var en banan tapet til væggen -- men Kunsthallens egen Online Manager ved bedre.",
      // Gemmested-forslag: bag en plakat/billedramme i stuen.
      kode: "BANAN",
      hint: "Tænk på den gule frugt, der engang solgte for en formue som 'kunst'.",
    },
    {
      id: 3,
      rum: "Køkken",
      titel: "Sagen om borddanseren",
      tekst: "Mistænkte har opdraget fire individer til at overleve barndommen uden at miste sin sans for humor. Til gengæld er festivalens borde aldrig helt sikre, når hun finder rytmen. Læg antallet af hendes børn sammen med den dag i juli hun selv blev født.",
      // Gemmested-forslag: ved kaffemaskinen eller krydderihylden.
      kode: "35",
      hint: "4 børn + fødselsdag den 31. = ?",
    },
    {
      id: 4,
      rum: "Badeværelse",
      titel: "Sagen om det vandtætte alibi",
      tekst: "Mistænkte hævder at være hærdet af utallige fugleture med drengene hver lørdag. Ingen har nogensinde set et foto af en fugl -- kun tomme øl-dåser og ét lille glas, der åbenbart er nok til at gøre ham mistænkeligt 'tøset'.",
      // Gemmested-forslag: ved en gummiand (fugl-ordspil).
      kode: "TØSEDRENG",
      hint: "Hvad kalder man en mand der bliver blød i knæene af ét snapseglas?",
    },
    {
      id: 5,
      rum: "Soveværelse",
      titel: "Sagen om den ukuelige sortbælte",
      tekst: "Mistænkte er 4. dans sortbælte i Shotokan og kan fælde enhver modstander med ét spark -- alligevel har hun to gange tabt kampen mod livløse genstande (en stolpe og en gokart), begge gange med sine briller som tabsoffer. Læg hendes dan-grad sammen med antallet af ødelagte brilleglas.",
      // Gemmested-forslag: ved skabet eller natbordet.
      kode: "6",
      hint: "4. dan + 2 ødelagte briller = ?",
    },
    {
      id: 6,
      rum: "Stue (2. sted)",
      titel: "Sagen om tilskuerskrækken",
      tekst: "Mistænkte spillede engang lovende håndbold -- lige indtil nogen så på hende. Nu lever hun under konstant overvågning af to meget kritiske tilskuere med kodenavnene Arthur og Sophia. Kombiner de to tilskueres forbogstaver med deres samlede alder.",
      // Gemmested-forslag: ved en fotoramme eller legetøjskurv.
      kode: "AS4",
      hint: "A for Arthur, S for Sophia, og 1 + 3 år tilsammen.",
    },
    {
      id: 7,
      rum: "Entré/kontor",
      titel: "Sagen om den ufuldendte joke",
      tekst: "Mistænkte er nyudklækket cand.it. og elsker en god joke, men når sjældent pointen. Sidst kendte citat, efter at have væltet et glas mælk ud over bordet: 'Jeg er altid så uheldig.' Til efteråret fylder han 25 -- skriv det tal bagfra.",
      // Gemmested-forslag: ved en laptop eller router.
      kode: "52",
      hint: "25 baglæns.",
    },
    {
      id: 8,
      rum: "Soveværelse/altan",
      titel: "Sagen om den mest reparerede mistænkte",
      tekst: "Mistænkte er under oplæring i at passe kærligt på andre mennesker -- hvilket er belejligt, for hun selv er familiens mest reparerede medlem med flere operationer end de fleste. På skadestuen er hun kendt for én ting: hun tåler overhovedet ikke morfin. Læg hendes alder sammen med antallet af søskende i familien.",
      // Gemmested-forslag: ved et spejl eller vindueskarm.
      kode: "21",
      hint: "17 år + 4 søskende = ?",
    },
  ];

  var FINALE = {
    id: 9,
    titel: "Sagen er ved at være opklaret",
    tekst: "I har fulgt sporet gennem hele lejligheden. Nu mangler kun én ting: koden der binder hele sagen sammen. Hint: det er kælenavnet fra skolegården, plus alderen hun fejrer i dag.",
    kode: "KROLLE29",
    hint: "Krølle + 29.",
    hilsen: "TILLYKKE SIMONE! Sagen er hermed officielt opklaret. Og den bedste nyhed af alle: til næste år er I én mere til at fejre den her dag.",
    fysiskHenvisning: "Gå ud i køkkenet og tjek køleskabet -- der venter noget sødt.",
  };

  return { SAGER: SAGER, FINALE: FINALE };
});
