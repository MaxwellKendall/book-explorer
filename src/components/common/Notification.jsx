import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Icon from './Icon';

class Notification extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.notificationContainer = document.getElementById('js-notification-container');
    this.notification = document.createElement('div');
  }

  componentWillMount() {
    this.notification.classList.add(`js-${this.props.id}`);
    this.notification.classList.add(`notification__${this.props.type}`);
    this.notificationContainer.appendChild(this.notification);
  }

  componentDidMount() {
    this.removeNotification();
  }

  componentWillReceiveProps(nextProps, prevProps) {
    if (this.props.id !== nextProps.id) {
      this.notificationContainer.appendChild(this.notification);
      this.notification.classList.remove(`js-${prevProps.id}`);
      this.notification.classList.add(`js-${this.props.id}`);
    }
  }

  componentDidUpdate() {
    this.removeNotification();
  }

  componentWillUnmount() {
    this.notificationContainer.removeChild(this.notification);
  }

  removeNotification() {
    setTimeout(() => {
      this.notificationContainer.removeChild(this.notification);
    }, 1000);
  }

  render() {
    return (
      ReactDOM.createPortal(
        this.props.children,
        this.notification,
      )
    );
  }
}

export const showNotification = (content) => {
  let $el = document.getElementById('js-notification-container');

  if (!$el) {
    $el = document.createElement('div');
    $el.setAttribute('id', 'js-notification-container');
    document.body.appendChild($el);

    ReactDOM.render(<Notification id={content.id} type={content.type}>
      <Icon icon={content.icon} />
      <h2>{content.message}</h2>
    </Notification>, $el);
  } else {
    ReactDOM.render(<Notification id={content.id}>
      <Icon icon={content.icon} />
      <h2>{content.message}</h2>
    </Notification>, $el);
  }
}
