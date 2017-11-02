import React, { Component } from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';

import Icon from './Icon';

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
    hideModal: PropTypes.func.isRequired,
    goNext: PropTypes.func.isRequired,
    goPrevious: PropTypes.func.isRequired,
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
    const { modal } = this.props;
    let markup = null;

    if (modal) {
      document.body.classList.add('modal--open');

      markup = (
        <div id="modal123">
          <div className="modal__header">
            {this.renderTitle()}
            <span className="modal__button--close">
              <Icon icon="times" onClick={this.handleClose} aria-hidden="true" role="button" />
            </span>
            <span className="modal__button--right">
              <Icon onClick={this.props.goNext} icon="arrow-right" />
            </span>
            <span className="modal__button--left">
              <Icon onClick={this.props.goPrevious} icon="arrow-left" />
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
