import { connect } from 'react-redux';

import * as actions from '../actions/books';
import * as uiActions from '../actions/ui';
import * as selectors from '../selectors/books';

import Book from '../components/Book';

/**
 * reference on component/container application design pattern:
 *   -- https://medium.com/@learnreact/container-components-c0e67432e005
 * This is a container component that provides the state and functions which update state to the specified component
 */

const mapStateToProps = state => ({
  location: state.router.location.pathname,
  loading: state.ui.loading,
  modal: state.ui.modal,
  activeBook: selectors.getActiveBook(state),
  libraryBooks: state.books.libraryBooks,
});

const mapDispatchToProps = dispatch => ({
  setModal: bool => dispatch(uiActions.setModal(bool)),
  selectBook: id => dispatch(actions.selectBook(id)),
  updateLibrary: (book, type) => dispatch(actions.updateLibrary(book, type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Book);
