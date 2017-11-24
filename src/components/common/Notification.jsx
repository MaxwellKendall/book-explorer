import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Icon from './Icon';

export default class Notification extends Component {
  static displayName = 'Error Message';

  static propTypes = {
    classNames: PropTypes.string,
    icon: PropTypes.string.isRequired,
    message: PropTypes.string,
  };

  static defaultProps = {
    classNames: '',
    message: '',
  };

  render() {
    const { classNames, message, icon } = this.props;
    const classes = cx(classNames);

    return (
      <div className={classes}>
        <Icon icon={icon} />
        <h2>{message}</h2>
      </div>
    );
  }
}
