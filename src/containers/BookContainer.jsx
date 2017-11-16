import { connect } from 'react-redux';

import * as actions from '../actions/books';
import * as uiActions from '../actions/ui';

import Book from '../components/Book';

const mapStateToProps = state => ({
  loading: state.ui.loading,
  modal: state.ui.modal,
});

const mapDispatchToProps = dispatch => ({
  showModal: modal => dispatch(uiActions.showModal(modal)),
  hideModal: () => dispatch(uiActions.hideModal()),
  selectBook: id => dispatch(actions.selectBook(id)),
  addToMyLibrary: book => dispatch(actions.addToMyLibrary(book)),
  deleteBook: id => dispatch(actions.deleteBook(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Book);
