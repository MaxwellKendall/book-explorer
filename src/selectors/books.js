/* eslint-disable import/prefer-default-export */
import { createSelector } from 'reselect';

const searchedBooks = state => state.books.searchedBooks;
const getActiveBookId = state => state.books.activeBookId;

export const getActiveBook = createSelector(
  [getActiveBookId, searchedBooks],
  (activeBookId, books) => books[activeBookId],
);
