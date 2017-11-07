import { connect } from 'react-redux';
import * as actions from '../actions/books';

import SearchedBooks from '../components/SearchedBooks';
import * as selectors from '../selectors/books';

const mapStateToProps = state => ({
  activeSearchedBook: selectors.getActiveSearchedBook(state),
  searchedBooks: state.books.searchedBooks,
  totalSearched: state.books.totalSearched,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SearchedBooks);
