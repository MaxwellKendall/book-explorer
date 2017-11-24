import { connect } from 'react-redux';

import SearchedBooks from '../components/SearchedBooks';
import * as selectors from '../selectors/books';

const mapStateToProps = state => ({
  loading: state.ui.loading,
  modal: state.ui.modal,
  error: state.ui.error,
  notification: state.ui.notification,
  searchedBooks: state.books.searchedBooks,
  totalSearched: state.books.totalSearched,
});

export default connect(mapStateToProps)(SearchedBooks);
