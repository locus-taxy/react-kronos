"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createStyledComponent;

var _react = _interopRequireDefault(require("react"));

var _jss = _interopRequireDefault(require("jss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function createStyledComponent(Component, rules, options) {
  function attach(rules, options) {
    return _jss.default.createStyleSheet(rules, options).attach();
  }

  function makeUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      let r = Math.random() * 16 | 0;
      let v = c === 'x' ? r : r & 0x3 | 0x8;
      return v.toString(16);
    });
  }

  class StyledComponent extends _react.default.Component {
    componentWillMount() {
      let uuid = this.props.instance ? this.props.instance : makeUUID();

      let _rules = typeof rules === 'function' ? rules(this.props, uuid) : rules;

      let _options = typeof options === 'function' ? options(this.props, uuid) : options;

      this.sheet = attach(_rules, _options);
      this.uuid = uuid;
    }

    componentWillUnmount() {
      this.sheet.detach();
      this.sheet = null;
    }

    classSet(classNames) {
      return Object.keys(classNames).filter(function (className) {
        return classNames[className];
      }).map(function (className) {
        return this.sheet.classes[className] || className;
      }).join(' ');
    }

    render() {
      return /*#__PURE__*/_react.default.createElement(Component, _extends({
        instance: this.uuid,
        ref: 'kronos',
        classes: this.sheet.classes,
        classSet: this.classSet
      }, this.props));
    }

  } // Support React Hot Loader


  if (module.hot) {
    class HotStyledComponent extends StyledComponent {
      componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
          let _rules = typeof rules === 'function' ? rules(nextProps, this.uuid) : rules;

          let _options = typeof options === 'function' ? options(nextProps, this.uuid) : options;

          this.sheet.detach();
          this.sheet = attach(_rules, _options);
        }
      }

    }

    return HotStyledComponent;
  }

  return StyledComponent;
}