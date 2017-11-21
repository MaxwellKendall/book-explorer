import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Icon from './Icon';

export default class ErrorMessage extends Component {
  static displayName = 'Error Message';

  static propTypes = {
    classNames: PropTypes.string,
    icon: PropTypes.string.isRequired,
    message: PropTypes.string,
    element: PropTypes.string,
  };

  static defaultProps = {
    classNames: '',
    message: '',
  };

  render() {
    const { element, classNames, message, icon } = this.props;
    const classes = cx(classNames);

    return (
      <div className={classes}>
        <Icon icon={icon} />
        <h2>{message}</h2>
      </div>
    );
  }
}
