import React, { Component } from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';
import cx from 'classnames';

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
    setLoading: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    selectBook: PropTypes.func.isRequired,
  };

  static defaultProps = {
    disableOnClickOutside: false,
    loading: false,
  };

  handleClose = () => {
    document.body.classList.remove('modal--open');
    this.props.setLoading(false);
    this.props.hideModal();
    this.props.selectBook('0');
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
      markup = modal.title.length > 55 ? <h1>{`${modal.title.substr(0, 50)}...`}</h1> : <h1>{modal.title}</h1>;
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

  renderModalIcons = () => {
    const { loading, modal } = this.props;
    const { handleAddToMyLibrary, handleDeleteBook, activeBook } = modal;
    const library = cx({ 'hidden': window.location.href.substr(35) === '/library' });
    const searchedBooks = cx({ 'hidden': window.location.href.substr(21) ===  '/book-explorer' });

    return (
      <div className="modal__icons">
        <span className={`${library} modal__button--add`}>
          <Icon onClick={!loading ? handleAddToMyLibrary : null} icon="plus-circle" />
        </span>
        <span className={`${searchedBooks} modal__button--delete`}>
          <Icon onClick={!loading ? handleDeleteBook : null} icon="trash" />
        </span>
      </div>
    );
  }

  renderModal = () => {
    const { modal } = this.props;
    let markup = null;

    if (modal) {
      document.body.classList.add('modal--open');

      markup = (
        <div className="modal">
          <div className="modal__header">
            {this.renderTitle()}
            {this.renderModalIcons()}
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

  render() {
    return this.renderModal();
  }
}

export default onClickOutside(ModalInside);
