/* eslint-disable import/prefer-default-export */
import { createAction } from 'redux-actions';

export const setActiveUser = createAction('SET_ACTIVE_USER');
export const setLoading = createAction('SET_LOADING');
export const setModal = createAction('SET_MODAL');
export const setError = createAction('SET_ERROR');
