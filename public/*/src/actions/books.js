import { createAction } from 'redux-actions';
import axios from 'axios';

import * as notification from '../components/common/Notification';

import * as uiActions from './ui';

export const selectBook = createAction('BOOK_SELECTED');
export const searchBooks = createAction('SEARCH_BOOKS');
export const addToMyLibrary = createAction('ADD_TO_MY_LIBRARY');
export const deleteBook = createAction('DELETE_BOOK');
export const setBookIndex = createAction('SET_BOOKINDEX');
export const setSearchTerm = createAction('SET_SEARCHTERM');
export const setTotalSearched = createAction('SET_TOTAL_SEARCHED');

const showNotification = (book, type) => {
  if (type === 'add') {
    notification.showNotification({
      icon: 'check',
      book: `${book.title}`,
      message: 'has been added to your library!',
      id: `${book.id}`,
      type: 'added',
    });
  } else if (type === 'remove') {
    notification.showNotification({
      icon: 'trash',
      book: `${book.title}`,
      message: 'has been deleted from your library!',
      id: `${book.id}`,
      type: 'deleted',
    });
  }
};

export const updateLibrary = (book, type, bool, books = [], closeModal = () => {}) => (
  (dispatch) => {
    if (type === 'add') {
      dispatch(addToMyLibrary(book));
      showNotification(book, type);
    } else if (type === 'remove' && !bool) {
      dispatch(deleteBook(book.id));
      showNotification(book, type);
    } else if (type === 'remove' && bool && books.length > 1) {
      const previousBook = books.indexOf(book) - 1;
      dispatch(selectBook(books[previousBook].id));
      dispatch(deleteBook(book.id));
      showNotification(book, type);
    } else if (type === 'remove' && bool && books.length === 1) {
      closeModal();
      dispatch(deleteBook(book.id));
      showNotification(book, type);
    }
  }
);

export const previousBook = (activeBook, books, loading, closeModal) => (
  (dispatch) => {
    const previousBookIndex = books.indexOf(activeBook) - 1;

    if (previousBookIndex > -1 && !loading) {
      dispatch(selectBook(books[previousBookIndex].id));
    } else if (previousBookIndex === -1) {
      closeModal();
    }
  }
);

export const nextBook = (activeBook, books, loading, closeModal) => (
  (dispatch) => {
    const nextBookIndex = books.indexOf(activeBook) + 1;
    if (nextBookIndex < books.length && !loading) {
      dispatch(selectBook(books[nextBookIndex].id));
    }
    if (nextBookIndex > books.length - 1) {
      closeModal();
    }
  }
);

export const getSearchedBooks = (searchTerm, maxResults = 40, bookIndex = 1) => (
  (dispatch) => {
    dispatch(uiActions.setLoading(true));
    const root = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`;
    return axios.get(`${root}&maxResults=${maxResults}&startIndex=${bookIndex}`)
      .then((response) => {
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
        dispatch(searchBooks([]));
        dispatch(uiActions.setError(true));
      });
  }
);
