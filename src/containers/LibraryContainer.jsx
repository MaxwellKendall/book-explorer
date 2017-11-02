import { connect } from 'react-redux';
import * as actions from '../actions/books';
import Library from '../components/Library';

const mapStateToProps = state => ({
  books: state.books.books,
});

const mapDispatchToProps = dispatch => ({
  deleteBook: book => dispatch(actions.deleteBook(book)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Library);
