import { connect } from 'react-redux';
import * as actions from '../actions/books';

import BookGallery from '../components/BookGallery';
import * as selectors from '../selectors/books';

const mapStateToProps = state => ({
  searchedBooks: state.books.searchedBooks,
  books: state.books.books,
  loading: state.ui.loading,
  totalSearched: state.books.totalSearched,
  activeSearchedBook: selectors.getActiveSearchedBook(state),
});

const mapDispatchToProps = dispatch => ({
  getSearchedBooks: searchTerm => dispatch(actions.getSearchedBooks(searchTerm)),
  addToMyLibrary: book => dispatch(actions.addToMyLibrary(book)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookGallery);
