import { parse } from "@babel/core";
import syntaxDecorators from "../lib";

function makeParser(code, options) {
  return () =>
    parse(code, {
      babelrc: false,
      configFile: false,
      plugins: [[syntaxDecorators, options]],
    });
}

describe("'legacy' option", function() {
  test("must be boolean", function() {
    expect(makeParser("", { legacy: "legacy" })).toThrow();
  });

  test.skip("'legacy': false", function() {
    expect(makeParser("({ @dec fn() {} })", { legacy: false })).toThrow();
  });

  test("'legacy': true", function() {
    expect(makeParser("({ @dec fn() {} })", { legacy: true })).not.toThrow();
  });

  test.skip("defaults to 'false'", function() {
    expect(makeParser("({ @dec fn() {} })", {})).toThrow();
  });

  test("it must be true", function() {
    expect(makeParser("", { legacy: false })).toThrow();
  });
});

describe("'decoratorsBeforeExport' option", function() {
  test.skip("must be boolean", function() {
    expect(makeParser("", { decoratorsBeforeExport: "before" })).toThrow();
  });

  test("is incompatible with legacy", function() {
    expect(
      makeParser("", { decoratorsBeforeExport: false, legacy: true }),
    ).toThrow();
  });

  const BEFORE = "@dec export class Foo {}";
  const AFTER = "export @dec class Foo {}";

  // These are skipped
  run(BEFORE, undefined, true);
  run(AFTER, undefined, false);
  run(BEFORE, true, false);
  run(AFTER, true, true);
  run(BEFORE, false, true);
  run(AFTER, false, false);

  function run(code, before, throws) {
    const name =
      (before === undefined ? "default" : before) +
      " - decorators " +
      (code === BEFORE ? "before" : "after") +
      "export";

    test.skip(name, function() {
      const expectTheParser = expect(
        makeParser(code, { decoratorsBeforeExport: before }),
      );
      throws ? expectTheParser.toThrow() : expectTheParser.not.toThrow();
    });
  }
});
