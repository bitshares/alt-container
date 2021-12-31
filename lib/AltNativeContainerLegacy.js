"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactNative = _interopRequireDefault(require("react-native"));

var _mixinContainer = _interopRequireDefault(require("./mixinContainer"));

var _object = _interopRequireDefault(require("object.assign"));

/*eslint-disable*/

/**
 * AltNativeContainer.
 *
 * @see AltContainer
 */
var AltNativeContainer = _reactNative["default"].createClass((0, _object["default"])({
  displayName: 'AltNativeContainer',
  render: function render() {
    return this.altRender(_reactNative["default"].View);
  }
}, (0, _mixinContainer["default"])(_reactNative["default"])));

var _default = AltNativeContainer;
exports["default"] = _default;