export default (param => {
  var _props, _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function () {
    function App() {
      babelHelpers.classCallCheck(this, App);
    }

    babelHelpers.createClass(App, [{
      key: "getParam",
      value: function getParam() {
        return param;
      }
    }]);
    return App;
  }(), _props = babelHelpers.classPrivateFieldKey("props"), Object.defineProperty(_class, _props, {
    writable: true,
    value: {
      prop1: 'prop1',
      prop2: 'prop2'
    }
  }), _temp;
});
