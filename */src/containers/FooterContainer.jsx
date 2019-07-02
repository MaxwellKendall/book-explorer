import { connect } from 'react-redux';
import * as actions from '../actions/books';
import Footer from '../components/Footer';

const mapStateToProps = state => ({
  bookIndex: state.books.bookIndex,
  searchTerm: state.books.searchTerm,
  totalSearched: state.books.totalSearched,
});

const mapDispatchToProps = dispatch => ({
  setBookIndex: num => dispatch(actions.setBookIndex(num)),
  getSearchedBooks: (searchTerm, maxResults, bookIndex) => dispatch(actions.getSearchedBooks(searchTerm, maxResults, bookIndex)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
