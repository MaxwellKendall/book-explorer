import { connect } from 'react-redux';

import SearchedBooks from '../components/SearchedBooks';
import * as selectors from '../selectors/books';

const mapStateToProps = state => ({
  loading: state.ui.loading,
  modal: state.ui.modal,
  error: state.ui.error,
  searchedBooks: selectors.getBooks(state),
  totalSearched: state.books.totalSearched,
});

export default connect(mapStateToProps)(SearchedBooks);
