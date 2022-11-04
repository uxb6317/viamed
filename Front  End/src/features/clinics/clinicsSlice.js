import { createSlice } from '@reduxjs/toolkit';

import { API } from '../../common/api';

/* 
  Reducers and actions for clinics.
*/

const initialState = {
  clinicsById: {},
  clinicsList: [],
  loading: false,
  error: null,
};

const clinicsSlice = createSlice({
  name: 'clinics',
  initialState,
  reducers: {
    getClinicsStart(state, action) {
      state.loading = true;
    },
    getClinicsSuccess(state, action) {
      const clinics = action.payload;
      state.loading = false;
      state.clinicsList = clinics.map((clinic) => clinic.clinicId);

      clinics.forEach((clinic) => {
        state.clinicsById[clinic.clinicId] = clinic;
      });
    },
    getClinicsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    getClinicDetailStart(state, action) {
      state.loading = true;
    },
    getClinicDetailSuccess(state, action) {
      const clinic = action.payload;
      state.clinicsById[clinic.clinicId] = clinic;
      state.loading = false;
    },
    getClinicDetailFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const fetchClinicsForCategory = ({ categoryId }) => async (dispatch) => {
  try {
    dispatch(getClinicsStart());
    const clinicsByServiceCategoryId = JSON.parse(
      localStorage.getItem('clinicsByServiceCategoryId')
    );

    if (clinicsByServiceCategoryId && clinicsByServiceCategoryId[categoryId]) {
      // data for clinic exists in localstorage
      dispatch(getClinicsSuccess(clinicsByServiceCategoryId[categoryId]));
    } else {
      const response = await API.get(
        `/clinicService/serviceCategory?serviceCategoryId=${categoryId}`
      );
      const clinicsForCategory = response.data;
      const cacheData = { [categoryId]: clinicsForCategory };

      if (!clinicsByServiceCategoryId) {
        // clinicsByServiceCategoryId doesn't exist, create it
        localStorage.setItem(
          'clinicsByServiceCategoryId',
          JSON.stringify(cacheData)
        );
      } else {
        // clinicsByServiceCategoryId exists, append new data
        localStorage.setItem(
          'clinicsByServiceCategoryId',
          JSON.stringify({ ...clinicsByServiceCategoryId, ...cacheData })
        );
      }
      dispatch(getClinicsSuccess(clinicsForCategory));
    }
  } catch (error) {
    dispatch(getClinicsFailure(error));
  }
};

export const fetchAllClinics = () => async (dispatch) => {
  try {
    dispatch(getClinicsStart());
    const clinics = JSON.parse(localStorage.getItem('clinics'));
    if (clinics) {
      dispatch(getClinicsSuccess(clinics));
    } else {
      const response = await API.get('/clinic/all');
      const clinics = response.data;
      localStorage.setItem('clinics', JSON.stringify(clinics));
      dispatch(getClinicsSuccess(clinics));
    }
  } catch (error) {
    dispatch(getClinicsFailure(error));
  }
};

export const fetchClinicDetail = ({ clinicId }) => async (dispatch) => {
  try {
    dispatch(getClinicDetailStart());
    const clinics = JSON.parse(localStorage.getItem('clinics'));
    if (clinics) {
      const clinic = clinics.filter(
        (clinic) => clinic.clinicId === parseInt(clinicId)
      );
      dispatch(getClinicDetailSuccess(clinic[0]));
    } else {
      const response = await API.get(`/clinic/clinic?clinicId=${clinicId}`);
      const clinic = response.data;
      dispatch(getClinicDetailSuccess(clinic));
    }
  } catch (error) {
    dispatch(getClinicDetailFailure(error));
  }
};

export const {
  getClinicsStart,
  getClinicsSuccess,
  getClinicsFailure,
  getClinicDetailStart,
  getClinicDetailSuccess,
  getClinicDetailFailure,
} = clinicsSlice.actions;

export default clinicsSlice.reducer;
