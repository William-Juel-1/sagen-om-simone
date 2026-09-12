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
      rum: "Badeværelse",
      titel: "Sagen om vandpigen",
      tekst: "Mistænkte kan ikke gå forbi noget vådt uden at ville lære nogen at flyde. Hun låner gerne andres unger til en tur, som var de hendes egne. Spor hende til stedet i lejligheden, hvor vandet allerede venter.",
      // Gemmested-forslag: ved håndvasken eller badekarret.
      kode: "VANDBABY",
      hint: "Tjek badeværelset. Hun var engang baby-svømningsinstruktør.",
    },
    {
      id: 2,
      rum: "Stue",
      titel: "Sagen om imperiet",
      tekst: "Mistænkte hersker over sit eget lille imperium et sted mellem Aarhus og Randers, hvor han sælger maskiner der bærer redskaber for andre. Hjemme regerer han bedst fra sin egen lænestol.",
      // Gemmested-forslag: ved lænestolen eller reolen i stuen.
      kode: "REDSKAB",
      hint: "Tjek stuen, ved lænestolen. Han sælger redskabsbærere fra sin virksomhed i Hornslet.",
    },
    {
      id: 3,
      rum: "Køkken",
      titel: "Sagen om de tre søskende",
      tekst: "Tre søskende, samme far, tre forskellige fødselsår. Ved køkkenbordet er der altid plads til dem alle -- og deres aldre tilsammen rammer næsten firs.",
      // Gemmested-forslag: ved køkkenbordet eller brødkassen.
      kode: "79",
      hint: "28 + 27 + 24 = ?",
    },
    {
      id: 4,
      rum: "Entré",
      titel: "Sagen om rejsedagbogen",
      tekst: "En rejseglad efterforsker har lagt et spørgsmål tilbage fra sidste tur: hvad hedder Sydeuropas højeste bjerg, og hvor mange meter højt er det (rundet til nærmeste ti)? Sporet ligger, hvor kufferten plejer at stå klar.",
      // Gemmested-forslag: ved kufferten eller skoreolen i entréen.
      kode: "4810",
      hint: "Bjerget er Mont Blanc, ca. 4.810 meter højt.",
    },
    {
      id: 5,
      rum: "Soveværelse",
      titel: "Sagen om nabolandene",
      tekst: "Endnu et spørgsmål fra rejsedagbogen: hvor mange lande grænser op til Frankrig? Svaret findes gemt der, hvor natlys og gode råd om søvn holder til.",
      // Gemmested-forslag: ved natbordet eller sengelampen.
      kode: "8",
      hint: "Belgien, Luxembourg, Tyskland, Schweiz, Italien, Monaco, Spanien og Andorra -- otte i alt.",
    },
  ];

  var FINALE = {
    id: 6,
    titel: "Sagen er ved at være opklaret",
    tekst: "Fem spor er fulgt. Nu mangler kun den sidste kode -- den der samler det hele, og fejrer den det hele startede med.",
    kode: "KROLLE29",
    hint: "Kælenavnet fra skolegården, plus alderen hun fejrer i år.",
    hilsen: "TILLYKKE! Endnu en sag er opklaret -- og endnu en dag fejret med hele familien samlet.",
  };

  return { SAGER: SAGER, FINALE: FINALE };
});
