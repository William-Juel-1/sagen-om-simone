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
