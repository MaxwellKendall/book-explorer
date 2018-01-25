import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Loading extends Component {
  static displayName = 'Loading Text';

  static defaultProps = {
    text: 'Loading',
    speed: 300,
  };

  static propTypes = {
    text: PropTypes.string,
    speed: PropTypes.number,
  };

  state = {
    text: this.props.text,
    speed: this.props.speed,
  }

  /**
   * componentDidMount:
   * Executed after component is placed into the DOM
   */

  componentDidMount = () => {
    const stopper = `${this.props.text}...`;
    this.interval = window.setInterval(() => {
      if (this.state.text === stopper) {
        this.setState(() => ({ text: `${this.props.text}` }));
      } else {
        this.setState(prevState => ({ text: `${prevState.text}.` }));
      }
    }, this.props.speed);
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    return (
      <div className="loading">{this.state.text}</div>
    );
  }
}
