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
     * if Library is updated more we:
     *   (a) clear any existing Timeouts
     *   (b) decipher if
     *     (1) <Notification /> has been unmounted
     *        (i) add the notification to the DOM
     *     (2) <Notification /> is still unmounted
     *        (ii) update to show the right info
     */
    if (this.props.id !== nextProps.id || this.props.type !== nextProps.type) {
      // updateNotifiaction deals with either (a) & (b) above
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
    this.clearTimeout(); // clear any existing timeouts
    this.notification.classList.replace(`js-${props.oldId}`, `js-${props.newId}`); // update classes of Notification element
    this.notification.classList.replace(`notification__${props.oldType}`, `notification__${props.newType}`); // update classes of Notification element
    this.notificationContainer.appendChild(this.notification); // update DOM
  }

  clearTimeout = () => {
    clearTimeout(window.timeout); // remove the timeout
  }

  removeNotification = () => {
    // wait a second then remove notification
    window.timeout = setTimeout(() => {
      this.notificationContainer.removeChild(this.notification);
    }, 750);
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
      <h2 className="notification__message"><span className="notification__book">{`${content.book} `}</span>{content.message}</h2>
    </Notification>, $el);
  } else {
    ReactDOM.render(<Notification id={content.id} type={content.type}>
      <Icon icon={content.icon} />
      <h2 className="notification__message"><span className="notification__book">{`${content.book} `}</span>{content.message}</h2>
    </Notification>, $el);
  }
}

/**
 * I. componentWillReceiveProps: Line 33
 *   Whenever props for the component update, this method executes
 *     - nextProps param is available for use
 *     - see notes/components/summary for more info on reactlifecycle methods
 * II. createPortal: Line 83
 *   documentation: https://reactjs.org/docs/portals.html
 *     - Use a portal when you want to render an element outside the typical flow of the DOM; Modals, Notifications, etc
 */
