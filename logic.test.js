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
