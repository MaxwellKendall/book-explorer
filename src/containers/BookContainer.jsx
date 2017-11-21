import { connect } from 'react-redux';

import * as actions from '../actions/books';
import * as uiActions from '../actions/ui';
import * as selectors from '../selectors/books';

import Book from '../components/Book';

const mapStateToProps = state => ({
  location: state.router.location.pathname,
  loading: state.ui.loading,
  activeBook: selectors.getActiveBook(state),
});

const mapDispatchToProps = dispatch => ({
  setModal: bool => dispatch(uiActions.setModal(bool)),
  selectBook: id => dispatch(actions.selectBook(id)),
  addToMyLibrary: book => dispatch(actions.addToMyLibrary(book)),
  deleteBook: id => dispatch(actions.deleteBook(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Book);
