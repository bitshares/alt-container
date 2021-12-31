"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactNative = _interopRequireDefault(require("react-native"));

var _mixinContainer = _interopRequireDefault(require("./mixinContainer"));

var _object = _interopRequireDefault(require("object.assign"));

var _createReactClass = _interopRequireDefault(require("create-react-class"));

/*eslint-disable*/

/**
 * AltNativeContainer.
 *
 * @see AltContainer
 */
_reactNative["default"].cre;
var AltNativeContainer = (0, _createReactClass["default"])((0, _object["default"])({
  displayName: 'AltNativeContainer',
  mixins: [(0, _mixinContainer["default"])(_reactNative["default"])],
  render: function render() {
    return this.altRender(_reactNative["default"].View);
  }
}));
var _default = AltNativeContainer;
exports["default"] = _default;