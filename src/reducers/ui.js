import { handleActions } from 'redux-actions';
import * as actions from '../actions/ui';

const initialState = {
  loading: false,
  modal: false,
};

export default handleActions({
  // make each function return the object you want state to be for the given object
  [actions.setLoading]: (state, action) => ({ ...state, loading: action.payload }),
  [actions.showModal]: (state, action) => ({ ...state, modal: action.payload }),
}, initialState);
