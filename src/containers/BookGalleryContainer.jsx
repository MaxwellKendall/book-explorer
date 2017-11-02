import { connect } from 'react-redux';
import * as actions from '../actions/books';

import BookGallery from '../components/BookGallery';

const mapStateToProps = state => ({
  searchedBooks: state.books.searchedBooks,
  books: state.books.books,
});

const mapDispatchToProps = dispatch => ({
  getSearchedBooks: searchTerm => dispatch(actions.getSearchedBooks(searchTerm)),
  selectBook: book => dispatch(actions.selectBook(book)),
  addToMyLibrary: book => dispatch(actions.addToMyLibrary(book)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookGallery);
