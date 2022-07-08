"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _get = _interopRequireDefault(require("lodash/get"));

var _noop = _interopRequireDefault(require("lodash/noop"));

var _moment = _interopRequireDefault(require("moment"));

require("moment-range");

var _classnames = _interopRequireDefault(require("classnames"));

var _constants = require("./constants");

var _nav = _interopRequireDefault(require("./nav"));

var _cell = _interopRequireDefault(require("./cell"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Calendar extends _react.Component {
  constructor(props) {
    super(props);
    this.state = {
      windowHeight: window.innerHeight
    };
  }

  componentWillMount() {
    window.addEventListener('resize', this.updateDimensions.bind(this));
  }

  componentDidMount() {
    this._isMounted = true;
    this.scrollToHour();
    this.updateDimensions();
  }

  componentDidUpdate(prevProps) {
    if (!this.props.above()) {
      this.scrollToHour();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
    window.removeEventListener('resize', this.updateDimensions.bind(this));
  }

  updateDimensions() {
    if (this._isMounted) {
      this.setState({
        windowHeight: window.innerHeight
      });
    }
  }

  scrollToHour() {
    if (this.props.level == 'hours' && this.refs.selected) {
      const selected = _reactDom.default.findDOMNode(this.refs.selected);

      selected.parentNode.scrollTop = selected.offsetTop - 6;
    }
  }

  onNavigateCell(datetime) {
    const lvl = _constants.Levels[this.props.level];
    if (lvl.down) this.props.setLevel(lvl.down);
    this.props.onSelect(datetime, !lvl.down, lvl.key);
  }

  onNavigateUp() {
    const lvl = _constants.Levels[this.props.level];
    if (lvl.up) this.props.setLevel(lvl.up);
  }

  onNavigateLeft() {
    const lvl = _constants.Levels[this.props.level].nav;
    this.props.onSelect(this.props.datetime.subtract(lvl.span, lvl.unit));
  }

  onNavigateRight() {
    const lvl = _constants.Levels[this.props.level].nav;
    this.props.onSelect(this.props.datetime.add(lvl.span, lvl.unit));
  }

  onToday() {
    const lvl = _constants.Levels[this.props.level];

    if ((0, _moment.default)(this.props.datetime).isSame((0, _moment.default)(), 'day')) {
      this.props.onSelect((0, _moment.default)(), !lvl.down);
    } else {
      this.props.onSelect((0, _moment.default)());
    }
  }

  getTitle(unit, datetime) {
    datetime = datetime || (0, _moment.default)();

    switch (unit) {
      case 'years':
        const start = datetime.clone().subtract(4, 'years');
        const end = datetime.clone().add(7, 'years');
        let years = [];
        (0, _moment.default)().range(start, end).by(_constants.Units.YEAR, year => {
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

  getCells(unit, datetime) {
    datetime = datetime || (0, _moment.default)();
    const type = unit === 'hours' && this.props.timeStep ? 'minutes' : unit;

    switch (type) {
      case 'years':
        {
          const start = datetime.clone().subtract(4, 'years');
          const end = datetime.clone().add(7, 'years');
          let years = [];
          const format = (0, _get.default)(this.props, 'options.format.year') || 'YYYY';
          (0, _moment.default)().range(start, end).by(_constants.Units.YEAR, year => {
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
          const start = datetime.clone().startOf('year');
          const end = datetime.clone().endOf('year');
          let months = [];
          const format = (0, _get.default)(this.props, 'options.format.month') || 'MMM';
          (0, _moment.default)().range(start, end).by(_constants.Units.MONTH, month => {
            months.push({
              moment: month,
              label: month.format(format),
              selected: month.isSame(datetime, 'month')
            });
          });
          return months;
        }

      case 'days':
        {
          const start = datetime.clone().startOf('month').weekday(0);
          const end = datetime.clone().endOf('month').weekday(6);
          let days = [];
          const format = (0, _get.default)(this.props, 'options.format.day') || 'D';

          _moment.default.weekdaysMin().forEach(day => {
            days.push({
              label: day,
              header: true
            });
          });

          (0, _moment.default)().range(start, end).by(_constants.Units.DAY, day => {
            days.push({
              moment: day,
              label: day.format(format),
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
          const start = datetime.clone().startOf('day');
          const end = datetime.clone().endOf('day');
          let hours = [];
          const closeBefore = datetime.clone().subtract(31, 'minutes');
          const closeAfter = datetime.clone().add(31, 'minutes');
          const format = (0, _get.default)(this.props, 'options.format.hour') || 'HH:mm';
          (0, _moment.default)().range(start, end).by(_constants.Units.HOUR, hour => {
            hours.push({
              moment: hour,
              label: hour.format(format),
              selected: hour.isSame(datetime, 'minute'),
              nearestBefore: hour.isBetween(closeBefore, datetime),
              nearestAfter: hour.isBetween(datetime, closeAfter)
            });
            let halfHour = hour.clone().add(30, 'minutes');
            hours.push({
              moment: halfHour,
              label: halfHour.format(format),
              selected: halfHour.isSame(datetime, 'minute'),
              nearestBefore: halfHour.isBetween(closeBefore, datetime),
              nearestAfter: halfHour.isBetween(datetime, closeAfter)
            });
          });
          return hours;
        }

      case 'minutes':
        {
          const start = datetime.clone().startOf('day');
          const end = datetime.clone().endOf('day');
          let minutes = [];
          const format = (0, _get.default)(this.props, 'options.format.hour') || 'HH:mm';
          (0, _moment.default)().range(start, end).by(_constants.Units.MINUTE, minute => {
            const _minutes = minute.minutes();

            if (_minutes === 0) {
              minutes.push({
                moment: minute,
                label: minute.format(format),
                selected: minute.isSame(datetime, 'minute')
              });
            } else if (_minutes % this.props.timeStep === 0) {
              minutes.push({
                moment: minute,
                label: minute.format(format),
                selected: minute.isSame(datetime, 'minute')
              });
            }
          });
          return minutes;
        }
    }
  }

  render() {
    const {
      level,
      datetime,
      inputRect,
      hideOutsideDateTimes,
      theme
    } = this.props;
    let calendarClass = theme.calendarBelow;

    if (inputRect.top + inputRect.height + 237 > this.state.windowHeight) {
      calendarClass = theme.calendarAbove;
    }

    return /*#__PURE__*/_react.default.createElement("div", {
      className: (0, _classnames.default)(this.props.className, calendarClass),
      onMouseDown: e => this.props.above(true),
      onMouseUp: e => this.props.above(false),
      style: this.props.style
    }, level != 'hours' && /*#__PURE__*/_react.default.createElement(_nav.default, {
      instance: this.props.instance,
      onPrev: this.onNavigateLeft.bind(this),
      onNext: this.onNavigateRight.bind(this),
      onTitle: this.onNavigateUp.bind(this),
      title: this.getTitle(level, datetime),
      theme: theme
    }), /*#__PURE__*/_react.default.createElement("div", {
      className: (0, _classnames.default)(theme.grid, level)
    }, this.getCells(level, datetime).map((cell, i) => {
      let type;

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

      if (level === 'hours' && hideOutsideDateTimes && !this.props.validate(cell.moment, level)) {
        return null;
      }

      return /*#__PURE__*/_react.default.createElement(_cell.default, {
        key: i,
        ref: cell.selected || cell.nearestBefore ? 'selected' : null,
        label: cell.label,
        level: level,
        type: type,
        selected: cell.selected,
        today: cell.today,
        moment: cell.moment,
        onClick: type !== 'header' ? this.onNavigateCell.bind(this) : _noop.default,
        theme: theme,
        invalid: this.props.validate(cell.moment, level)
      });
    }).filter(cell => cell != null), level != 'hours' && /*#__PURE__*/_react.default.createElement("div", {
      className: theme.today,
      onClick: this.onToday.bind(this)
    }, (0, _get.default)(this.props, 'options.format.today') || 'Today')));
  }

}

_defineProperty(Calendar, "_isMounted", false);

var _default = Calendar;
exports.default = _default;