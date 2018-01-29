import { connect } from 'react-redux';

import * as actions from '../actions/books';
import * as uiActions from '../actions/ui';
import * as selectors from '../selectors/books';

import BookImage from '../components/BookImage';

const mapStateToProps = state => ({
  loading: state.ui.loading,
  location: state.router.location.pathname,
  activeBook: selectors.getActiveBook(state),
  books: selectors.getBooks(state),
});

const mapDispatchToProps = dispatch => ({
  setModal: bool => dispatch(uiActions.setModal(bool)),
  setLoading: bool => dispatch(uiActions.setLoading(bool)),
  selectBook: id => dispatch(actions.selectBook(id)),
  updateLibrary: (book, type, bool, books, closeModal) => dispatch(actions.updateLibrary(book, type, bool, books, closeModal)),
  previousBook: (activeBook, books, loading, closeModal) => dispatch(actions.previousBook(activeBook, books, loading, closeModal)),
  nextBook: (activeBook, books, loading, closeModal) => dispatch(actions.nextBook(activeBook, books, loading, closeModal)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookImage);
