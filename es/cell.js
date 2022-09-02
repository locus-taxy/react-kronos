import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
export default class Cell extends Component {
  render() {
    const classNames = cn(this.props.theme.cell, this.props.level, this.props.type, {
      selected: this.props.selected
    }, {
      today: this.props.today
    }, {
      'outside-range': !this.props.invalid
    });
    return /*#__PURE__*/React.createElement("div", {
      className: classNames,
      onClick: () => this.props.onClick(this.props.moment)
    }, this.props.label);
  }

}