import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Navigation extends Component {
  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: this.props.theme.nav
    }, /*#__PURE__*/React.createElement("div", {
      className: "arrow",
      onClick: this.props.onPrev
    }, "\xAB"), /*#__PURE__*/React.createElement("div", {
      className: "title",
      onClick: this.props.onTitle
    }, this.props.title), /*#__PURE__*/React.createElement("div", {
      className: "arrow",
      onClick: this.props.onNext
    }, "\xBB"));
  }

}

export default Navigation;