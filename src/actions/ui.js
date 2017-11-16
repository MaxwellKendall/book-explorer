/* eslint-disable import/prefer-default-export */
import { createAction } from 'redux-actions';

import * as bookActions from './ui';

export const setLoading = createAction('SET_LOADING');
export const showModal = createAction('SHOW_MODAL');
export const hideModal = createAction('HIDE_MODAL');
export const setError = createAction('SET_ERROR');
