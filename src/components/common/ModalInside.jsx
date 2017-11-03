import React, { Component } from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';

import Icon from './Icon';

import * as utils from '../../utils/utils';

class ModalInside extends Component {
  static displayName = 'BAHModalInside';

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
   * Anything else that you pass in the modal object is passed along to the content.
   */
  static propTypes = {
    modal: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    loading: PropTypes.bool.isRequired,
    hideModal: PropTypes.func.isRequired,
    goNext: PropTypes.func.isRequired,
    goPrevious: PropTypes.func.isRequired,
    handleDeleteBook: PropTypes.func.isRequired,
    handleAddToMyLibrary: PropTypes.func.isRequired,
  };

  static defaultProps = {
    disableOnClickOutside: false,
  };

  handleClose = () => {
    document.body.classList.remove('modal--open');

    this.props.hideModal();
  }

  handleClickOutside = () => {
    const { onOutsideClick } = this.props.modal;

    if (onOutsideClick && typeof (onOutsideClick) === 'function') onOutsideClick();

    this.handleClose();
  }

  deleteBook = () => {
    const notification_success = document.querySelector('.notification__library--success');
    this.props.handleDeleteBook(this.props.modal.activeBook);
    this.props.hideModal();
    notification_success.innerHTML = `${this.props.modal.activeBook.title} has been deleted`;
    utils.removeClass(notification_success, 'hidden');
    setTimeout(() => notification_success.classList.add('hidden'), 3000);
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
      const { Content, onOutsideClick, title, ...props } = modal;

      markup = <Content {...props} />;
    }

    return markup;
  }

  renderModal = () => {
    const { modal, loading } = this.props;
    let markup = null;

    if (modal) {
      document.body.classList.add('modal--open');

      markup = (
        <div id="modal123">
          <div className="modal__header">
            {this.renderTitle()}
            <span className="notification-modal__library--success hidden">This book was added to your library!</span>
            <span className="notification-modal__library--error hidden">You already got this book in your library, homie!</span>
            <span className="modal__button--close">
              <Icon icon="times" onClick={this.handleClose} aria-hidden="true" role="button" />
            </span>
            <span className="modal__button--right">
              <Icon onClick={!loading ? this.props.goNext : null} icon="arrow-right" />
            </span>
            <span className="modal__button--left">
              <Icon onClick={!loading ? this.props.goPrevious : null} icon="arrow-left" />
            </span>
            <span className="modal__button--add">
              <Icon onClick={!loading ? () => this.props.handleAddToMyLibrary(this.props.modal.activeBook) : null} icon="plus-circle" />
            </span>
            <span className="modal__button--delete">
              <Icon onClick={!loading ? () => this.deleteBook() : null} icon="trash" />
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

  render() {
    return this.renderModal();
  }
}

export default onClickOutside(ModalInside);
