import React, { Component, PropTypes } from 'react'


class Navigation extends Component {

  static propTypes = {
    onPrev: PropTypes.func,
    onNext: PropTypes.func,
    onTitle: PropTypes.func,
    title: PropTypes.string,
  }

  render() {
    return (
      <div className={this.props.theme.nav}>
        <div className='arrow' onClick={this.props.onPrev}>
          «
        </div>
        <div className='title' onClick={this.props.onTitle}>
          {this.props.title}
        </div>
        <div className='arrow' onClick={this.props.onNext}>
          »
        </div>
      </div>
    )
  }
}

export default Navigation;