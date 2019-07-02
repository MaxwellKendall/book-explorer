import React, { Component } from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';

import Icon from './Icon';

class Modal extends Component {
  static displayName = 'BAH Modal';

  /*
   * The modal object must have at least a title and a Component:
   * {
   *   Content: PropTypes.component,
   *   title: PropTypes.string,
   * }
   *
   * The modal can have an onClickOutside callback:
   * {
   *   onOutsideClick: PropTypes.func,
   * }
   *
   * To disable closing on click outside of the modal:
   * {
   *   disableOnClickOutside: PropTypes.bool // default: false
   * }
   */
  static propTypes = {
    modal: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    closeModal: PropTypes.func.isRequired,
    disableOnClickOutside: PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
  };

  static defaultProps = {
    disableOnClickOutside: false,
  };

  handleClose = () => {
    document.body.classList.remove('modal--open');
console.log('helllloooooo', this.props);
    this.props.closeModal();
  }

  handleClickOutside = () => {
    const { onOutsideClick } = this.props.modal;

    if (onOutsideClick && typeof (onOutsideClick) === 'function') onOutsideClick();

    this.handleClose();
  }

  renderTitle = () => {
    const { modal } = this.props;
    let markup = <h1>Title</h1>;

    if (modal) {
      markup = <h1>{modal.title}</h1>;
    }

    return markup;
  }

  renderContent = () => {
    const { modal } = this.props;
    let markup = <div />;

    if (modal) {
      markup = modal.Content;
    }

    return markup;
  }

  render() {
    const { modal } = this.props;
    let markup = null;

    if (modal) {
      document.body.classList.add('modal--open');

      markup = (
        <div className="modal">
          <div className="modal__header">
            {this.renderTitle()}
            <span className="modal__button--close">
              <Icon icon="times" onClick={this.handleClose} aria-hidden="true" role="button" />
            </span>
          </div>
          <div className="modal__content">
            {this.renderContent()}
          </div>
        </div>
      );
    }

    return markup;
  }
}

export default onClickOutside(Modal);
