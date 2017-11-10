import { connect } from 'react-redux';
// import * as actions from '../actions/books';

import LibraryBooks from '../components/LibraryBooks';

import * as selectors from '../selectors/books';

const mapStateToProps = state => ({
  libraryBooks: state.books.libraryBooks,
  activeLibraryBook: selectors.getActiveLibraryBook(state),
});

// const mapDispatchToProps = dispatch => ({});

// export default connect(mapStateToProps, mapDispatchToProps)(LibraryBooks);
export default connect(mapStateToProps)(LibraryBooks);
