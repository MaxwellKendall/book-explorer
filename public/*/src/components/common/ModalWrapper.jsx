import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Modal from './Modal';

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
export function showModal(modal) {
  let $el = document.getElementById('js-modal-container');

  if (!$el) {
    $el = document.createElement('div');

    $el.setAttribute('id', 'js-modal-container');
    $el.classList.add('modal__overlay');

    document.body.appendChild($el);
    ReactDOM.render(<ModalWrapper modal={modal} />, $el);
  } else {
    ReactDOM.render(<ModalWrapper modal={modal} />, $el);
  }
}

export function closeModal() {
  showModal(null);
}

class ModalWrapper extends Component {
  static displayName = 'BAH Modal Wrapper';

  static propTypes = {
    modal: PropTypes.object,
  };

  static defaultProps = {
    modal: null,
  };

  render() {
    const { modal } = this.props;
    const $el = document.getElementById('js-modal-container');

    let markup = <span />;

    if (modal) {
      markup = (
        <Modal
          modal={modal}
          closeModal={modal.closeModal}
          disableOnClickOutside={modal.disableOnClickOutside || false}
        />
      );
    }

    return ReactDOM.createPortal(markup, $el);
  }
}
