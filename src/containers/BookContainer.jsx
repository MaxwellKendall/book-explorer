import { connect } from 'react-redux';

import * as actions from '../actions/books';
import * as uiActions from '../actions/ui';
import * as selectors from '../selectors/books';

import Book from '../components/Book';

const mapStateToProps = state => ({
  loading: state.ui.loading,
  activeId: state.books.activeBookId,
  activeLibraryBook: selectors.getActiveLibraryBook(state),
  activeSearchedBook: selectors.getActiveSearchedBook(state),
});

const mapDispatchToProps = dispatch => ({
  showModal: modal => dispatch(uiActions.showModal(modal)),
  setLoading: bool => dispatch(uiActions.setLoading(bool)),
  selectBook: id => dispatch(actions.selectBook(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Book);
