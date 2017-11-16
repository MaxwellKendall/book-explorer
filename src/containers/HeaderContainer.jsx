import { connect } from 'react-redux';
import * as actions from '../actions/books';
import Header from '../components/Header';

const mapDispatchToProps = dispatch => ({
  setSearchTerm: term => dispatch(actions.setSearchTerm(term)),
  getSearchedBooks: (searchTerm, maxResults, bookIndex) => dispatch(actions.getSearchedBooks(searchTerm, maxResults, bookIndex)),
  seachBooks: books => dispatch(actions.searchBooks(books)),
});

export default connect(null, mapDispatchToProps)(Header);
