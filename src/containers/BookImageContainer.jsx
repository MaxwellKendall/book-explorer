import { connect } from 'react-redux';

import * as actions from '../actions/books';
import * as uiActions from '../actions/ui';
import * as selectors from '../selectors/books';

import BookImage from '../components/BookImage';

const mapStateToProps = state => ({
  loading: state.ui.loading,
  activeBook: selectors.getActiveBook(state),
  books: selectors.getBooks(state),
});

const mapDispatchToProps = dispatch => ({
  setModal: bool => dispatch(uiActions.setModal(bool)),
  setLoading: bool => dispatch(uiActions.setLoading(bool)),
  selectBook: id => dispatch(actions.selectBook(id)),
  updateLibrary: (book, type) => dispatch(actions.updateLibrary(book, type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookImage);
