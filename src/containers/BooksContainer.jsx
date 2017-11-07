import { connect } from 'react-redux';
import * as actions from '../actions/books';
import * as uiActions from '../actions/ui';

import Books from '../components/Books';

const mapStateToProps = state => ({
  books: state.books.books,
  searchedBooks: state.books.searchedBooks,
  loading: state.ui.loading,
  totalSearched: state.books.totalSearched,
});

const mapDispatchToProps = dispatch => ({
  setLoading: bool => dispatch(uiActions.setLoading(bool)),
  selectBook: book => dispatch(actions.selectBook(book)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Books);
