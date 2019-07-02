import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { expect } from 'chai';

import reducer from '../../src/reducers/ui';
import * as actions from '../../src/actions/ui';

const mockStore = configureMockStore([thunk]);

// I. Create an initialState that matches the initialState in the reducer.

const initialState = {
  loading: false,
  modal: false,
  error: false,
};

describe('UI Reducers: Individual Action Creators update specified state', () => {
  it('initializes state', () => {
    // .to.eql is deep equals, .to.equal is shallow.
    expect(reducer(undefined, {})).to.eql(initialState);
  });

  it('setLoading Action Creator changes the loading property ', () => {
    const expectedState = {
      loading: true,
      modal: false,
      error: false,
    };

    expect(reducer(initialState, actions.setLoading(true))).to.eql(expectedState);
  });

  it('setModal Action Creator changes the modal property ', () => {
    const expectedState = {
      loading: false,
      modal: true,
      error: false,
    };

    expect(reducer(initialState, actions.setModal(true))).to.eql(expectedState);
  });

  it('setError Action Creator changes the error property ', () => {
    const expectedState = {
      loading: false,
      modal: false,
      error: true,
    };

    expect(reducer(initialState, actions.setError(true))).to.eql(expectedState);
  });
});
