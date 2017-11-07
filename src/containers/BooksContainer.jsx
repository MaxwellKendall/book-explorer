import { connect } from 'react-redux';
import * as actions from '../actions/books';
import * as uiActions from '../actions/ui';

import Books from '../components/Books';

const mapStateToProps = state => ({
  loading: state.ui.loading,
  libraryBooks: state.books.books,
});

const mapDispatchToProps = dispatch => ({
  setLoading: bool => dispatch(uiActions.setLoading(bool)),
  selectBook: book => dispatch(actions.selectBook(book)),
  deleteBook: book => dispatch(actions.deleteBook(book)),
  addToMyLibrary: book => dispatch(actions.addToMyLibrary(book)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Books);
