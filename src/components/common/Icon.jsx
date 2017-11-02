import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default class Icon extends Component {
  static displayName = 'BAHIcon';

  static propTypes = {
    className: PropTypes.string,
    icon: PropTypes.string.isRequired,
    altText: PropTypes.string,
  };

  static defaultProps = {
    className: '',
    altText: '',
  };

  render() {
    const { icon, className, altText, ...props } = this.props;
    const classes = cx('fa', `fa-${icon}`, className);

    return (
      <i className={classes} {...props} title={altText} />
    );
  }
}
