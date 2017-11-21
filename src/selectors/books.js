/* eslint-disable import/prefer-default-export */
import { createSelector } from 'reselect';

const getLocation = state => state.router.location.pathname;
const getActiveBookId = state => state.books.activeBookId;
const getLibraryBooks = state => state.books.libraryBooks;
const getSearchedBooks = state => state.books.searchedBooks;

export const getActiveBook = createSelector(
  [getLocation, getActiveBookId, getLibraryBooks, getSearchedBooks],
  (location, activeBookId, libraryBooks, searchedBooks) => {
    let book;
    if (location === '/book-explorer') {
      book = searchedBooks.find(el => el.id === activeBookId);
    } else if (location === '/book-explorer/library') {
      book = libraryBooks.find(el => el.id === activeBookId);
    }
    return book;
  },
);

export const getBooks = createSelector(
  [getLocation, getLibraryBooks, getSearchedBooks],
  (location, libraryBooks, searchedBooks) => {
    let books;
    if (location === '/book-explorer') {
      books = searchedBooks;
    } else if (location === '/book-explorer/library') {
      books = libraryBooks;
    }
    return books;
  },
);
