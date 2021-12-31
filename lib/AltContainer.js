"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _object = _interopRequireDefault(require("object.assign"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var id = function id(it) {
  return it;
};

var getStateFromStore = function getStateFromStore(store, props) {
  return typeof store === 'function' ? store(props).value : store.getState();
};

var getStateFromKey = function getStateFromKey(actions, props) {
  return typeof actions === 'function' ? actions(props) : actions;
};

var getStateFromActions = function getStateFromActions(props) {
  if (props.actions) {
    return getStateFromKey(props.actions, props);
  } else {
    return {};
  }
};

var getInjected = function getInjected(props) {
  if (props.inject) {
    return Object.keys(props.inject).reduce(function (obj, key) {
      obj[key] = getStateFromKey(props.inject[key], props);
      return obj;
    }, {});
  } else {
    return {};
  }
};

var reduceState = function reduceState(props) {
  return (0, _object["default"])({}, getStateFromStores(props), getStateFromActions(props), getInjected(props));
};

var getStateFromStores = function getStateFromStores(props) {
  var stores = props.stores;

  if (props.store) {
    return getStateFromStore(props.store, props);
  } else if (props.stores) {
    // If you pass in an array of stores then we are just listening to them
    // it should be an object then the state is added to the key specified
    if (!Array.isArray(stores)) {
      return Object.keys(stores).reduce(function (obj, key) {
        obj[key] = getStateFromStore(stores[key], props);
        return obj;
      }, {});
    }
  } else {
    return {};
  }
}; // TODO need to copy some other contextTypes maybe?
// what about propTypes?


var AltContainer = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(AltContainer, _React$Component);

  var _super = _createSuper(AltContainer);

  function AltContainer(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, AltContainer);
    _this = _super.call(this, props);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "altSetState", function () {
      _this.setState(reduceState(_this.props));
    });

    if (props.stores && props.store) {
      throw new ReferenceError('Cannot define both store and stores');
    }

    _this.state = reduceState(props);
    return _this;
  }

  (0, _createClass2["default"])(AltContainer, [{
    key: "getChildContext",
    value: function getChildContext() {
      var flux = this.props.flux || this.context.flux;
      return flux ? {
        flux: flux
      } : {};
    }
  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      this._destroySubscriptions();

      this.setState(reduceState(nextProps));

      this._registerStores(nextProps);

      if (this.props.onWillReceiveProps) {
        this.props.onWillReceiveProps(nextProps, this.props, this.context);
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this._registerStores(this.props);

      if (this.props.onMount) this.props.onMount(this.props, this.context);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._destroySubscriptions();

      if (this.props.onWillUnmount) {
        this.props.onWillUnmount(this.props, this.context);
      }
    }
  }, {
    key: "_registerStores",
    value: function _registerStores(props) {
      var _this2 = this;

      var stores = props.stores;

      if (props.store) {
        this._addSubscription(props.store);
      } else if (props.stores) {
        if (Array.isArray(stores)) {
          stores.forEach(function (store) {
            return _this2._addSubscription(store);
          });
        } else {
          Object.keys(stores).forEach(function (formatter) {
            _this2._addSubscription(stores[formatter]);
          });
        }
      }
    }
  }, {
    key: "_destroySubscriptions",
    value: function _destroySubscriptions() {
      var _this3 = this;

      var stores = this.props.stores;
      stores && stores.forEach(function (store) {
        return store.unlisten(_this3.altSetState);
      });
    }
  }, {
    key: "_addSubscription",
    value: function _addSubscription(getStore) {
      var store = typeof getStore === 'function' ? getStore(this.props).store : getStore; // console.log("add: ", store['listen'])

      store.listen(this.altSetState);
    }
  }, {
    key: "getProps",
    value: function getProps() {
      var flux = this.props.flux || this.context.flux;
      var transform = typeof this.props.transform === 'function' ? this.props.transform : id;
      return transform((0, _object["default"])(flux ? {
        flux: flux
      } : {}, this.state));
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return this.props.shouldComponentUpdate ? this.props.shouldComponentUpdate(this.getProps(), nextProps, nextState) : true;
    }
  }, {
    key: "componentDidCatch",
    value: function componentDidCatch(error, errorInfo) {
      console.log(error, errorInfo);
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var Node = 'div';
      var children = this.props.children; // Custom rendering function

      if (typeof this.props.render === 'function') {
        return this.props.render(this.getProps());
      } else if (this.props.component) {
        return /*#__PURE__*/_react["default"].createElement(this.props.component, this.getProps());
      } // Does not wrap child in a div if we don't have to.


      if (Array.isArray(children)) {
        return /*#__PURE__*/_react["default"].createElement(Node, null, children.map(function (child, i) {
          return /*#__PURE__*/_react["default"].cloneElement(child, (0, _object["default"])({
            key: i
          }, _this4.getProps()));
        }));
      } else if (children) {
        return /*#__PURE__*/_react["default"].cloneElement(children, this.getProps());
      } else {
        return /*#__PURE__*/_react["default"].createElement(Node, this.getProps());
      }
    }
  }]);
  return AltContainer;
}(_react["default"].Component);

(0, _defineProperty2["default"])(AltContainer, "contextTypes", {
  flux: _propTypes["default"].object
});
(0, _defineProperty2["default"])(AltContainer, "childContextTypes", {
  flux: _propTypes["default"].object
});
var _default = AltContainer;
exports["default"] = _default;