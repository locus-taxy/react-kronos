"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _moment = _interopRequireDefault(require("moment"));

var _classnames = _interopRequireDefault(require("classnames"));

var _constants = require("./constants");

var _calendar = _interopRequireDefault(require("./calendar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ISOregex = /((\d{4}\-\d\d\-\d\d)[tT]([\d:\.]*)?)([zZ]|([+\-])(\d\d):?(\d\d))/;

var minutesOfDay = function minutesOfDay(m) {
  return (0, _moment.default)(m).minutes() + (0, _moment.default)(m).hours() * 60;
};

var Kronos =
/*#__PURE__*/
function (_Component) {
  _inherits(Kronos, _Component);

  function Kronos(props) {
    var _this;

    _classCallCheck(this, Kronos);

    _this = _possibleConstructorReturn(this, (Kronos.__proto__ || Object.getPrototypeOf(Kronos)).call(this, props));
    _this.state = {
      datetime: _this.getDateTimeInput().datetime,
      input: _this.getDateTimeInput().input,
      type: _this.getDateTimeInput().type,
      visible: false,
      level: _this.getDefaultLevel()
    };
    return _this;
  }

  _createClass(Kronos, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (this.props != nextProps) {
        this.validate(this.getDateTimeInput(nextProps).datetime, null, true);
        this.setState({
          datetime: this.getDateTimeInput(nextProps).datetime,
          input: this.getDateTimeInput(nextProps).input
        });
      }
    }
  }, {
    key: "getDateTimeInput",
    value: function getDateTimeInput(props) {
      props = props || this.props;
      var prop = props.date || props.time || null;
      var datetime, input, type;

      if (prop === null) {
        datetime = (0, _moment.default)();
        input = null;
        type = _constants.Types.MOMENT;
      } else {
        datetime = this.parse(prop);
        input = datetime.format(this.format(props));

        switch (_typeof(prop)) {
          case 'object':
            if (_moment.default.isDate(prop)) {
              type = _constants.Types.JS_DATE;
            } else if (_moment.default.isMoment(prop)) {
              type = _constants.Types.MOMENT;
            } else {
              type = null;
            }

            break;

          case 'string':
            if (prop.match(ISOregex)) {
              type = _constants.Types.ISO;
            } else {
              type = _constants.Types.STRING;
            }

            break;
        }
      }

      return {
        datetime: datetime,
        input: input,
        type: type
      };
    }
  }, {
    key: "getDefaultLevel",
    value: function getDefaultLevel() {
      if (typeof this.props.date !== 'undefined') {
        return _constants.Units.DAY;
      } else if (typeof this.props.time !== 'undefined') {
        return _constants.Units.HOUR;
      } else {
        console.warn('Please set a date or time prop. It can be null but not undefined.');
        return _constants.Units.DAY;
      }
    }
  }, {
    key: "format",
    value: function format(props) {
      props = props || this.props;

      if (typeof props.format !== 'undefined') {
        return props.format;
      } else if (typeof props.date !== 'undefined') {
        return 'MM-DD-YYYY';
      } else if (typeof props.time !== 'undefined') {
        return 'h:mm a';
      } else {
        return null;
      }
    }
  }, {
    key: "toggle",
    value: function toggle(visible) {
      // Attempt to exit early
      if (visible === this.state.visible) {
        return;
      }

      if (typeof visible === 'undefined') {
        visible = !this.state.visible;
      }

      if (visible !== this.state.visible) {
        this.setState({
          visible: visible
        });
      }
    }
  }, {
    key: "parse",
    value: function parse(input) {
      if (input === null) return null;
      var parsing = (0, _moment.default)(input, this.format(), true);

      if (!parsing.isValid()) {
        var test = new Date(input);

        if (isNaN(test.getTime())) {
          test = this.state && this.state.datetime || (0, _moment.default)();
        }

        parsing = (0, _moment.default)(test);
      }

      return parsing;
    }
  }, {
    key: "save",
    value: function save(saving) {
      var datetime = this.state.datetime;

      if (typeof this.props.date !== 'undefined') {
        saving.hours(datetime.hours());
        saving.minutes(datetime.minutes());
      }

      if (typeof this.props.time !== 'undefined') {
        saving.date(datetime.date());
        saving.month(datetime.month());
        saving.year(datetime.year());
      }

      this.setState({
        datetime: saving,
        input: saving.format(this.format())
      });
      if (this.validate(saving, null, true)) this.commit(saving);
    }
  }, {
    key: "validate",
    value: function validate(datetime, timeUnit, isSaving) {
      var outsideRange = false;

      if (this.props.min && (0, _moment.default)(datetime).isBefore(this.props.min)) {
        outsideRange = true;
      }

      if (this.props.max && (0, _moment.default)(datetime).isAfter(this.props.max)) {
        outsideRange = true;
      }

      if (this.props.minTime && minutesOfDay(datetime) < minutesOfDay(this.props.minTime)) {
        outsideRange = true;
      }

      if (this.props.maxTime && minutesOfDay(datetime) > minutesOfDay(this.props.maxTime)) {
        outsideRange = true;
      }

      if (outsideRange && timeUnit !== 'hours') {
        if ((0, _moment.default)(datetime).isSame(this.props.min, timeUnit) || (0, _moment.default)(datetime).isSame(this.props.max, timeUnit)) {
          outsideRange = false;
        }
      }

      if (isSaving) {
        this.setState({
          dateTimeExceedsValidRange: outsideRange
        });
        if (this.props.shouldTriggerOnChangeForDateTimeOutsideRange) return true;
      }

      return !outsideRange;
    }
  }, {
    key: "commit",
    value: function commit(datetime) {
      var returnAs = this.props.returnAs || this.state.type;
      var result;

      switch (returnAs) {
        case _constants.Types.ISO:
          result = datetime.toISOString();
          break;

        case _constants.Types.JS_DATE:
          result = datetime.toDate();
          break;

        case _constants.Types.MOMENT:
          result = datetime;
          break;

        case _constants.Types.STRING:
          result = datetime.format(this.format());
          break;
      }

      this.props.onChangeDateTime && this.props.onChangeDateTime(result);
    }
  }, {
    key: "onClickInput",
    value: function onClickInput(e) {
      if (this.props.controlVisibility) {
        if (this.props.onClick) this.props.onClick(e);
      } else {
        this.toggle(true);
      }
    }
  }, {
    key: "onFocusInput",
    value: function onFocusInput(e) {
      if (this.props.onFocus) this.props.onFocus(e);else {
        this.toggle(true);
      }
    }
  }, {
    key: "onBlurInput",
    value: function onBlurInput(e) {
      var datetime = this.state.datetime || (0, _moment.default)();

      if (this.above) {
        _reactDom.default.findDOMNode(this._input).focus();
      } else if (this.props.closeOnBlur) {
        this.toggle(false);
        if (this.props.onBlur) this.props.onBlur(e);
      }

      if (this.state.input == this.state.datetime.format(this.format())) {
        return;
      } else {
        datetime = this.parse(this.state.input);
        if (datetime) this.save(datetime);
      }
    }
  }, {
    key: "onChangeInput",
    value: function onChangeInput(e) {
      if (this.props.onChange) this.props.onChange(e);
      var input = e.target.value;
      var datetime = (0, _moment.default)(input, this.format(), true);

      if (datetime.isValid()) {
        var date = this.state.datetime && this.state.datetime.toISOString().split('T')[0];
        var dateTimeString = "".concat(date, " ").concat(datetime._d.getHours(), ":").concat(datetime._d.getMinutes());
        datetime = (0, _moment.default)(dateTimeString).utcOffset(420);
        this.save(datetime);
      } else if (input == '') {
        this.setState({
          datetime: null,
          input: ''
        });
        this.props.onChangeDateTime && this.props.onChangeDateTime(null);
      } else {
        this.setState({
          input: input
        });
      }
    }
  }, {
    key: "onSelect",
    value: function onSelect(datetime, close, timeUnit) {
      var shouldClose = close;
      var visible = this.state.visible;
      var _props = this.props,
          closeOnSelect = _props.closeOnSelect,
          preventClickOnDateTimeOutsideRange = _props.preventClickOnDateTimeOutsideRange;

      if (timeUnit) {
        if (!this.validate(datetime, timeUnit.unit)) shouldClose = false;
      } else {
        if (!this.validate(datetime)) shouldClose = false;
      }

      if (close && shouldClose === false && preventClickOnDateTimeOutsideRange) {
        return;
      }

      var willBeVisible = closeOnSelect && shouldClose ? !visible : visible;
      this.setState({
        visible: willBeVisible
      });
      this.save(datetime);

      if (this.props.onSelect) {
        this.props.onSelect(datetime, willBeVisible, shouldClose);
      }
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(code) {
      var datetime = this.state.datetime || (0, _moment.default)();
      var lvl = _constants.Levels[this.state.level];

      switch (code) {
        case _constants.Keys.UP:
          this.onSelect(datetime.subtract(lvl.key.span, lvl.key.unit));
          break;

        case _constants.Keys.DOWN:
          this.onSelect(datetime.add(lvl.key.span, lvl.key.unit));
          break;

        case _constants.Keys.ENTER:
          if (lvl.down) {
            this.setState({
              level: lvl.down
            });
          } else {
            if (this.state.input == datetime.format(this.format())) {
              if (!this.validate(datetime)) {
                this.toggle(true);
              } else {
                this.toggle();
              }
            } else {
              if (!this.state.visible) this.toggle(true);
              datetime = this.parse(this.state.input);
              if (datetime) this.save(datetime);
            }
          }

          break;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var mainClasses = (0, _classnames.default)('react-kronos', this.props.className, this.props.instance, this.props.theme.kronos, _defineProperty({}, this.props.theme.kronosDisabled, this.props.disabled));
      var inputClasses = (0, _classnames.default)(this.props.inputClassName, this.props.theme.input, {
        'outside-range': this.state.dateTimeExceedsValidRange
      });
      var visible = this.props.controlVisibility ? this.props.visible : this.state.visible;
      return _react.default.createElement("div", {
        className: mainClasses,
        "data-toolbox": "kronos"
      }, _react.default.createElement("input", {
        type: "text",
        id: this.props.inputId,
        ref: function ref(input) {
          return _this2._input = input;
        },
        value: this.state.input || '',
        onClick: this.onClickInput.bind(this),
        onFocus: this.onFocusInput.bind(this),
        onBlur: this.onBlurInput.bind(this),
        onKeyDown: function onKeyDown(e) {
          return _this2.onKeyDown(e.keyCode);
        },
        onChange: this.onChangeInput.bind(this),
        placeholder: this.props.placeholder,
        name: this.props.name,
        className: inputClasses,
        disabled: this.props.disabled,
        style: this.props.inputStyle
      }), visible && _react.default.createElement(_calendar.default, {
        instance: this.props.instance,
        datetime: this.state.datetime,
        onSelect: this.onSelect.bind(this),
        above: function above(bool) {
          return typeof bool === 'undefined' ? _this2.above : _this2.above = bool;
        },
        level: this.state.level,
        setLevel: function setLevel(level) {
          return _this2.setState({
            level: level
          });
        },
        validate: this.validate.bind(this),
        options: this.props.options,
        inputRect: this._input.getClientRects()[0],
        hideOutsideDateTimes: this.props.hideOutsideDateTimes,
        timeStep: this.props.timeStep,
        style: this.props.calendarStyle,
        className: this.props.calendarClassName,
        theme: this.props.theme
      }));
    }
  }]);

  return Kronos;
}(_react.Component);

Object.defineProperty(Kronos, "propTypes", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    date: _propTypes.default.any,
    time: _propTypes.default.any,
    timeStep: _propTypes.default.number,
    min: _propTypes.default.any,
    max: _propTypes.default.any,
    minTime: _propTypes.default.any,
    maxTime: _propTypes.default.any,
    shouldTriggerOnChangeForDateTimeOutsideRange: _propTypes.default.bool,
    preventClickOnDateTimeOutsideRange: _propTypes.default.bool,
    format: _propTypes.default.string,
    onChangeDateTime: _propTypes.default.func,
    returnAs: _propTypes.default.oneOf([_constants.Types.ISO, _constants.Types.JS_DATE, _constants.Types.MOMENT, _constants.Types.STRING]),
    closeOnSelect: _propTypes.default.bool,
    closeOnBlur: _propTypes.default.bool,
    placeholder: _propTypes.default.string,
    name: _propTypes.default.string,
    disabled: _propTypes.default.bool,
    inputStyle: _propTypes.default.object,
    inputClassName: _propTypes.default.string,
    inputId: _propTypes.default.string,
    calendarStyle: _propTypes.default.object,
    calendarClassName: _propTypes.default.string,
    options: _propTypes.default.shape({
      color: _propTypes.default.string,
      corners: _propTypes.default.number,
      font: _propTypes.default.string,
      locale: _propTypes.default.shape({
        lang: _propTypes.default.string,
        settings: _propTypes.default.object
      }),
      format: _propTypes.default.shape({
        today: _propTypes.default.string,
        year: _propTypes.default.string,
        month: _propTypes.default.string,
        day: _propTypes.default.string,
        hour: _propTypes.default.string
      })
    }),
    hideOutsideDateTimes: _propTypes.default.bool,
    // Advanced controls
    controlVisibility: _propTypes.default.bool,
    visible: _propTypes.default.bool,
    onClick: _propTypes.default.func,
    onFocus: _propTypes.default.func,
    onBlur: _propTypes.default.func,
    onChange: _propTypes.default.func,
    onSelect: _propTypes.default.func,
    theme: _propTypes.default.object
  }
});
Object.defineProperty(Kronos, "defaultProps", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    closeOnSelect: true,
    closeOnBlur: true,
    controlVisibility: false,
    shouldTriggerOnChangeForDateTimeOutsideRange: false,
    preventClickOnDateTimeOutsideRange: false,
    visible: false,
    disabled: false,
    theme: {}
  }
});
Object.defineProperty(Kronos, "above", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: false
});
var _default = Kronos;
exports.default = _default;