import { createSlice } from '@reduxjs/toolkit';

import { API } from '../../common/api';

/* 
  Redux reducers and actions for user authentication.
*/

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    authStart(state, action) {
      state.loading = true;
      state.error = null;
    },
    authSuccess(state, action) {
      state.user = action.payload;
      state.loading = false;
      state.error = false;
    },
    authFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logoutSuccess(state, action) {
      state.user = null;
    },
  },
});

export const getUser = () => async (dispatch) => {
  const token = localStorage.token;

  if (token) {
    try {
      dispatch(authStart());
      const response = await API.get('/user/profile');
      const user = response.data;
      dispatch(authSuccess(user));
    } catch (error) {
      dispatch(authFailure(error));
    }
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  localStorage.removeItem('clinics');
  localStorage.removeItem('clinicsByServiceCategoryId');
  localStorage.removeItem('treatmentsByClinicId');
  localStorage.removeItem('categories');
  localStorage.removeItem('treatmentById');
  dispatch(logoutSuccess());
};

export const emailLogin = (credentials) => async (dispatch) => {
  try {
    dispatch(authStart());
    const response = await API.post('/user/login', credentials);
    const user = response.data;
    localStorage.setItem('token', JSON.stringify(user.token));
    dispatch(authSuccess(user));
  } catch (error) {
    dispatch(authFailure(error));
  }
};

export const emailSignup = (credentials) => async (dispatch) => {
  try {
    dispatch(authStart);
    const response = await API.post('/user/register', credentials);
    const user = response.data;
    localStorage.setItem('token', JSON.stringify(user.token));
    dispatch(authSuccess(user));
  } catch (error) {
    dispatch(authFailure(error));
  }
};

export const {
  authStart,
  authSuccess,
  authFailure,
  logoutSuccess,
} = authSlice.actions;

export default authSlice.reducer;
