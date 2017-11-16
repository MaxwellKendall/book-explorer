import { connect } from 'react-redux';

import LibraryBooks from '../components/LibraryBooks';

import * as selectors from '../selectors/books';

const mapStateToProps = state => ({
  loading: state.ui.loading,
  modal: state.ui.modal,
  libraryBooks: state.books.libraryBooks,
  activeLibraryBook: selectors.getActiveLibraryBook(state),
});

export default connect(mapStateToProps)(LibraryBooks);
