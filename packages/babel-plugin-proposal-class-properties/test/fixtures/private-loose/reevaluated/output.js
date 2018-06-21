function classFactory() {
  var _bar, _foo;

  var Foo = function Foo() {
    babelHelpers.classCallCheck(this, Foo);
    Object.defineProperty(this, _foo, {
      writable: true,
      value: "foo"
    });
  };

  _bar = babelHelpers.classPrivateFieldKey("bar");
  Object.defineProperty(Foo, _bar, {
    writable: true,
    value: "bar"
  });
  _foo = babelHelpers.classPrivateFieldKey("foo");
}
