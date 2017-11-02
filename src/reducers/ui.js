import { handleActions } from 'redux-actions';
import * as actions from '../actions/ui';

const initialState = {
  loading: false,
};

export default handleActions({
  // make each function return the object you want state to be for the given object
  [actions.setLoading]: (state, action) => ({ ...state, loading: action.payload }),
}, initialState);
