import React from 'react';
import PropTypes from 'prop-types';

import ModalInside from './ModalInside';

const Modal = (props) => {
  let markup = null;

  if (props.modal) {
    markup = (
      <div className="modal__overlay">
        <ModalInside disableOnClickOutside={props.modal.disableOnClickOutside} {...props} />
      </div>
    );
  }
  return markup;
};

Modal.displayName = 'BAHModal';

export default Modal;
