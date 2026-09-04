# Sagen om Simone — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static, dependency-free web app (deployed to GitHub Pages) that runs a detective-themed birthday escape room for Simone's family: a TV "investigation HQ" screen plus per-team phone screens that check codes, give paid hints, track time, and reveal a finale.

**Architecture:** Three plain HTML pages (`index.html`, `tv.html`, `hold.html`) share two pure data/logic modules (`logic.js`, `gaader.js`) that work both in the browser (as globals) and in Node (via `module.exports`, enabling real unit tests without a test framework). Two thin DOM-glue scripts (`app-hold.js`, `app-tv.js`) render UI and wire up `localStorage` persistence. No backend, no build step, no external dependencies.

**Tech Stack:** Vanilla HTML/CSS/JS. Node.js (already installed, v24) only as the test runner for the pure logic/data modules via `node file.test.js` + the built-in `assert` module. GitHub CLI (`gh`, already authenticated as William-Juel-1) for repo creation and Pages setup.

**Spec:** `docs/superpowers/specs/2026-09-04-simone-fodselsdag-escape-room-design.md`

## Global Constraints

- No build tools, no npm packages, no frontend frameworks, no CDN dependencies -- pure static files (from spec: "ingen backend, ingen eksterne dependencies").
- All player-facing text is Danish.
- Codes are matched case-insensitively with whitespace trimmed (`normalizeCode`).
- Hint penalty is exactly +3 minutes (180000 ms) added to a team's effective elapsed time per hint used (from spec's suggested penalty).
- Each team's progress/timer lives only in that team's own browser `localStorage`, keyed by team number -- no cross-device sync (from spec's "no live-synkronisering").
- Repo `sagen-om-simone` is public (required for free GitHub Pages); user has explicitly accepted this given the content.

---

### Task 1: Project scaffold -- shared theme and landing page

**Files:**
- Create: `style.css`
- Create: `index.html`

**Interfaces:**
- Produces: CSS classes consumed by all later pages -- `.btn`, `.btn-start`, `.btn-hint`, `.case-card`, `.case-room`, `.code-form`, `.feedback`, `.hint-text`, `.stamp`, `.stamp-big`, `.timer`, `.team-header`, `.tv-screen`, `.tv-intro`, `.tv-countdown`, `.tv-ambient`, `.tv-finale`, `.countdown-number`, `.finale-trigger`, `.finale-solved`, `.finale-card`, `.stats`, `.physical-pointer`, `.landing`, `.role-links`, `.app-hold`, `.app-tv`.

- [ ] **Step 1: Write `style.css`**

```css
:root {
  --bg: #0d0d0d;
  --bg-card: #1a1414;
  --accent: #b3261e;
  --accent-bright: #e63946;
  --text: #f2e9dc;
  --text-dim: #b8ab98;
  --border: #3a2a2a;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-height: 100vh;
  background: var(--bg);
  color: var(--text);
  font-family: "Courier New", Courier, monospace;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

h1, h2 {
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.btn {
  display: inline-block;
  background: var(--accent);
  color: var(--text);
  border: 2px solid var(--accent-bright);
  padding: 0.75rem 1.5rem;
  font-family: inherit;
  font-size: 1rem;
  text-decoration: none;
  cursor: pointer;
  border-radius: 4px;
  margin: 0.5rem 0;
  transition: background 0.2s ease;
}

.btn:hover {
  background: var(--accent-bright);
}

.btn-hint {
  background: transparent;
  border-color: var(--text-dim);
  color: var(--text-dim);
}

.landing {
  text-align: center;
  max-width: 480px;
}

.role-links {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.app-hold,
.app-tv {
  width: 100%;
  max-width: 640px;
}

.team-header {
  text-align: center;
  color: var(--accent-bright);
  font-size: 1.2rem;
  margin-bottom: 1rem;
  border-bottom: 1px dashed var(--border);
  padding-bottom: 0.5rem;
}

.timer {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--accent-bright);
}

.case-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 1.5rem;
  position: relative;
}

.case-room {
  color: var(--text-dim);
  text-transform: uppercase;
  font-size: 0.85rem;
  margin-bottom: 0.75rem;
}

.code-form {
  display: flex;
  gap: 0.5rem;
  margin: 1rem 0;
  flex-wrap: wrap;
}

.code-form input {
  flex: 1;
  min-width: 160px;
  background: var(--bg);
  border: 1px solid var(--border);
  color: var(--text);
  padding: 0.6rem;
  font-family: inherit;
  font-size: 1rem;
  border-radius: 4px;
}

.feedback {
  min-height: 1.2rem;
  color: var(--accent-bright);
}

.hint-text {
  color: var(--text-dim);
  font-style: italic;
  border-top: 1px dashed var(--border);
  padding-top: 0.75rem;
  margin-top: 0.75rem;
}

.stamp {
  display: inline-block;
  border: 4px solid var(--accent-bright);
  color: var(--accent-bright);
  padding: 0.5rem 1rem;
  transform: rotate(-4deg);
  font-weight: bold;
  font-size: 1.3rem;
  margin-bottom: 1rem;
}

.stamp-big {
  font-size: 2.5rem;
  padding: 1rem 2rem;
}

.finale-solved,
.finale-card {
  text-align: center;
}

.stats,
.physical-pointer {
  color: var(--text-dim);
  margin-top: 0.75rem;
}

.tv-screen {
  text-align: center;
  max-width: 900px;
}

.tv-intro h1,
.tv-ambient h1,
.tv-finale h1 {
  font-size: 2.5rem;
  color: var(--accent-bright);
}

.countdown-number {
  font-size: 8rem;
  color: var(--accent-bright);
  font-weight: bold;
}

.finale-trigger {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.finale-trigger input {
  background: var(--bg);
  border: 1px solid var(--border);
  color: var(--text);
  padding: 0.6rem;
  font-family: inherit;
  font-size: 1rem;
  border-radius: 4px;
  width: 240px;
}
```

- [ ] **Step 2: Write `index.html`**

```html
<!DOCTYPE html>
<html lang="da">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Sagen om Simone</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <main class="landing">
    <h1>SAGEN OM SIMONE</h1>
    <p>Vælg din rolle for at starte efterforskningen.</p>
    <nav class="role-links">
      <a class="btn" href="tv.html">TV / Efterforskningscentral</a>
      <a class="btn" href="hold.html?team=1">Hold 1</a>
      <a class="btn" href="hold.html?team=2">Hold 2</a>
    </nav>
  </main>
</body>
</html>
```

- [ ] **Step 3: Manually verify in a browser**

Open `index.html` directly in a browser (double-click the file, or `file://` URL). Confirm:
- Dark background with red accent heading "SAGEN OM SIMONE".
- Three buttons stacked vertically: "TV / Efterforskningscentral", "Hold 1", "Hold 2".
- Hovering/inspecting each button's `href` shows `tv.html`, `hold.html?team=1`, `hold.html?team=2` respectively.

- [ ] **Step 4: Commit**

```bash
git add style.css index.html
git commit -m "Add shared detective theme and role-selection landing page"
```

---

### Task 2: Core game logic (pure, unit-tested in Node)

**Files:**
- Create: `logic.js`
- Test: `logic.test.js`

**Interfaces:**
- Produces (global `Logic` in browser, `module.exports` in Node): `HINT_PENALTY_MS` (number), `normalizeCode(input): string`, `checkCode(sag, input): boolean`, `createInitialState(): {startedAt: number|null, solved: number[], hintsUsed: number[]}`, `startState(state): state`, `markSolved(state, sagId): state`, `useHint(state, sagId): state`, `isSolved(state, sagId): boolean`, `allSolved(state, sager): boolean`, `elapsedMs(state, now): number`, `formatDuration(ms): string ("MM:SS")`, `nextUnsolvedIndex(state, sager): number`.
- Consumed by: Task 4 (`app-hold.js`) and Task 5 (`app-tv.js`).

- [ ] **Step 1: Write the failing test file `logic.test.js`**

```js
const assert = require("assert");
const Logic = require("./logic.js");

function test(name, fn) {
  try {
    fn();
    console.log("PASS:", name);
  } catch (e) {
    console.error("FAIL:", name, "-", e.message);
    process.exitCode = 1;
  }
}

test("normalizeCode trims and uppercases", () => {
  assert.strictEqual(Logic.normalizeCode("  banan \n"), "BANAN");
});

test("checkCode matches regardless of case/whitespace", () => {
  const sag = { kode: "banan" };
  assert.strictEqual(Logic.checkCode(sag, " BANAN "), true);
  assert.strictEqual(Logic.checkCode(sag, "banana"), false);
});

test("createInitialState has empty solved/hints and no startedAt", () => {
  const state = Logic.createInitialState();
  assert.deepStrictEqual(state.solved, []);
  assert.deepStrictEqual(state.hintsUsed, []);
  assert.strictEqual(state.startedAt, null);
});

test("startState sets startedAt once", () => {
  let state = Logic.createInitialState();
  state = Logic.startState(state);
  assert.ok(state.startedAt);
  const firstStart = state.startedAt;
  state = Logic.startState(state);
  assert.strictEqual(state.startedAt, firstStart);
});

test("markSolved adds id once, no duplicates", () => {
  let state = Logic.createInitialState();
  state = Logic.markSolved(state, 1);
  state = Logic.markSolved(state, 1);
  assert.deepStrictEqual(state.solved, [1]);
});

test("useHint adds id once, no duplicates", () => {
  let state = Logic.createInitialState();
  state = Logic.useHint(state, 3);
  state = Logic.useHint(state, 3);
  assert.deepStrictEqual(state.hintsUsed, [3]);
});

test("isSolved reflects solved list", () => {
  let state = Logic.createInitialState();
  state = Logic.markSolved(state, 2);
  assert.strictEqual(Logic.isSolved(state, 2), true);
  assert.strictEqual(Logic.isSolved(state, 5), false);
});

test("allSolved is true only when every sag id is solved", () => {
  const sager = [{ id: 1 }, { id: 2 }];
  let state = Logic.createInitialState();
  assert.strictEqual(Logic.allSolved(state, sager), false);
  state = Logic.markSolved(state, 1);
  assert.strictEqual(Logic.allSolved(state, sager), false);
  state = Logic.markSolved(state, 2);
  assert.strictEqual(Logic.allSolved(state, sager), true);
});

test("elapsedMs adds hint penalty on top of real time", () => {
  let state = Logic.createInitialState();
  state.startedAt = 1000;
  state = Logic.useHint(state, 1);
  const elapsed = Logic.elapsedMs(state, 1000 + 5000);
  assert.strictEqual(elapsed, 5000 + Logic.HINT_PENALTY_MS);
});

test("elapsedMs is 0 before start", () => {
  const state = Logic.createInitialState();
  assert.strictEqual(Logic.elapsedMs(state, Date.now()), 0);
});

test("formatDuration formats mm:ss with padding", () => {
  assert.strictEqual(Logic.formatDuration(65000), "01:05");
  assert.strictEqual(Logic.formatDuration(5000), "00:05");
  assert.strictEqual(Logic.formatDuration(3600000), "60:00");
});

test("nextUnsolvedIndex returns first unsolved, or -1 when done", () => {
  const sager = [{ id: 1 }, { id: 2 }, { id: 3 }];
  let state = Logic.createInitialState();
  assert.strictEqual(Logic.nextUnsolvedIndex(state, sager), 0);
  state = Logic.markSolved(state, 1);
  assert.strictEqual(Logic.nextUnsolvedIndex(state, sager), 1);
  state = Logic.markSolved(state, 2);
  state = Logic.markSolved(state, 3);
  assert.strictEqual(Logic.nextUnsolvedIndex(state, sager), -1);
});

console.log("logic.test.js done");
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node logic.test.js`
Expected: an error thrown from `require("./logic.js")` (Cannot find module), non-zero exit.

- [ ] **Step 3: Write `logic.js`**

```js
(function (root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory();
  } else {
    root.Logic = factory();
  }
})(typeof self !== "undefined" ? self : this, function () {
  var HINT_PENALTY_MS = 3 * 60 * 1000;

  function normalizeCode(input) {
    return String(input).trim().toUpperCase();
  }

  function checkCode(sag, input) {
    return normalizeCode(input) === normalizeCode(sag.kode);
  }

  function createInitialState() {
    return {
      startedAt: null,
      solved: [],
      hintsUsed: [],
    };
  }

  function startState(state) {
    if (state.startedAt) return state;
    return Object.assign({}, state, { startedAt: Date.now() });
  }

  function markSolved(state, sagId) {
    if (state.solved.indexOf(sagId) !== -1) return state;
    return Object.assign({}, state, { solved: state.solved.concat(sagId) });
  }

  function useHint(state, sagId) {
    if (state.hintsUsed.indexOf(sagId) !== -1) return state;
    return Object.assign({}, state, { hintsUsed: state.hintsUsed.concat(sagId) });
  }

  function isSolved(state, sagId) {
    return state.solved.indexOf(sagId) !== -1;
  }

  function allSolved(state, sager) {
    return sager.every(function (s) {
      return state.solved.indexOf(s.id) !== -1;
    });
  }

  function elapsedMs(state, now) {
    if (!state.startedAt) return 0;
    var base = now - state.startedAt;
    var penalty = state.hintsUsed.length * HINT_PENALTY_MS;
    return base + penalty;
  }

  function formatDuration(ms) {
    var totalSeconds = Math.max(0, Math.floor(ms / 1000));
    var m = Math.floor(totalSeconds / 60);
    var s = totalSeconds % 60;
    return String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
  }

  function nextUnsolvedIndex(state, sager) {
    for (var i = 0; i < sager.length; i++) {
      if (state.solved.indexOf(sager[i].id) === -1) return i;
    }
    return -1;
  }

  return {
    HINT_PENALTY_MS: HINT_PENALTY_MS,
    normalizeCode: normalizeCode,
    checkCode: checkCode,
    createInitialState: createInitialState,
    startState: startState,
    markSolved: markSolved,
    useHint: useHint,
    isSolved: isSolved,
    allSolved: allSolved,
    elapsedMs: elapsedMs,
    formatDuration: formatDuration,
    nextUnsolvedIndex: nextUnsolvedIndex,
  };
});
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `node logic.test.js`
Expected: 13 lines starting with `PASS:`, then `logic.test.js done`, exit code 0.

- [ ] **Step 5: Commit**

```bash
git add logic.js logic.test.js
git commit -m "Add pure game-state logic with Node unit tests"
```

---

### Task 3: Puzzle content (gaader.js) -- the 8 cases + finale

**Files:**
- Create: `gaader.js`
- Test: `gaader.test.js`

**Interfaces:**
- Produces (global `Gaader` in browser, `module.exports` in Node): `SAGER` -- array of 8 objects `{id, rum, titel, tekst, kode, hint}`; `FINALE` -- object `{id: 9, titel, tekst, kode, hint, hilsen, fysiskHenvisning}`.
- Consumed by: Task 4 (`app-hold.js`) and Task 5 (`app-tv.js`).
- Consumes: nothing (pure data).

- [ ] **Step 1: Write the failing test file `gaader.test.js`**

```js
const assert = require("assert");
const { SAGER, FINALE } = require("./gaader.js");

function test(name, fn) {
  try {
    fn();
    console.log("PASS:", name);
  } catch (e) {
    console.error("FAIL:", name, "-", e.message);
    process.exitCode = 1;
  }
}

test("there are exactly 8 sager", () => {
  assert.strictEqual(SAGER.length, 8);
});

test("every sag has required non-empty fields", () => {
  const requiredFields = ["id", "rum", "titel", "tekst", "kode", "hint"];
  SAGER.forEach((sag) => {
    requiredFields.forEach((field) => {
      assert.ok(
        sag[field] !== undefined && sag[field] !== "",
        "sag " + sag.id + " mangler felt: " + field
      );
    });
  });
});

test("sag ids are unique and sequential from 1 to 8", () => {
  const ids = SAGER.map((s) => s.id);
  assert.deepStrictEqual(ids, [1, 2, 3, 4, 5, 6, 7, 8]);
});

test("FINALE has required non-empty fields and id 9", () => {
  const requiredFields = ["id", "titel", "tekst", "kode", "hint", "hilsen", "fysiskHenvisning"];
  requiredFields.forEach((field) => {
    assert.ok(
      FINALE[field] !== undefined && FINALE[field] !== "",
      "FINALE mangler felt: " + field
    );
  });
  assert.strictEqual(FINALE.id, 9);
});

console.log("gaader.test.js done");
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node gaader.test.js`
Expected: an error thrown from `require("./gaader.js")` (Cannot find module), non-zero exit.

- [ ] **Step 3: Write `gaader.js`**

```js
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
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `node gaader.test.js`
Expected: 4 lines starting with `PASS:`, then `gaader.test.js done`, exit code 0.

- [ ] **Step 5: Commit**

```bash
git add gaader.js gaader.test.js
git commit -m "Add the 8 case riddles and finale content"
```

---

### Task 4: Hold (team) page

**Files:**
- Create: `hold.html`
- Create: `app-hold.js`

**Interfaces:**
- Consumes: `Logic.*` (Task 2), `Gaader.SAGER` / `Gaader.FINALE` (Task 3), CSS classes from Task 1.
- Produces: nothing consumed by later tasks (leaf page).

- [ ] **Step 1: Write `hold.html`**

```html
<!DOCTYPE html>
<html lang="da">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Sagen om Simone — Hold</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <main id="app" class="app-hold"></main>
  <script src="logic.js"></script>
  <script src="gaader.js"></script>
  <script src="app-hold.js"></script>
</body>
</html>
```

- [ ] **Step 2: Write `app-hold.js`**

```js
(function () {
  var params = new URLSearchParams(window.location.search);
  var team = params.get("team");
  var teamLabel = team === "2" ? "Hold 2" : "Hold 1";
  var storageKey = "sagen-om-simone:team:" + (team === "2" ? "2" : "1");

  var root = document.getElementById("app");
  var state = loadState();
  var timerInterval = null;

  function loadState() {
    var raw = localStorage.getItem(storageKey);
    if (!raw) return Logic.createInitialState();
    try {
      return JSON.parse(raw);
    } catch (e) {
      return Logic.createInitialState();
    }
  }

  function saveState(newState) {
    state = newState;
    localStorage.setItem(storageKey, JSON.stringify(state));
  }

  function render() {
    root.innerHTML = "";

    var header = document.createElement("div");
    header.className = "team-header";
    header.textContent = teamLabel;
    root.appendChild(header);

    if (!state.startedAt) {
      renderStartScreen();
      return;
    }

    var timerEl = document.createElement("div");
    timerEl.className = "timer";
    timerEl.id = "timer";
    root.appendChild(timerEl);
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
    updateTimer();

    if (!Logic.allSolved(state, Gaader.SAGER)) {
      var idx = Logic.nextUnsolvedIndex(state, Gaader.SAGER);
      renderSag(Gaader.SAGER[idx]);
    } else if (!Logic.isSolved(state, Gaader.FINALE.id)) {
      renderFinalePrompt();
    } else {
      renderFinaleScreen();
    }
  }

  function updateTimer() {
    var timerEl = document.getElementById("timer");
    if (!timerEl) return;
    timerEl.textContent = Logic.formatDuration(Logic.elapsedMs(state, Date.now()));
  }

  function renderStartScreen() {
    var btn = document.createElement("button");
    btn.className = "btn btn-start";
    btn.textContent = "Start efterforskningen";
    btn.addEventListener("click", function () {
      saveState(Logic.startState(state));
      render();
    });
    root.appendChild(btn);
  }

  function renderCodeForm(sag, onCorrect) {
    var form = document.createElement("form");
    form.className = "code-form";

    var input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Indtast koden";
    input.autocomplete = "off";
    form.appendChild(input);

    var submit = document.createElement("button");
    submit.type = "submit";
    submit.className = "btn";
    submit.textContent = "Løs sagen";
    form.appendChild(submit);

    var feedback = document.createElement("div");
    feedback.className = "feedback";

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (Logic.checkCode(sag, input.value)) {
        onCorrect();
      } else {
        feedback.textContent = "Forkert kode — prøv igen.";
        input.value = "";
        input.focus();
      }
    });

    return { form: form, feedback: feedback };
  }

  function renderHintBlock(sag) {
    var hintUsed = state.hintsUsed.indexOf(sag.id) !== -1;
    if (hintUsed) {
      var hintText = document.createElement("p");
      hintText.className = "hint-text";
      hintText.textContent = "Hint: " + sag.hint;
      return hintText;
    }
    var hintBtn = document.createElement("button");
    hintBtn.className = "btn btn-hint";
    hintBtn.textContent = "Få hint (+3 min)";
    hintBtn.addEventListener("click", function () {
      saveState(Logic.useHint(state, sag.id));
      render();
    });
    return hintBtn;
  }

  function renderSag(sag) {
    var card = document.createElement("div");
    card.className = "case-card";

    var titel = document.createElement("h2");
    titel.textContent = "Sag " + sag.id + ": " + sag.titel;
    card.appendChild(titel);

    var rum = document.createElement("div");
    rum.className = "case-room";
    rum.textContent = sag.rum;
    card.appendChild(rum);

    var tekst = document.createElement("p");
    tekst.textContent = sag.tekst;
    card.appendChild(tekst);

    var codeParts = renderCodeForm(sag, function () {
      saveState(Logic.markSolved(state, sag.id));
      render();
    });
    card.appendChild(codeParts.form);
    card.appendChild(codeParts.feedback);
    card.appendChild(renderHintBlock(sag));

    root.appendChild(card);
  }

  function renderFinalePrompt() {
    var sag = Gaader.FINALE;
    var card = document.createElement("div");
    card.className = "case-card finale-card";

    var titel = document.createElement("h2");
    titel.textContent = sag.titel;
    card.appendChild(titel);

    var tekst = document.createElement("p");
    tekst.textContent = sag.tekst;
    card.appendChild(tekst);

    var codeParts = renderCodeForm(sag, function () {
      saveState(Logic.markSolved(state, sag.id));
      render();
    });
    codeParts.form.querySelector("button").textContent = "Opklar sagen";
    card.appendChild(codeParts.form);
    card.appendChild(codeParts.feedback);
    card.appendChild(renderHintBlock(sag));

    root.appendChild(card);
  }

  function renderFinaleScreen() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
    var card = document.createElement("div");
    card.className = "case-card finale-solved";

    var stamp = document.createElement("div");
    stamp.className = "stamp";
    stamp.textContent = "SAGEN ER OPKLARET";
    card.appendChild(stamp);

    var hilsen = document.createElement("p");
    hilsen.textContent = Gaader.FINALE.hilsen;
    card.appendChild(hilsen);

    var stats = document.createElement("p");
    stats.className = "stats";
    var hintCount = state.hintsUsed.length;
    stats.textContent =
      "Samlet tid: " +
      Logic.formatDuration(Logic.elapsedMs(state, Date.now())) +
      " (inkl. " + hintCount + (hintCount === 1 ? " hint" : " hints") + ")";
    card.appendChild(stats);

    var henvisning = document.createElement("p");
    henvisning.className = "physical-pointer";
    henvisning.textContent = Gaader.FINALE.fysiskHenvisning;
    card.appendChild(henvisning);

    root.appendChild(card);
  }

  render();
})();
```

- [ ] **Step 3: Manually verify in a browser**

Open `hold.html?team=1` in one browser tab and `hold.html?team=2` in another. For each tab, in order:
1. Click "Start efterforskningen" — a timer appears at `00:00` and starts counting up.
2. On Sag 1, type a wrong code (e.g. `xxx`) — see "Forkert kode — prøv igen." and the input clears.
3. Type `essak` (lowercase, extra spaces) — the card advances to Sag 2 (case-insensitive/trim match confirmed).
4. On Sag 2, click "Få hint (+3 min)" — the button is replaced by the hint text, and the visible timer jumps forward by 3 minutes worth of seconds within the next tick.
5. Solve Sag 2 with `BANAN`, then reload the page — progress and timer are preserved (Sag 3 shown, timer continues from where it was, not reset).
6. Solve sager 3-8 with codes `35`, `TØSEDRENG`, `6`, `AS4`, `52`, `21` — the finale prompt appears after Sag 8.
7. Solve the finale with `KROLLE29` — the "SAGEN ER OPKLARET" screen appears with the birthday message, total time including hint penalty, and the fridge pointer text. The timer stops updating.
8. Confirm Hold 1 and Hold 2 tabs have fully independent progress/timers throughout (different `localStorage` keys).

- [ ] **Step 4: Commit**

```bash
git add hold.html app-hold.js
git commit -m "Add team play screen with codes, hints, timer, and finale"
```

---

### Task 5: TV (Investigation HQ) page

**Files:**
- Create: `tv.html`
- Create: `app-tv.js`

**Interfaces:**
- Consumes: `Logic.checkCode` (Task 2), `Gaader.FINALE` (Task 3), CSS classes from Task 1.
- Produces: nothing consumed by later tasks (leaf page).

- [ ] **Step 1: Write `tv.html`**

```html
<!DOCTYPE html>
<html lang="da">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Sagen om Simone — TV</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <main id="app" class="app-tv"></main>
  <script src="logic.js"></script>
  <script src="gaader.js"></script>
  <script src="app-tv.js"></script>
</body>
</html>
```

- [ ] **Step 2: Write `app-tv.js`**

```js
(function () {
  var root = document.getElementById("app");
  var phase = "intro"; // intro -> countdown -> ambient -> finale

  function render() {
    root.innerHTML = "";
    if (phase === "intro") renderIntro();
    else if (phase === "countdown") renderCountdown();
    else if (phase === "ambient") renderAmbient();
    else if (phase === "finale") renderFinale();
  }

  function renderIntro() {
    var wrap = document.createElement("div");
    wrap.className = "tv-screen tv-intro";

    var title = document.createElement("h1");
    title.textContent = "SAGEN OM SIMONES 29 ÅR";
    wrap.appendChild(title);

    var sub = document.createElement("p");
    sub.textContent = "To hold. Otte sager. Én fødselsdagsgave, der venter på at blive fundet.";
    wrap.appendChild(sub);

    var btn = document.createElement("button");
    btn.className = "btn btn-start";
    btn.textContent = "Start nedtælling";
    btn.addEventListener("click", function () {
      phase = "countdown";
      render();
    });
    wrap.appendChild(btn);

    root.appendChild(wrap);
  }

  function renderCountdown() {
    var wrap = document.createElement("div");
    wrap.className = "tv-screen tv-countdown";
    var count = document.createElement("div");
    count.className = "countdown-number";
    wrap.appendChild(count);
    root.appendChild(wrap);

    var secondsLeft = 10;
    count.textContent = String(secondsLeft);
    var interval = setInterval(function () {
      secondsLeft -= 1;
      if (secondsLeft <= 0) {
        clearInterval(interval);
        phase = "ambient";
        render();
        return;
      }
      count.textContent = String(secondsLeft);
    }, 1000);
  }

  function renderAmbient() {
    var wrap = document.createElement("div");
    wrap.className = "tv-screen tv-ambient";

    var title = document.createElement("h1");
    title.textContent = "EFTERFORSKNINGEN ER I GANG";
    wrap.appendChild(title);

    var sub = document.createElement("p");
    sub.textContent = "Begge hold er ude i lejligheden. God jagt.";
    wrap.appendChild(sub);

    var finaleBox = document.createElement("form");
    finaleBox.className = "finale-trigger";

    var label = document.createElement("label");
    label.textContent = "Når et hold har opklaret sagen, indtast den sidste kode her:";
    finaleBox.appendChild(label);

    var input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Sidste kode";
    input.autocomplete = "off";
    finaleBox.appendChild(input);

    var submit = document.createElement("button");
    submit.type = "submit";
    submit.className = "btn";
    submit.textContent = "Opklar sagen for familien";
    finaleBox.appendChild(submit);

    var feedback = document.createElement("div");
    feedback.className = "feedback";
    finaleBox.appendChild(feedback);

    finaleBox.addEventListener("submit", function (e) {
      e.preventDefault();
      if (Logic.checkCode(Gaader.FINALE, input.value)) {
        phase = "finale";
        render();
      } else {
        feedback.textContent = "Forkert kode — prøv igen.";
        input.value = "";
      }
    });

    wrap.appendChild(finaleBox);
    root.appendChild(wrap);
  }

  function renderFinale() {
    var wrap = document.createElement("div");
    wrap.className = "tv-screen tv-finale";

    var stamp = document.createElement("div");
    stamp.className = "stamp stamp-big";
    stamp.textContent = "SAGEN ER OPKLARET";
    wrap.appendChild(stamp);

    var hilsen = document.createElement("h1");
    hilsen.textContent = Gaader.FINALE.hilsen;
    wrap.appendChild(hilsen);

    root.appendChild(wrap);
  }

  render();
})();
```

- [ ] **Step 3: Manually verify in a browser**

Open `tv.html`. In order:
1. Confirm the intro screen shows the title and a "Start nedtælling" button.
2. Click it — a large countdown runs from 10 to 1 and then automatically switches to the ambient "EFTERFORSKNINGEN ER I GANG" screen.
3. On the ambient screen, submit a wrong code in the finale box — see "Forkert kode — prøv igen."
4. Submit `krolle29` (lowercase) — the screen switches to the big "SAGEN ER OPKLARET" stamp with the birthday message.

- [ ] **Step 4: Commit**

```bash
git add tv.html app-tv.js
git commit -m "Add TV investigation-HQ screen with countdown and finale trigger"
```

---

### Task 6: Deploy to GitHub Pages

**Files:**
- None created/modified (repo operations only).

**Interfaces:**
- Consumes: the complete static site from Tasks 1-5.

- [ ] **Step 1: Rename the local branch to `main`**

```powershell
git branch -M main
```

- [ ] **Step 2: Create the GitHub repo from the existing local repo and push**

```powershell
gh repo create sagen-om-simone --public --source=. --remote=origin --push
```

Expected: prints the new repo URL (`https://github.com/William-Juel-1/sagen-om-simone`) and pushes `main`.

- [ ] **Step 3: Enable GitHub Pages from the `main` branch root**

```powershell
$owner = (gh api user --jq .login)
'{"source":{"branch":"main","path":"/"}}' | gh api "repos/$owner/sagen-om-simone/pages" -X POST --input -
```

Expected: JSON response describing the new Pages site, including a `"html_url"` field.

- [ ] **Step 4: Verify the live site**

Wait about a minute for the first Pages build, then open the `html_url` from Step 3 (typically `https://william-juel-1.github.io/sagen-om-simone/`) in a browser and confirm the same landing page from Task 1's manual check renders correctly. Share this URL (or the `hold.html?team=1` / `hold.html?team=2` variants) to the two teams' phones, and open the base URL on the TV's browser.

---

## Self-review notes

- **Spec coverage:** architecture/files (Task 1, 4, 5), 8 sager + finale content (Task 3), hold mechanics: start/timer/hints/persistence/finale (Task 4), TV mechanics: intro/countdown/ambient/finale trigger (Task 5), visual theme (Task 1's `style.css`), deployment (Task 6). All spec sections are covered.
- **Placeholder scan:** no TBD/TODO; the one placeholder found during spec review (Task 1's case-1 code) was already resolved to `ESSAK` before this plan was written.
- **Type/name consistency:** `Logic` and `Gaader` globals are named identically everywhere they are referenced (Tasks 4 and 5); `state` shape (`startedAt`, `solved`, `hintsUsed`) is produced by `logic.js` in Task 2 and consumed unchanged by `app-hold.js` in Task 4.
