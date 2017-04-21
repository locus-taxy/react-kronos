!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t(require("react"),require("classnames"),require("moment"),require("react-dom"),require("lodash/get"),require("moment-range"));else if("function"==typeof define&&define.amd)define(["react","classnames","moment","react-dom","lodash/get","moment-range"],t);else{var n="object"==typeof exports?t(require("react"),require("classnames"),require("moment"),require("react-dom"),require("lodash/get"),require("moment-range")):t(e.react,e.classnames,e.moment,e["react-dom"],e["lodash/get"],e["moment-range"]);for(var o in n)("object"==typeof exports?exports:e)[o]=n[o]}}(this,function(e,t,n,o,s,i){return function(e){function t(o){if(n[o])return n[o].exports;var s=n[o]={exports:{},id:o,loaded:!1};return e[o].call(s.exports,s,s.exports,t),s.loaded=!0,s.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){e.exports=n(8)},function(e,t){e.exports=require("react")},function(e,t){e.exports=require("classnames")},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.Keys={ENTER:13,ESC:27,LEFT:37,UP:38,RIGHT:39,DOWN:40},t.Units={YEAR:"years",MONTH:"months",DAY:"days",HOUR:"hours",MINUTE:"minutes"},t.Types={JS_DATE:"JS_DATE",MOMENT:"MOMENT",ISO:"ISO",STRING:"STRING"},t.Levels={years:{up:null,down:"months",nav:{unit:"years",span:10},key:{unit:"year",span:1}},months:{up:"years",down:"days",nav:{unit:"year",span:1},key:{unit:"month",span:1}},days:{up:"months",down:null,nav:{unit:"month",span:1},key:{unit:"day",span:1}},hours:{up:null,down:null,key:{unit:"minutes",span:30}}}},function(e,t){e.exports=require("moment")},function(e,t){e.exports=require("react-dom")},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),u=n(1),l=o(u),p=n(5),c=o(p),f=n(10),d=o(f),h=n(4),m=o(h);n(11);var y=n(2),v=o(y),b=n(3),T=n(9),g=o(T),O=n(7),k=o(O),w=function(e){function t(e){s(this,t);var n=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={windowHeight:window.innerHeight},n}return r(t,e),a(t,[{key:"componentWillMount",value:function(){window.addEventListener("resize",this.updateDimensions.bind(this))}},{key:"componentDidMount",value:function(){this._isMounted=!0,this.scrollToHour(),this.updateDimensions()}},{key:"componentDidUpdate",value:function(e){this.props.above()||this.scrollToHour()}},{key:"componentWillUnmount",value:function(){this._isMounted=!1,window.removeEventListener("resize",this.updateDimensions.bind(this))}},{key:"updateDimensions",value:function(){this._isMounted&&this.setState({windowHeight:window.innerHeight})}},{key:"scrollToHour",value:function(){if("hours"==this.props.level&&this.refs.selected){var e=c.default.findDOMNode(this.refs.selected);e.parentNode.scrollTop=e.offsetTop-6}}},{key:"onNavigateCell",value:function(e){var t=b.Levels[this.props.level];t.down&&this.props.setLevel(t.down),this.props.onSelect(e,!t.down,t.key)}},{key:"onNavigateUp",value:function(){var e=b.Levels[this.props.level];e.up&&this.props.setLevel(e.up)}},{key:"onNavigateLeft",value:function(){var e=b.Levels[this.props.level].nav;this.props.onSelect(this.props.datetime.subtract(e.span,e.unit))}},{key:"onNavigateRight",value:function(){var e=b.Levels[this.props.level].nav;this.props.onSelect(this.props.datetime.add(e.span,e.unit))}},{key:"onToday",value:function(){var e=b.Levels[this.props.level];(0,m.default)(this.props.datetime).isSame((0,m.default)(),"day")?this.props.onSelect((0,m.default)(),!e.down):this.props.onSelect((0,m.default)())}},{key:"getTitle",value:function(e,t){switch(t=t||(0,m.default)(),e){case"years":var n=t.clone().subtract(4,"years"),o=t.clone().add(7,"years"),s=[];return(0,m.default)().range(n,o).by(b.Units.YEAR,function(e){s.push({label:e.format("YYYY"),selected:e.isSame(t,"year")})}),[s[0].label,s[s.length-1].label].join("-");case"months":return t.format("YYYY");case"days":return t.format("MMMM");case"hours":return null}}},{key:"getCells",value:function(e,t){var n=this;t=t||(0,m.default)();var o="hours"===e&&this.props.timeStep?"minutes":e;switch(o){case"years":var s=t.clone().subtract(4,"years"),i=t.clone().add(7,"years"),r=[],a=(0,d.default)(this.props,"options.format.year")||"YYYY";return(0,m.default)().range(s,i).by(b.Units.YEAR,function(e){r.push({moment:e,label:e.format(a),selected:e.isSame(t,"year")})}),r;case"months":var u=t.clone().startOf("year"),l=t.clone().endOf("year"),p=[],c=(0,d.default)(this.props,"options.format.month")||"MMM";return(0,m.default)().range(u,l).by(b.Units.MONTH,function(e){p.push({moment:e,label:e.format(c),selected:e.isSame(t,"month")})}),p;case"days":var f=t.clone().startOf("month").weekday(0),h=t.clone().endOf("month").weekday(6),y=[],v=(0,d.default)(this.props,"options.format.day")||"D";return m.default.weekdaysMin().forEach(function(e){y.push({label:e,header:!0})}),(0,m.default)().range(f,h).by(b.Units.DAY,function(e){y.push({moment:e,label:e.format(v),past:e.isBefore(t,"month"),future:e.isAfter(t,"month"),selected:e.isSame(t,"day"),today:e.isSame((0,m.default)(),"day")})}),y;case"hours":var T=t.clone().startOf("day"),g=t.clone().endOf("day"),O=[],k=t.clone().subtract(31,"minutes"),w=t.clone().add(31,"minutes"),P=(0,d.default)(this.props,"options.format.hour")||"h:mm a";return(0,m.default)().range(T,g).by(b.Units.HOUR,function(e){O.push({moment:e,label:e.format(P),selected:e.isSame(t,"minute"),nearestBefore:e.isBetween(k,t),nearestAfter:e.isBetween(t,w)});var n=e.clone().add(30,"minutes");O.push({moment:n,label:n.format(P),selected:n.isSame(t,"minute"),nearestBefore:n.isBetween(k,t),nearestAfter:n.isBetween(t,w)})}),O;case"minutes":var S=t.clone().startOf("day"),_=t.clone().endOf("day"),D=[],E=(0,d.default)(this.props,"options.format.minute")||"HH:mm";return(0,m.default)().range(S,_).by(b.Units.MINUTE,function(e){var o=e.minutes();0===o?D.push({moment:e,label:e.format(E),selected:e.isSame(t,"minute")}):o%n.props.timeStep===0&&D.push({moment:e,label:e.format(E),selected:e.isSame(t,"minute")})}),D}}},{key:"render",value:function(){var e=this,t=this.props,n=t.level,o=t.datetime,s=(t.classes,t.inputRect),i=t.hideOutsideDateTimes,r=theme.calendarBelow;return s.top+s.height+237>this.state.windowHeight&&(r=theme.calendarAbove),l.default.createElement("div",{className:r,onMouseDown:function(t){return e.props.above(!0)},onMouseUp:function(t){return e.props.above(!1)}},"hours"!=n&&l.default.createElement(g.default,{id:this.props.id,onPrev:this.onNavigateLeft.bind(this),onNext:this.onNavigateRight.bind(this),onTitle:this.onNavigateUp.bind(this),title:this.getTitle(n,o),theme:theme}),l.default.createElement("div",{className:(0,v.default)(theme.grid,n)},this.getCells(n,o).map(function(t,o){var s=void 0;switch(!0){case t.header:s="header";break;case t.past:s="past";break;case t.future:s="future";break;default:s="base"}return"hours"===n&&i&&!e.props.validate(t.moment,n)?null:l.default.createElement(k.default,{key:o,ref:t.selected||t.nearestBefore?"selected":null,label:t.label,level:n,type:s,selected:t.selected,today:t.today,moment:t.moment,onClick:e.onNavigateCell.bind(e),theme:theme,invalid:e.props.validate(t.moment,n)})}).filter(function(e){return null!=e}),"hours"!=n&&l.default.createElement("div",{className:theme.today,onClick:this.onToday.bind(this)},(0,d.default)(this.props,"options.format.today")||"Today")))}}]),t}(u.Component);w.PropTypes={datetime:u.PropTypes.object.isRequired,onSelect:u.PropTypes.func.isRequired,level:u.PropTypes.string.isRequired,setLevel:u.PropTypes.func.isRequired,onMouseDown:u.PropTypes.func,onMouseUp:u.PropTypes.func},w._isMounted=!1,t.default=w},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),u=n(1),l=o(u),p=n(2),c=o(p),f=function(e){function t(){return s(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return r(t,e),a(t,[{key:"render",value:function(){var e=this,t=(0,c.default)(this.props.theme.cell,this.props.level,this.props.type,{selected:this.props.selected},{today:this.props.today},{"outside-range":!this.props.invalid});return l.default.createElement("div",{className:t,onClick:function(){return e.props.onClick(e.props.moment)}},this.props.label)}}]),t}(u.Component);f.propTypes={label:u.PropTypes.string,level:u.PropTypes.string,type:u.PropTypes.string,selected:u.PropTypes.bool,today:u.PropTypes.bool,onClick:u.PropTypes.func},t.default=f},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},u=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),l=n(1),p=o(l),c=n(5),f=o(c),d=n(4),h=o(d),m=n(2),y=o(m),v=n(3),b=n(6),T=o(b),g=/((\d{4}\-\d\d\-\d\d)[tT]([\d:\.]*)?)([zZ]|([+\-])(\d\d):?(\d\d))/,O=function(e){return(0,h.default)(e).minutes()+60*(0,h.default)(e).hours()},k=function(e){function t(e){s(this,t);var n=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={datetime:n.getDateTimeInput().datetime,input:n.getDateTimeInput().input,type:n.getDateTimeInput().type,visible:!1,level:n.getDefaultLevel()},n}return r(t,e),u(t,[{key:"componentWillReceiveProps",value:function(e){this.props!=e&&(this.validate(this.getDateTimeInput(e).datetime,null,!0),this.setState({datetime:this.getDateTimeInput(e).datetime,input:this.getDateTimeInput(e).input}))}},{key:"getDateTimeInput",value:function(e){e=e||this.props;var t=e.date||e.time||null,n=void 0,o=void 0,s=void 0;if(null===t)n=(0,h.default)(),o=null,s=v.Types.MOMENT;else switch(n=this.parse(t),o=n.format(this.format(e)),"undefined"==typeof t?"undefined":a(t)){case"object":s=h.default.isDate(t)?v.Types.JS_DATE:h.default.isMoment(t)?v.Types.MOMENT:null;break;case"string":s=t.match(g)?v.Types.ISO:v.Types.STRING}return{datetime:n,input:o,type:s}}},{key:"getDefaultLevel",value:function(){return"undefined"!=typeof this.props.date?v.Units.DAY:"undefined"!=typeof this.props.time?v.Units.HOUR:(console.warn("Please set a date or time prop. It can be null but not undefined."),v.Units.DAY)}},{key:"format",value:function(e){return e=e||this.props,"undefined"!=typeof e.format?e.format:"undefined"!=typeof e.date?"MM-DD-YYYY":"undefined"!=typeof e.time?"h:mm a":null}},{key:"toggle",value:function(e){e!==this.state.visible&&("undefined"==typeof e&&(e=!this.state.visible),e!==this.state.visible&&this.setState({visible:e}))}},{key:"parse",value:function(e){if(null===e)return null;var t=(0,h.default)(e,this.format(),!0);if(!t.isValid()){var n=new Date(e);isNaN(n.getTime())&&(n=this.state&&this.state.datetime||(0,h.default)()),t=(0,h.default)(n)}return t}},{key:"save",value:function(e){var t=this.state.datetime;"undefined"!=typeof this.props.date&&(e.hours(t.hours()),e.minutes(t.minutes())),"undefined"!=typeof this.props.time&&(e.date(t.date()),e.month(t.month()),e.year(t.year())),this.setState({datetime:e,input:e.format(this.format())}),this.validate(e,null,!0)&&this.commit(e)}},{key:"validate",value:function(e,t,n){var o=!1;return this.props.min&&(0,h.default)(e).isBefore(this.props.min)&&(o=!0),this.props.max&&(0,h.default)(e).isAfter(this.props.max)&&(o=!0),this.props.minTime&&O(e)<O(this.props.minTime)&&(o=!0),this.props.maxTime&&O(e)>O(this.props.maxTime)&&(o=!0),o&&"hours"!==t&&((0,h.default)(e).isSame(this.props.min,t)||(0,h.default)(e).isSame(this.props.max,t))&&(o=!1),!(!n||(this.setState({dateTimeExceedsValidRange:o}),!this.props.shouldTriggerOnChangeForDateTimeOutsideRange))||!o}},{key:"commit",value:function(e){var t=this.props.returnAs||this.state.type,n=void 0;switch(t){case v.Types.ISO:n=e.toISOString();break;case v.Types.JS_DATE:n=e.toDate();break;case v.Types.MOMENT:n=e;break;case v.Types.STRING:n=e.format(this.format())}this.props.onChangeDateTime&&this.props.onChangeDateTime(n)}},{key:"onClickInput",value:function(e){this.props.controlVisibility?this.props.onClick&&this.props.onClick(e):this.toggle(!0)}},{key:"onFocusInput",value:function(e){this.props.onFocus?this.props.onFocus(e):this.toggle(!0)}},{key:"onBlurInput",value:function(e){var t=this.state.datetime||(0,h.default)();this.above?f.default.findDOMNode(this._input).focus():this.props.closeOnBlur&&(this.toggle(!1),this.props.onBlur&&this.props.onBlur(e)),this.state.input!=this.state.datetime.format(this.format())&&(t=this.parse(this.state.input),t&&this.save(t))}},{key:"onChangeInput",value:function(e){this.props.onChange&&this.props.onChange(e);var t=e.target.value,n=(0,h.default)(t,this.format(),!0);n.isValid()?this.save(n):""==t?(this.setState({datetime:null,input:""}),this.props.onChangeDateTime&&this.props.onChangeDateTime(null)):this.setState({input:t})}},{key:"onSelect",value:function(e,t,n){var o=t,s=this.state.visible,i=this.props,r=i.closeOnSelect,a=i.preventClickOnDateTimeOutsideRange;if(n?this.validate(e,n.unit)||(o=!1):this.validate(e)||(o=!1),!t||o!==!1||!a){var u=r&&o?!s:s;this.setState({visible:u}),this.save(e),this.props.onSelect&&this.props.onSelect(e,u)}}},{key:"onKeyDown",value:function(e){var t=this.state.datetime||(0,h.default)(),n=v.Levels[this.state.level];switch(e){case v.Keys.UP:this.onSelect(t.subtract(n.key.span,n.key.unit));break;case v.Keys.DOWN:this.onSelect(t.add(n.key.span,n.key.unit));break;case v.Keys.ENTER:n.down?this.setState({level:n.down}):this.state.input==t.format(this.format())?this.validate(t)?this.toggle():this.toggle(!0):(this.state.visible||this.toggle(!0),t=this.parse(this.state.input),t&&this.save(t))}}},{key:"render",value:function(){var e=this,t=(0,y.default)("react-kronos",this.props.className,this.props.id,this.props.theme.kronos),n=(0,y.default)(this.props.theme.input,{"outside-range":this.state.dateTimeExceedsValidRange}),o=this.props.controlVisibility?this.props.visible:this.state.visible;return p.default.createElement("div",{className:t,"data-toolbox":"kronos"},p.default.createElement("input",{type:"text",ref:function(t){return e._input=t},value:this.state.input||"",onClick:this.onClickInput.bind(this),onFocus:this.onFocusInput.bind(this),onBlur:this.onBlurInput.bind(this),onKeyDown:function(t){return e.onKeyDown(t.keyCode)},onChange:this.onChangeInput.bind(this),placeholder:this.props.placeholder,name:this.props.name,className:n}),o&&p.default.createElement(T.default,{id:this.props.id,datetime:this.state.datetime,onSelect:this.onSelect.bind(this),above:function(t){return"undefined"==typeof t?e.above:e.above=t},level:this.state.level,setLevel:function(t){return e.setState({level:t})},validate:this.validate.bind(this),options:this.props.options,inputRect:this._input.getClientRects()[0],theme:this.props.theme,hideOutsideDateTimes:this.props.hideOutsideDateTimes,timeStep:this.props.timeStep}))}}]),t}(l.Component);k.propTypes={date:l.PropTypes.any,time:l.PropTypes.any,timeStep:l.PropTypes.number,min:l.PropTypes.any,max:l.PropTypes.any,minTime:l.PropTypes.any,maxTime:l.PropTypes.any,shouldTriggerOnChangeForDateTimeOutsideRange:l.PropTypes.bool,preventClickOnDateTimeOutsideRange:l.PropTypes.bool,format:l.PropTypes.string,onChangeDateTime:l.PropTypes.func,returnAs:l.PropTypes.oneOf([v.Types.ISO,v.Types.JS_DATE,v.Types.MOMENT,v.Types.STRING]),closeOnSelect:l.PropTypes.bool,closeOnBlur:l.PropTypes.bool,placeholder:l.PropTypes.string,name:l.PropTypes.string,options:l.PropTypes.object,hideOutsideDateTimes:l.PropTypes.bool,controlVisibility:l.PropTypes.bool,visible:l.PropTypes.bool,onClick:l.PropTypes.func,onFocus:l.PropTypes.func,onBlur:l.PropTypes.func,onChange:l.PropTypes.func,onSelect:l.PropTypes.func,theme:l.PropTypes.any,className:l.PropTypes.any},k.defaultProps={closeOnSelect:!0,closeOnBlur:!0,controlVisibility:!1,shouldTriggerOnChangeForDateTimeOutsideRange:!1,preventClickOnDateTimeOutsideRange:!1,visible:!1,theme:{}},k.above=!1,t.default=k},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),u=n(1),l=o(u),p=function(e){function t(){return s(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return r(t,e),a(t,[{key:"render",value:function(){return l.default.createElement("div",{className:this.props.theme.nav},l.default.createElement("div",{className:"arrow",onClick:this.props.onPrev},"«"),l.default.createElement("div",{className:"title",onClick:this.props.onTitle},this.props.title),l.default.createElement("div",{className:"arrow",onClick:this.props.onNext},"»"))}}]),t}(u.Component);p.propTypes={onPrev:u.PropTypes.func,onNext:u.PropTypes.func,onTitle:u.PropTypes.func,title:u.PropTypes.string},t.default=p},function(e,t){e.exports=require("lodash/get")},function(e,t){e.exports=require("moment-range")}])});