import { connect } from 'react-redux';
import * as actions from '../actions/ui';
import Modal from '../components/common/Modal';

// import * as selectors from '../selectors/books';

const mapStateToProps = state => ({
  // activeLibraryBook: selectors.getActiveLibraryBook(state),
  modal: state.ui.modal,
});

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(actions.hideModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
