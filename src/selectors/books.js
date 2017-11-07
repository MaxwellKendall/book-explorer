/* eslint-disable import/prefer-default-export */
import { createSelector } from 'reselect';

const getLibraryBooks = state => state.books.books;
const getSearchedBooks = state => state.books.searchedBooks;
const getActiveBookId = state => state.books.activeBookId;

export const getActiveSearchedBook = createSelector(
  [getActiveBookId, getSearchedBooks],
  (activeBookId, books) => {
    const rtrn = books.filter(el => el.googleVolumeId === activeBookId);
    return rtrn[0];
  },
);

export const getActiveLibraryBook = createSelector(
  [getActiveBookId, getLibraryBooks],
  (activeBookId, books) => {
    const rtrn = books.filter(el => el.googleVolumeId === activeBookId);
    return rtrn[0];
  },
);
