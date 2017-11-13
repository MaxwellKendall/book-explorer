/* eslint-disable import/prefer-default-export */
import { createSelector } from 'reselect';

const getLibraryBooks = state => state.books.libraryBooks;
const getSearchedBooks = state => state.books.searchedBooks;
const getActiveBookId = state => state.books.activeBookId;

export const getActiveSearchedBook = createSelector(
  [getActiveBookId, getSearchedBooks],
  // use find()
  (activeBookId, books) => {
    const rtrn = books.filter(el => el.id === activeBookId);
    return rtrn[0];
  },
);

export const getActiveLibraryBook = createSelector(
  [getActiveBookId, getLibraryBooks],
  // use find()
  (activeBookId, books) => {
    const rtrn = books.filter(el => el.id === activeBookId);
    return rtrn[0];
  },
);
