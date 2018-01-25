import { handleActions } from 'redux-actions';
import * as actions from '../actions/books';

/**
 * initialState will be the first thing passed to the reducers and is therefore what you state * * will be by default until any actions are executed
 */

const initialState = {
  activeBookId: '0',
  searchedBooks: [],
  totalSearched: 0,
  libraryBooks: [],
  bookIndex: 0,
  searchTerm: '',
};

export default handleActions({
  // make each action return the object you want state to be for the given property
  [actions.searchBooks]: (state, action) => ({ ...state, searchedBooks: action.payload }),
  [actions.setTotalSearched]: (state, action) => ({ ...state, totalSearched: action.payload }),
  [actions.setSearchTerm]: (state, action) => ({ ...state, searchTerm: action.payload }),
  [actions.selectBook]: (state, action) => ({ ...state, activeBookId: action.payload }),
  [actions.addToMyLibrary]: (state, action) => ({ ...state, libraryBooks: [...new Set([...state.libraryBooks, action.payload])] }), // set only allows for unique values https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
  [actions.deleteBook]: (state, action) => ({ ...state, libraryBooks: [...state.libraryBooks.filter(book => book.id !== action.payload)] }),
  [actions.setBookIndex]: (state, action) => ({ ...state, bookIndex: action.payload }),
}, initialState);
