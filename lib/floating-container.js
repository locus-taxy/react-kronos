"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("@floating-ui/react-dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const FloatingContainer = ({
  children
}) => {
  const {
    x,
    y,
    reference,
    floating,
    strategy
  } = (0, _reactDom.useFloating)({
    middleware: [(0, _reactDom.flip)()],
    placement: 'bottom-start',
    whileElementsMounted: _reactDom.autoUpdate
  });
  return children({
    x,
    y,
    reference,
    floating,
    strategy
  });
};

var _default = FloatingContainer;
exports.default = _default;