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
      kode: "VANDHUND",
      hint: "Tjek badeværelset. Hun var engang baby-svømningsinstruktør.",
    },
    {
      id: 2,
      rum: "Stue",
      titel: "Sagen om imperiet",
      tekst: "Mistænkte hersker over sit eget lille imperium et sted mellem Aarhus og Randers, hvor der bliver solgt multi-maskiner. Hjemme regerer han bedst fra sin sofa.",
      // Gemmested-forslag: et bevis lagt nede i sofaen (mellem puderne/i sædet).
      kode: "ELITE SERVICE",
      hint: "Tjek sofaen i stuen. Virksomheden hedder Elite Service.",
    },
    {
      id: 3,
      rum: "Køkken",
      titel: "Sagen om de tre søskende",
      tekst: "Tre søskende, samme far, tre forskellige fødselsår. I Hersom er der altid plads til dem alle -- og deres aldre tilsammen rammer?",
      // Gemmested-forslag: ved køkkenbordet eller brødkassen.
      kode: "79",
      hint: "28 + 27 + 24 = ?",
    },
    {
      id: 4,
      rum: "Entré",
      titel: "Sagen om rejsedagbogen",
      tekst: "En rejseglad efterforsker har lagt et spørgsmål tilbage fra sidste tur: hvad hedder Sydeuropas højeste bjerg, og hvor mange meter højt er det (rundet til nærmeste tier)? Sporet ligger, hvor de flestes dags-rejser plejer at starte.",
      // Gemmested-forslag: ved skoreolen/entrémøblet -- der hvor man tager sko på for at gå ud ad døren.
      kode: "4810",
      hint: "Fem kandidater fra rejsedagbogen: Mont Blanc (4.810 m), Monte Rosa (4.634 m), Gran Paradiso (4.061 m), Mulhacén (3.479 m), Olympen (2.917 m). Den højeste af dem er svaret.",
    },
    {
      id: 5,
      rum: "Soveværelse",
      titel: "Sagen om nabolandene",
      tekst: "Mistænkte hviler bedst under et dundyne et sted, hvor børnebøgerne om en rødhåret pige med overmenneskelig styrke, og en dreng fra Lønneberg, stadig står på reolen. Hvor mange nabolande deler dette land en landegrænse med?",
      // Gemmested-forslag: den rigtige Astrid Lindgren-bog på bogreolen i soveværelset -- intet kort nødvendigt, bogen ER beviset.
      kode: "2",
      hint: "Det er Sverige (tænk på Astrid Lindgren på bogreolen). Sverige grænser op til Norge og Finland -- 2 lande.",
    },
  ];

  var FINALE = {
    id: 6,
    titel: "Sagen er ved at være opklaret",
    tekst: "Fem spor er fulgt. Nu mangler kun den sidste kode -- kælenavnet hun fik på grund af sit hår, tallet for hendes bælte-grad, og alderen hun fejrer i år, skrevet i træk uden mellemrum.",
    kode: "KRØLLE429",
    hint: "Kælenavnet (krøllet hår) + 4 (hendes dan-grad) + 29 (alderen), skrevet i træk: KROLLE429.",
    hilsen: "TILLYKKE! Endnu en sag er opklaret -- og endnu en dag fejret med hele familien samlet.",
  };

  return { SAGER: SAGER, FINALE: FINALE };
});
