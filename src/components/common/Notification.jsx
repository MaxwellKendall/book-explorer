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
    // this initiates the component with all the right classes
    this.notification.className = '';
    this.notification.classList.add(`js-${this.props.id}`);
    this.notification.classList.add(`notification__${this.props.type}`);
    this.notificationContainer.appendChild(this.notification);
  }

  componentDidMount() {
    // once everything is mounted, begin to remove the notification
    this.removeNotification();
  }

  componentWillReceiveProps(nextProps) {
    /*
     * if another item is added, lets either
     *   (a) put the notification markup back on the dom or
     *   (b) change the markup already there
     */
    if (this.props.id !== nextProps.id) {
      // updateNotifiaction deals with either (a) or (b)
      console.log(nextProps);
      this.updateNotification({
        oldId: this.props.id,
        newId: nextProps.id,
        oldType: this.props.type,
        newType: nextProps.type,
      });
    }
  }

  componentDidUpdate() {
    // whenever the component is successfully updated, begin to remove/unmount
    this.removeNotification();
  }

  componentWillUnmount() {
    this.notificationContainer.removeChild(this.notification);
  }

  updateNotification = (props) => {
    this.clearTimeout();
    this.notification.classList.replace(`js-${props.oldId}`, `js-${props.newId}`);
    this.notification.classList.replace(`notification__${props.oldType}`, `notification__${props.newType}`);
    this.notificationContainer.appendChild(this.notification);
    // if (document.getElementById('js-notification-container').children.length === 0) {
    //   this.notificationContainer.appendChild(this.notification);
    // }
  }

  clearTimeout = () => {
    clearTimeout(window.timeout);
  }

  removeNotification = () => {
    window.timeout = setTimeout(() => {
      this.notificationContainer.removeChild(this.notification);
    }, 1750);
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
    ReactDOM.render(<Notification id={content.id} type={content.type}>
      <Icon icon={content.icon} />
      <h2>{content.message}</h2>
    </Notification>, $el);
  }
}
