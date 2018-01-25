import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { expect } from 'chai';

import reducer from '../../src/reducers/books';
import * as actions from '../../src/actions/books';

const mockStore = configureMockStore([thunk]);

// I. Create an initialState that matches the initialState in the reducer.

const initialState = {
  activeBookId: '0',
  searchedBooks: [],
  totalSearched: 0,
  libraryBooks: [],
  bookIndex: 0,
  searchTerm: '',
};

const initialState2 = {
  activeBookId: '0',
  searchedBooks: [],
  totalSearched: 0,
  libraryBooks: [{ title: 'test', id: '123' }],
  bookIndex: 0,
  searchTerm: '',
};

describe('Books Reducers: Individual Action Creators update specified state', () => {
  it('initializes state', () => {
    // .to.eql is deep equals, .to.equal is shallow.
    expect(reducer(undefined, {})).to.eql(initialState);
  });

  it('searchBooks Action Creator changes the searchedBooks property', () => {
    const expectedState = {
      activeBookId: '0',
      searchedBooks: [{ title: 'test' }],
      totalSearched: 0,
      libraryBooks: [],
      bookIndex: 0,
      searchTerm: '',
    };

    expect(reducer(initialState, actions.searchBooks([{ title: 'test' }]))).to.eql(expectedState);
  });

  it('selectBook Action Creator changes the activeBookId property ', () => {
    const expectedState = {
      activeBookId: '123',
      searchedBooks: [],
      totalSearched: 0,
      libraryBooks: [],
      bookIndex: 0,
      searchTerm: '',
    };

    expect(reducer(initialState, actions.selectBook('123'))).to.eql(expectedState);
  });

  it('addToMyLibrary Action Creator changes the libraryBooks property', () => {
    const expectedState = {
      activeBookId: '0',
      searchedBooks: [],
      totalSearched: 0,
      libraryBooks: [{ title: 'test' }],
      bookIndex: 0,
      searchTerm: '',
    };

    expect(reducer(initialState, actions.addToMyLibrary({ title: 'test' }))).to.eql(expectedState);
  });

  it('DeleteBook Action Creator changes the libraryBooks property', () => {
    const expectedState = {
      activeBookId: '0',
      searchedBooks: [],
      totalSearched: 0,
      libraryBooks: [],
      bookIndex: 0,
      searchTerm: '',
    };

    expect(reducer(initialState2, actions.deleteBook('123'))).to.eql(expectedState);
  });

  it('setBookIndex Action Creator changes the bookIndex property', () => {
    const expectedState = {
      activeBookId: '0',
      searchedBooks: [],
      totalSearched: 0,
      libraryBooks: [],
      bookIndex: 123,
      searchTerm: '',
    };

    expect(reducer(initialState, actions.setBookIndex(123))).to.eql(expectedState);
  });

  it('setSearchTerm Action Creator changes the searchTerm property', () => {
    const expectedState = {
      activeBookId: '0',
      searchedBooks: [],
      totalSearched: 0,
      libraryBooks: [],
      bookIndex: 0,
      searchTerm: 'test',
    };

    expect(reducer(initialState, actions.setSearchTerm('test'))).to.eql(expectedState);
  });

  it('setTotalSearched Action Creator changes the totalSearched property', () => {
    const expectedState = {
      activeBookId: '0',
      searchedBooks: [],
      totalSearched: 1,
      libraryBooks: [],
      bookIndex: 0,
      searchTerm: '',
    };

    expect(reducer(initialState, actions.setTotalSearched(1))).to.eql(expectedState);
  });
});
