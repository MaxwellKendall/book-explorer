import { handleActions } from 'redux-actions';
import * as actions from '../actions/ui';

/**
 * initialState will be the first thing passed to the reducers and is therefore what you state * * will be by default until any actions are executed
 */

const initialState = {
  loading: false,
  modal: false,
  error: false,
  activeUser: null,
};

export default handleActions({
  // make each function return the object you want state to be for the given object
  [actions.setLoading]: (state, action) => ({ ...state, loading: action.payload }),
  [actions.setModal]: (state, action) => ({ ...state, modal: action.payload }),
  [actions.setError]: (state, action) => ({ ...state, error: action.payload }),
  [actions.setActiveUser]: (state, action) => ({ ...state, activeUser: action.payload }),
}, initialState);

