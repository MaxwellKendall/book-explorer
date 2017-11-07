import { connect } from 'react-redux';
import * as actions from '../actions/books';
import Library from '../components/Library';

import * as selectors from '../selectors/books';

const mapStateToProps = state => ({
  books: state.books.books,
  activeLibraryBook: selectors.getActiveLibraryBook(state),
  totalSearched: state.books.totalSearched,
});

const mapDispatchToProps = dispatch => ({
  deleteBook: book => dispatch(actions.deleteBook(book)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Library);
