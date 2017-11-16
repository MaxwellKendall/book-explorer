/* eslint-disable import/prefer-default-export */
import { createSelector } from 'reselect';

const getLibraryBooks = state => state.books.libraryBooks;
const getSearchedBooks = state => state.books.searchedBooks;
const getActiveBookId = state => state.books.activeBookId;

export const getActiveSearchedBook = createSelector(
  [getActiveBookId, getSearchedBooks],
  (activeBookId, books) => books.find(el => el.id === activeBookId),
);

export const getActiveLibraryBook = createSelector(
  [getActiveBookId, getLibraryBooks],
  (activeBookId, books) => books.find(el => el.id === activeBookId),
);
