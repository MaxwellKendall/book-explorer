import { connect } from 'react-redux';

import * as actions from '../actions/books';
import * as uiActions from '../actions/ui';
import * as selectors from '../selectors/books';

import Book from '../components/Book';

/**
 * mapStateToProps:
 * takes state as a parameter and returns an object
 * this object will be seen in the component associated with this container as props
 */

const mapStateToProps = state => ({
  location: state.router.location.pathname, // from connectedRouter
  loading: state.ui.loading, // know when to show loading component
  modal: state.ui.modal, // need to know when modal is showing
  activeBook: selectors.getActiveBook(state), // this is making use of the selector we defined
  libraryBooks: state.books.libraryBooks,
});

/**
 * mapDispatchToProps:
 *   - makes actions available for execution within our components
 */

const mapDispatchToProps = dispatch => ({
  setModal: bool => dispatch(uiActions.setModal(bool)),
  selectBook: id => dispatch(actions.selectBook(id)),
  updateLibrary: (book, type) => dispatch(actions.updateLibrary(book, type)),
});

/**
 * connect:
 *   - actually links the actions and state defined above
 *   - first param is always mapStateToProps
 *   - second param is always mapDispatchToProps
 */

export default connect(mapStateToProps, mapDispatchToProps)(Book);
