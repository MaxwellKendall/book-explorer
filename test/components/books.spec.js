import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { expect } from 'chai';

import * as actions from '../../src/actions/books';

const mockStore = configureMockStore([thunk]);

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
        expect(store.getActions().length).to.equal(4);
        // perhaps its just returns one because .... it is only dispatching one books action?
      });
  });
});
