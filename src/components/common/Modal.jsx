import React from 'react';
import PropTypes from 'prop-types';

import Icon from './Icon';
import ModalInside from './ModalInside';

const Modal = (props) => {
  let markup = null;

  if (props.modal) {
    markup = (
      <div className="modal__overlay">
        <ModalInside
          loading={props.modal.loading}
          goNext={props.goNext}
          goPrevious={props.goPrevious}
          handleDeleteBook={props.handleDeleteBook}
          onClickIcon={props.onClickIcon}
          disableOnClickOutside={props.modal.disableOnClickOutside} {...props} />
      </div>
    );
  }

  return markup;
};

Modal.displayName = 'BAHModal';
Modal.propTypes = {
  goNext: PropTypes.func,
  goPrevious: PropTypes.func,
};

export default Modal;
