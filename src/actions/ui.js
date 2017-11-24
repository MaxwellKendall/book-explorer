/* eslint-disable import/prefer-default-export */
import { createAction } from 'redux-actions';

import * as bookActions from './ui';

export const setLoading = createAction('SET_LOADING');
export const setModal = createAction('SET_MODAL');
export const setError = createAction('SET_ERROR');
export const showNotification = createAction('SHOW_NOTIFICATION');
