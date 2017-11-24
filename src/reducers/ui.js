import { handleActions } from 'redux-actions';
import * as actions from '../actions/ui';

const initialState = {
  loading: false,
  modal: false,
  error: false,
  notification: false,
};

export default handleActions({
  // make each function return the object you want state to be for the given object
  [actions.setLoading]: (state, action) => ({ ...state, loading: action.payload }),
  [actions.setModal]: (state, action) => ({ ...state, modal: action.payload }),
  [actions.setError]: (state, action) => ({ ...state, error: action.payload }),
  [actions.showNotification]: (state, action) => ({ ...state, notification: { show: action.payload.show, info: action.payload.info } }),
}, initialState);
