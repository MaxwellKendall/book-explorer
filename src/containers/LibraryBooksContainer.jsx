import { connect } from 'react-redux';

import LibraryBooks from '../components/LibraryBooks';

const mapStateToProps = state => ({
  loading: state.ui.loading,
  modal: state.ui.modal,
  notification: state.ui.notification,
  libraryBooks: state.books.libraryBooks,
});

export default connect(mapStateToProps)(LibraryBooks);
