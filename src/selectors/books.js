/* eslint-disable import/prefer-default-export */
import { createSelector } from 'reselect';

// functions that return state:
const getLocation = state => state.router.location.pathname;
const getActiveBookId = state => state.books.activeBookId;
const getLibraryBooks = state => state.books.libraryBooks;
const getSearchedBooks = state => state.books.searchedBooks;

// selectors that return computed state
export const getActiveBook = createSelector(
  [getLocation, getActiveBookId, getLibraryBooks, getSearchedBooks], // functions
  (location, activeBookId, libraryBooks, searchedBooks) => { // return value of functions
    let book;
    if (location === '/book-explorer') { // when location == x, grab activeBook from bookArrayX
      book = searchedBooks.find(el => el.id === activeBookId);
    } else if (location === '/book-explorer/library') { // when location == y, grab activeBook from bookArrayY
      book = libraryBooks.find(el => el.id === activeBookId);
    }
    return book;
  },
);

export const getBooks = createSelector(
  [getLocation, getLibraryBooks, getSearchedBooks], // functions
  (location, libraryBooks, searchedBooks) => { // return value of functions
    let books;
    if (location === '/book-explorer') { // when location = x; make books = bookArrayX
      books = searchedBooks;
    } else if (location === '/book-explorer/library') { // when location = x; make books = bookArrayX
      books = libraryBooks;
    }
    return books;
  },
);
