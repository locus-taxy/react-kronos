"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _get = _interopRequireDefault(require("lodash/get"));

var _moment = _interopRequireDefault(require("moment"));

require("moment-range");

var _classnames = _interopRequireDefault(require("classnames"));

var _constants = require("./constants");

var _nav = _interopRequireDefault(require("./nav"));

var _cell = _interopRequireDefault(require("./cell"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Calendar =
/*#__PURE__*/
function (_Component) {
  _inherits(Calendar, _Component);

  function Calendar(props) {
    var _this;

    _classCallCheck(this, Calendar);

    _this = _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this, props));
    _this.state = {
      windowHeight: window.innerHeight
    };
    return _this;
  }

  _createClass(Calendar, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      window.addEventListener('resize', this.updateDimensions.bind(this));
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this._isMounted = true;
      this.scrollToHour();
      this.updateDimensions();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (!this.props.above()) {
        this.scrollToHour();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._isMounted = false;
      window.removeEventListener('resize', this.updateDimensions.bind(this));
    }
  }, {
    key: "updateDimensions",
    value: function updateDimensions() {
      if (this._isMounted) {
        this.setState({
          windowHeight: window.innerHeight
        });
      }
    }
  }, {
    key: "scrollToHour",
    value: function scrollToHour() {
      if (this.props.level == 'hours' && this.refs.selected) {
        var selected = _reactDom.default.findDOMNode(this.refs.selected);

        selected.parentNode.scrollTop = selected.offsetTop - 6;
      }
    }
  }, {
    key: "onNavigateCell",
    value: function onNavigateCell(datetime) {
      var lvl = _constants.Levels[this.props.level];
      if (lvl.down) this.props.setLevel(lvl.down);
      this.props.onSelect(datetime, !lvl.down, lvl.key);
    }
  }, {
    key: "onNavigateUp",
    value: function onNavigateUp() {
      var lvl = _constants.Levels[this.props.level];
      if (lvl.up) this.props.setLevel(lvl.up);
    }
  }, {
    key: "onNavigateLeft",
    value: function onNavigateLeft() {
      var lvl = _constants.Levels[this.props.level].nav;
      this.props.onSelect(this.props.datetime.subtract(lvl.span, lvl.unit));
    }
  }, {
    key: "onNavigateRight",
    value: function onNavigateRight() {
      var lvl = _constants.Levels[this.props.level].nav;
      this.props.onSelect(this.props.datetime.add(lvl.span, lvl.unit));
    }
  }, {
    key: "onToday",
    value: function onToday() {
      var lvl = _constants.Levels[this.props.level];

      if ((0, _moment.default)(this.props.datetime).isSame((0, _moment.default)(), 'day')) {
        this.props.onSelect((0, _moment.default)(), !lvl.down);
      } else {
        this.props.onSelect((0, _moment.default)());
      }
    }
  }, {
    key: "getTitle",
    value: function getTitle(unit, datetime) {
      datetime = datetime || (0, _moment.default)();

      switch (unit) {
        case 'years':
          var start = datetime.clone().subtract(4, 'years');
          var end = datetime.clone().add(7, 'years');
          var years = [];
          (0, _moment.default)().range(start, end).by(_constants.Units.YEAR, function (year) {
            years.push({
              label: year.format('YYYY'),
              selected: year.isSame(datetime, 'year')
            });
          });
          return [years[0].label, years[years.length - 1].label].join('-');

        case 'months':
          return datetime.format('YYYY');

        case 'days':
          return datetime.format('MMMM');

        case 'hours':
          return null;
      }
    }
  }, {
    key: "getCells",
    value: function getCells(unit, datetime) {
      var _this2 = this;

      datetime = datetime || (0, _moment.default)();
      var type = unit === 'hours' && this.props.timeStep ? 'minutes' : unit;

      switch (type) {
        case 'years':
          {
            var start = datetime.clone().subtract(4, 'years');
            var end = datetime.clone().add(7, 'years');
            var years = [];
            var format = (0, _get.default)(this.props, 'options.format.year') || 'YYYY';
            (0, _moment.default)().range(start, end).by(_constants.Units.YEAR, function (year) {
              years.push({
                moment: year,
                label: year.format(format),
                selected: year.isSame(datetime, 'year')
              });
            });
            return years;
          }

        case 'months':
          {
            var _start = datetime.clone().startOf('year');

            var _end = datetime.clone().endOf('year');

            var months = [];

            var _format = (0, _get.default)(this.props, 'options.format.month') || 'MMM';

            (0, _moment.default)().range(_start, _end).by(_constants.Units.MONTH, function (month) {
              months.push({
                moment: month,
                label: month.format(_format),
                selected: month.isSame(datetime, 'month')
              });
            });
            return months;
          }

        case 'days':
          {
            var _start2 = datetime.clone().startOf('month').weekday(0);

            var _end2 = datetime.clone().endOf('month').weekday(6);

            var days = [];

            var _format2 = (0, _get.default)(this.props, 'options.format.day') || 'D';

            _moment.default.weekdaysMin().forEach(function (day) {
              days.push({
                label: day,
                header: true
              });
            });

            (0, _moment.default)().range(_start2, _end2).by(_constants.Units.DAY, function (day) {
              days.push({
                moment: day,
                label: day.format(_format2),
                past: day.isBefore(datetime, 'month'),
                future: day.isAfter(datetime, 'month'),
                selected: day.isSame(datetime, 'day'),
                today: day.isSame((0, _moment.default)(), 'day')
              });
            });
            return days;
          }

        case 'hours':
          {
            var _start3 = datetime.clone().startOf('day');

            var _end3 = datetime.clone().endOf('day');

            var hours = [];
            var closeBefore = datetime.clone().subtract(31, 'minutes');
            var closeAfter = datetime.clone().add(31, 'minutes');

            var _format3 = (0, _get.default)(this.props, 'options.format.hour') || 'HH:mm';

            (0, _moment.default)().range(_start3, _end3).by(_constants.Units.HOUR, function (hour) {
              hours.push({
                moment: hour,
                label: hour.format(_format3),
                selected: hour.isSame(datetime, 'minute'),
                nearestBefore: hour.isBetween(closeBefore, datetime),
                nearestAfter: hour.isBetween(datetime, closeAfter)
              });
              var halfHour = hour.clone().add(30, 'minutes');
              hours.push({
                moment: halfHour,
                label: halfHour.format(_format3),
                selected: halfHour.isSame(datetime, 'minute'),
                nearestBefore: halfHour.isBetween(closeBefore, datetime),
                nearestAfter: halfHour.isBetween(datetime, closeAfter)
              });
            });
            return hours;
          }

        case 'minutes':
          {
            var _start4 = datetime.clone().startOf('day');

            var _end4 = datetime.clone().endOf('day');

            var minutes = [];

            var _format4 = (0, _get.default)(this.props, 'options.format.hour') || 'HH:mm';

            (0, _moment.default)().range(_start4, _end4).by(_constants.Units.MINUTE, function (minute) {
              var _minutes = minute.minutes();

              if (_minutes === 0) {
                minutes.push({
                  moment: minute,
                  label: minute.format(_format4),
                  selected: minute.isSame(datetime, 'minute')
                });
              } else if (_minutes % _this2.props.timeStep === 0) {
                minutes.push({
                  moment: minute,
                  label: minute.format(_format4),
                  selected: minute.isSame(datetime, 'minute')
                });
              }
            });
            return minutes;
          }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          level = _props.level,
          datetime = _props.datetime,
          inputRect = _props.inputRect,
          hideOutsideDateTimes = _props.hideOutsideDateTimes,
          theme = _props.theme;
      var calendarClass = theme.calendarBelow;

      if (inputRect.top + inputRect.height + 237 > this.state.windowHeight) {
        calendarClass = theme.calendarAbove;
      }

      return _react.default.createElement("div", {
        className: (0, _classnames.default)(this.props.className, calendarClass),
        onMouseDown: function onMouseDown(e) {
          return _this3.props.above(true);
        },
        onMouseUp: function onMouseUp(e) {
          return _this3.props.above(false);
        },
        style: this.props.style
      }, level != 'hours' && _react.default.createElement(_nav.default, {
        instance: this.props.instance,
        onPrev: this.onNavigateLeft.bind(this),
        onNext: this.onNavigateRight.bind(this),
        onTitle: this.onNavigateUp.bind(this),
        title: this.getTitle(level, datetime),
        theme: theme
      }), _react.default.createElement("div", {
        className: (0, _classnames.default)(theme.grid, level)
      }, this.getCells(level, datetime).map(function (cell, i) {
        var type;

        switch (true) {
          case cell.header:
            type = 'header';
            break;

          case cell.past:
            type = 'past';
            break;

          case cell.future:
            type = 'future';
            break;

          default:
            type = 'base';
            break;
        }

        if (level === 'hours' && hideOutsideDateTimes && !_this3.props.validate(cell.moment, level)) {
          return null;
        }

        return _react.default.createElement(_cell.default, {
          key: i,
          ref: cell.selected || cell.nearestBefore ? 'selected' : null,
          label: cell.label,
          level: level,
          type: type,
          selected: cell.selected,
          today: cell.today,
          moment: cell.moment,
          onClick: _this3.onNavigateCell.bind(_this3),
          theme: theme,
          invalid: _this3.props.validate(cell.moment, level)
        });
      }).filter(function (cell) {
        return cell != null;
      }), level != 'hours' && _react.default.createElement("div", {
        className: theme.today,
        onClick: this.onToday.bind(this)
      }, (0, _get.default)(this.props, 'options.format.today') || 'Today')));
    }
  }]);

  return Calendar;
}(_react.Component);

Object.defineProperty(Calendar, "propTypes", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    datetime: _propTypes.default.object.isRequired,
    onSelect: _propTypes.default.func.isRequired,
    level: _propTypes.default.string.isRequired,
    setLevel: _propTypes.default.func.isRequired,
    onMouseDown: _propTypes.default.func,
    onMouseUp: _propTypes.default.func
  }
});
Object.defineProperty(Calendar, "_isMounted", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: false
});
var _default = Calendar;
exports.default = _default;