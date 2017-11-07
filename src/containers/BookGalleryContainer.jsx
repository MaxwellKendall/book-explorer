import { connect } from 'react-redux';
import * as actions from '../actions/books';

import BookGallery from '../components/BookGallery';

const mapStateToProps = state => ({
  loading: state.ui.loading,
  totalSearched: state.books.totalSearched,
});

const mapDispatchToProps = dispatch => ({
  getSearchedBooks: searchTerm => dispatch(actions.getSearchedBooks(searchTerm)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookGallery);
