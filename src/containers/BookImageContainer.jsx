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
  addToMyLibrary: book => dispatch(actions.addToMyLibrary(book)),
  deleteBook: id => dispatch(actions.deleteBook(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookImage);
