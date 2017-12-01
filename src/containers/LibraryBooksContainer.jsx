import { connect } from 'react-redux';
import * as selectors from '../selectors/books';

import LibraryBooks from '../components/LibraryBooks';

const mapStateToProps = state => ({
  loading: state.ui.loading,
  modal: state.ui.modal,
  libraryBooks: selectors.getBooks(state),
});

export default connect(mapStateToProps)(LibraryBooks);
