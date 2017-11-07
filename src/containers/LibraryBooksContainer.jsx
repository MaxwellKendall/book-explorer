import { connect } from 'react-redux';
import * as actions from '../actions/books';
import Library from '../components/Library';

import * as selectors from '../selectors/books';

const mapStateToProps = state => ({
  books: state.books.books,
  activeLibraryBook: selectors.getActiveLibraryBook(state),
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Library);
