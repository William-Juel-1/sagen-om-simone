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

test("there are exactly 5 sager", () => {
  assert.strictEqual(SAGER.length, 5);
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

test("sag ids are unique and sequential from 1 to 5", () => {
  const ids = SAGER.map((s) => s.id);
  assert.deepStrictEqual(ids, [1, 2, 3, 4, 5]);
});

test("FINALE has required non-empty fields and id 6", () => {
  const requiredFields = ["id", "titel", "tekst", "kode", "hint", "hilsen"];
  requiredFields.forEach((field) => {
    assert.ok(
      FINALE[field] !== undefined && FINALE[field] !== "",
      "FINALE mangler felt: " + field
    );
  });
  assert.strictEqual(FINALE.id, 6);
});

console.log("gaader.test.js done");
