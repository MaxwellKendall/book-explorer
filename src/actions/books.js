import { createAction } from 'redux-actions';
import axios from 'axios';

import * as uiActions from './ui';

export const selectBook = createAction('BOOK_SELECTED');
export const searchBooks = createAction('SEARCH_BOOKS');
export const addToMyLibrary = createAction('ADD_TO_MY_LIBRARY');
export const deleteBook = createAction('DELETE_BOOK');
export const setBookIndex = createAction('SET_BOOKINDEX');
export const setSearchTerm = createAction('SET_SEARCHTERM');
export const setTotalSearched = createAction('SET_TOTAL_SEARCHED');

export const updateLibrary = (book, type) => (
  (dispatch) => {
    if (type === 'add') {
      const newBook = { ...book, added: true };
      dispatch(addToMyLibrary(newBook));
    } else if (type === 'remove') {
      dispatch(deleteBook(book.id));
    }
    dispatch(uiActions.showNotification({ show: true, info: book }));
    setTimeout(() => dispatch(uiActions.showNotification({ show: false, info: '' })), 2000);
  }
);

export const getSearchedBooks = (searchTerm, maxResults = 40, bookIndex = 1) => (
  (dispatch) => {
    dispatch(uiActions.setLoading(true));
    const root = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`;
    return axios.get(`${root}&maxResults=${maxResults}&startIndex=${bookIndex}`)
      .then((response) => {
        console.log('API Response', response);
        const totalItems = response.data.totalItems;
        const books = response.data.items;
        const searchedBooks = books.map((book) => {
          const { volumeInfo, id } = book;
          const { title, pageCount, imageLinks, industryIdentifiers, description, subtitle, publisher, publishedDate, previewLink, authors } = volumeInfo;
          return { id, title, subtitle, publisher, publishedDate, description, pageCount, imageLinks, industryIdentifiers, previewLink, authors };
        });
        dispatch(searchBooks(searchedBooks));
        dispatch(setTotalSearched(totalItems));
        dispatch(uiActions.setLoading(false));
      })
      .catch((err) => {
        console.warn('API Error:', err); // eslint-disable-line no-console
        dispatch(uiActions.setLoading(false));
        dispatch(setTotalSearched(0));
        dispatch(searchBooks([{}]));
        dispatch(uiActions.setError(true));
      });
  }
);
