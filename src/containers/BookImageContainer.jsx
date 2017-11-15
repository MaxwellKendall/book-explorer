import { connect } from 'react-redux';

import * as actions from '../actions/books';
import * as uiActions from '../actions/ui';
import * as selectors from '../selectors/books';

import BookImage from '../components/BookImage';

const mapStateToProps = state => ({
  loading: state.ui.loading,
  activeBookId: state.books.activeBookId,
  activeLibraryBook: selectors.getActiveLibraryBook(state),
  activeSearchedBook: selectors.getActiveSearchedBook(state),
});

const mapDispatchToProps = dispatch => ({
  setLoading: bool => dispatch(uiActions.setLoading(bool)),
  selectBook: id => dispatch(actions.selectBook(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookImage);
