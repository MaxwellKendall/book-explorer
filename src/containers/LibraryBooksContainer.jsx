import { connect } from 'react-redux';

import LibraryBooks from '../components/LibraryBooks';

import * as selectors from '../selectors/books';

const mapStateToProps = state => ({
  libraryBooks: state.books.libraryBooks,
  activeLibraryBook: selectors.getActiveLibraryBook(state),
});

export default connect(mapStateToProps)(LibraryBooks);
