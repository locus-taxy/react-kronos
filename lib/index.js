"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _moment = _interopRequireDefault(require("moment"));

var _reactDomInteractions = require("@floating-ui/react-dom-interactions");

var _classnames = _interopRequireDefault(require("classnames"));

var _constants = require("./constants");

var _calendar = _interopRequireDefault(require("./calendar"));

var _floatingContainer = _interopRequireDefault(require("./floating-container"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const ISOregex = /((\d{4}\-\d\d\-\d\d)[tT]([\d:\.]*)?)([zZ]|([+\-])(\d\d):?(\d\d))/;

const minutesOfDay = m => {
  return (0, _moment.default)(m).minutes() + (0, _moment.default)(m).hours() * 60;
};

class Kronos extends _react.Component {
  constructor(props) {
    super(props);
    this.state = {
      datetime: this.getDateTimeInput().datetime,
      input: this.getDateTimeInput().input,
      type: this.getDateTimeInput().type,
      visible: false,
      level: this.getDefaultLevel()
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props != nextProps) {
      this.validate(this.getDateTimeInput(nextProps).datetime, null, true);
      this.setState({
        datetime: this.getDateTimeInput(nextProps).datetime,
        input: this.getDateTimeInput(nextProps).input
      });
    }
  }

  getDateTimeInput(props) {
    props = props || this.props;
    let prop = props.date || props.time || null;
    let datetime, input, type;

    if (prop === null) {
      datetime = (0, _moment.default)();
      input = null;
      type = _constants.Types.MOMENT;
    } else {
      datetime = this.parse(prop);
      input = datetime.format(this.format(props));

      switch (typeof prop) {
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

  getDefaultLevel() {
    if (typeof this.props.date !== 'undefined') {
      return _constants.Units.DAY;
    } else if (typeof this.props.time !== 'undefined') {
      return _constants.Units.HOUR;
    } else {
      console.warn('Please set a date or time prop. It can be null but not undefined.');
      return _constants.Units.DAY;
    }
  }

  format(props) {
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

  toggle(visible) {
    // Attempt to exit early
    if (visible === this.state.visible) {
      return;
    }

    if (typeof visible === 'undefined') {
      visible = !this.state.visible;
    }

    if (visible !== this.state.visible) {
      this.setState({
        visible
      });
    }
  }

  parse(input) {
    if (input === null) return null;
    let parsing = (0, _moment.default)(input, this.format(), true);

    if (!parsing.isValid()) {
      let test = new Date(input);

      if (isNaN(test.getTime())) {
        test = this.state && this.state.datetime || (0, _moment.default)();
      }

      parsing = (0, _moment.default)(test);
    }

    return parsing;
  }

  save(saving) {
    const {
      datetime
    } = this.state;

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

  validate(datetime, timeUnit, isSaving) {
    let outsideRange = false;

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

  commit(datetime) {
    let returnAs = this.props.returnAs || this.state.type;
    let result;

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

  onClickInput(e) {
    if (this.props.controlVisibility) {
      if (this.props.onClick) this.props.onClick(e);
    } else {
      this.toggle(true);
    }
  }

  onFocusInput(e) {
    if (this.props.onFocus) this.props.onFocus(e);else {
      this.toggle(true);
    }
  }

  onBlurInput(e) {
    let datetime = this.state.datetime || (0, _moment.default)();

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

  onChangeInput(e) {
    if (this.props.onChange) this.props.onChange(e);
    let input = e.target.value;
    let datetime = (0, _moment.default)(input, this.format(), true);

    if (datetime.isValid()) {
      // this changes is to create proper moment object with proper timezone.
      // So that, it does not mess up the date to isoString convertion.
      // In dropdown this.state.datetime is being used to calculate the time range,
      // so we are using this moment object to create a new moment object for the
      // choosen time/ date. {line no. : 324~333}
      if (this.props.format === 'DD/MM/YYYY') {
        let [date, month, year] = datetime.format('DD/MM/YYYY').split('/');
        [date, month, year] = [Number(date), Number(month) - 1, Number(year)];
        datetime = this.state.datetime.clone().set({
          date,
          month,
          year
        });
      } else if (this.props.format === 'DD/MM') {
        let [date, month] = datetime.format('DD/MM').split('/');
        [date, month] = [Number(date), Number(month) - 1];
        datetime = this.state.datetime.clone().set({
          date,
          month
        });
      } else if (this.props.format === 'h:mm a') {
        const [hour, minute] = datetime.format('HH:mm').split(':');
        datetime = this.state.datetime.clone().set({
          hour,
          minute
        });
      }

      this.save(datetime);
    } else if (input == '') {
      this.setState({
        datetime: null,
        input: ''
      });
      this.props.onChangeDateTime && this.props.onChangeDateTime(null);
    } else {
      this.setState({
        input
      });
    }
  }

  onSelect(datetime, close, timeUnit) {
    let shouldClose = close;
    const {
      visible
    } = this.state;
    const {
      closeOnSelect,
      preventClickOnDateTimeOutsideRange
    } = this.props;

    if (timeUnit) {
      if (!this.validate(datetime, timeUnit.unit)) shouldClose = false;
    } else {
      if (!this.validate(datetime)) shouldClose = false;
    }

    if (close && shouldClose === false && preventClickOnDateTimeOutsideRange) {
      return;
    }

    const willBeVisible = closeOnSelect && shouldClose ? !visible : visible;
    this.setState({
      visible: willBeVisible
    });
    this.save(datetime);

    if (this.props.onSelect) {
      this.props.onSelect(datetime, willBeVisible, shouldClose);
    }
  }

  onKeyDown(code) {
    let datetime = this.state.datetime || (0, _moment.default)();
    let lvl = _constants.Levels[this.state.level];

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

  renderInput(reference) {
    const inputClasses = (0, _classnames.default)(this.props.inputClassName, this.props.theme.input, {
      "outside-range": this.state.dateTimeExceedsValidRange
    });
    return /*#__PURE__*/_react.default.createElement("input", {
      type: "text",
      id: this.props.inputId,
      ref: input => {
        this._input = input;
        reference === null || reference === void 0 ? void 0 : reference(input);
      },
      value: this.state.input || "",
      onClick: this.onClickInput.bind(this),
      onFocus: this.onFocusInput.bind(this),
      onBlur: this.onBlurInput.bind(this),
      onKeyDown: e => this.onKeyDown(e.keyCode),
      onChange: this.onChangeInput.bind(this),
      placeholder: this.props.placeholder,
      name: this.props.name,
      className: inputClasses,
      disabled: this.props.disabled,
      style: this.props.inputStyle
    });
  }

  renderCalendar() {
    const visible = this.props.controlVisibility ? this.props.visible : this.state.visible;

    if (!visible) {
      return null;
    }

    return /*#__PURE__*/_react.default.createElement(_calendar.default, {
      instance: this.props.instance,
      datetime: this.state.datetime,
      onSelect: this.onSelect.bind(this),
      above: bool => typeof bool === "undefined" ? this.above : this.above = bool,
      level: this.state.level,
      setLevel: level => this.setState({
        level
      }),
      validate: this.validate.bind(this),
      options: this.props.options,
      inputRect: this._input.getClientRects()[0],
      hideOutsideDateTimes: this.props.hideOutsideDateTimes,
      timeStep: this.props.timeStep,
      style: this.props.calendarStyle,
      className: this.props.calendarClassName,
      theme: this.props.theme
    });
  }

  render() {
    const mainClasses = (0, _classnames.default)("react-kronos", this.props.className, this.props.instance, this.props.theme.kronos, {
      [this.props.theme.kronosDisabled]: this.props.disabled
    });

    if (this.props.portal) {
      return /*#__PURE__*/_react.default.createElement(_floatingContainer.default, null, ({
        x,
        y,
        reference,
        floating,
        strategy
      }) => /*#__PURE__*/_react.default.createElement("div", {
        className: mainClasses,
        "data-toolbox": "kronos"
      }, this.renderInput(reference), /*#__PURE__*/_react.default.createElement(_reactDomInteractions.FloatingPortal, null, /*#__PURE__*/_react.default.createElement("div", {
        ref: floating,
        style: {
          position: strategy,
          top: y !== null && y !== void 0 ? y : 0,
          left: x !== null && x !== void 0 ? x : 0,
          zIndex: 5001
        }
      }, this.renderCalendar()))));
    }

    return /*#__PURE__*/_react.default.createElement("div", {
      className: mainClasses,
      "data-toolbox": "kronos"
    }, this.renderInput(), this.renderCalendar());
  }

}

_defineProperty(Kronos, "defaultProps", {
  closeOnSelect: true,
  closeOnBlur: true,
  controlVisibility: false,
  shouldTriggerOnChangeForDateTimeOutsideRange: false,
  preventClickOnDateTimeOutsideRange: false,
  visible: false,
  disabled: false,
  theme: {},
  portal: false
});

_defineProperty(Kronos, "above", false);

var _default = Kronos;
exports.default = _default;