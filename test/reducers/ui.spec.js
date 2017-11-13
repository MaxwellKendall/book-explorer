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
  modal: null,
};

const initialState2 = {
  loading: false,
  modal: { modal: 'test' },
};

describe('UI Reducers: Individual Action Creators update specified state', () => {
  it('initializes state', () => {
    // .to.eql is deep equals, .to.equal is shallow.
    expect(reducer(undefined, {})).to.eql(initialState);
  });

  it('setLoading Action Creator changes the loading property ', () => {
    const expectedState = {
      loading: true,
      modal: null,
    };

    expect(reducer(initialState, actions.setLoading(true))).to.eql(expectedState);
  });

  it('showModal Action Creator changes the modal property ', () => {
    const expectedState = {
      loading: false,
      modal: { modal: 'test' },
    };

    expect(reducer(initialState, actions.showModal({ modal: 'test' }))).to.eql(expectedState);
  });

  it('hideModal Action Creator changes the modal property ', () => {
    const expectedState = {
      loading: false,
      modal: null,
    };

    expect(reducer(initialState2, actions.hideModal())).to.eql(expectedState);
  });
});
