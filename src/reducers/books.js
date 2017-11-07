import { handleActions } from 'redux-actions';
import * as actions from '../actions/books';

const initialState = {
  activeBookId: null,
  searchedBooks: [],
  books: [],
  bookIndex: null,
};

export default handleActions({
  // make each function return the object you want state to be for the given object
  [actions.searchBooks]: (state, action) => ({ ...state, searchedBooks: action.payload.searchedBooks, totalSearched: action.payload.totalItems }),
  [actions.selectBook]: (state, action) => ({ ...state, activeBookId: action.payload }),
  [actions.addToMyLibrary]: (state, action) => ({ ...state, books: [action.payload, ...state.books] }),
  [actions.deleteBook]: (state, action) => ({ ...state, books: [...action.payload] }),
}, initialState);
