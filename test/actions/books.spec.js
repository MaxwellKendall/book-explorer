import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { expect } from 'chai';

import * as actions from '../../src/actions/books';

const mockStore = configureMockStore([thunk]);

/*
 * We only need to test actions that are async in order to confirm they successfully
 * dispatch other actions.
 * This typically refers exclusively to the API Requests that update Global
 * State with the response of an API
 */

describe('getSearchedBooks Async Action Creator: ', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('getSearchedBooks dispatches 4 actions', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: [{
          data: {
            items: [{ volumeInfo: {} }],
          },
        }],
      });
    });

    const store = mockStore({});

    return store.dispatch(actions.getSearchedBooks())
      .then(() => {
        expect(store.getActions().length).to.equal(5);
      });
  });
});
