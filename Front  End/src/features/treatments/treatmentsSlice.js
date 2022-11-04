import { createSlice } from '@reduxjs/toolkit';

import { API } from '../../common/api';
import axios from 'axios';

const GOOGLE_API = 'AIzaSyDZ8tGX7K7z_57BftLksPQsYDfHlv3HDb8';

/* 
  Reducers and actions for treatments.
*/

const initialState = {
  treatmentsById: {},
  treatmentsList: [],
  loading: false,
  error: null,
};

const treatmentsSlice = createSlice({
  name: 'treatments',
  initialState,
  reducers: {
    getTreatmentsStart(state, action) {
      state.loading = true;
    },
    getTreatmentsSuccess(state, action) {
      const treatments = action.payload;

      treatments.forEach((treatment, i) => {
        state.treatmentsById[treatment.clinicServiceId] = treatment;
        state.treatmentsById[
          treatment.clinicServiceId
        ].image = `/images/treatments/${(i + 1) % 6}.jpg`;
      });

      state.treatmentsList = treatments.map(
        (treatment) => treatment.clinicServiceId
      );
      state.loading = false;
    },
    getTreatmentsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    getTreatmentDetailStart(state, action) {
      state.loading = true;
    },
    getTreatmentDetailSuccess(state, action) {
      const treatment = action.payload;

      state.treatmentsById[treatment.clinicServiceId] = treatment;
      state.treatmentsById[
        treatment.clinicServiceId
      ].image = `/images/treatments/${Math.floor(Math.random() * 6)}.jpg`;
      state.loading = false;
    },
    getTreatmentDetailFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const fetchTreatments = ({ clinicId }) => async (dispatch) => {
  try {
    dispatch(getTreatmentsStart());
    const treatmentsByClinicId = JSON.parse(
      localStorage.getItem('treatmentsByClinicId')
    );

    if (treatmentsByClinicId && treatmentsByClinicId[clinicId]) {
      // data for treatments exists in localstorage
      dispatch(getTreatmentsSuccess(treatmentsByClinicId[clinicId]));
    } else {
      const response = await API.get(
        `/clinicService/clinicCategory?clinicId=${clinicId}`
      );
      const treatments = response.data;
      const cacheData = { [clinicId]: treatments };

      if (!treatmentsByClinicId) {
        // treatmentsByClinicId doesn't exist, create it
        localStorage.setItem('treatmentsByClinicId', JSON.stringify(cacheData));
      } else {
        // treatmentsByClinicId exists, append new data
        localStorage.setItem(
          'treatmentsByClinicId',
          JSON.stringify({ ...treatmentsByClinicId, ...cacheData })
        );
      }
      dispatch(getTreatmentsSuccess(treatments));
    }
  } catch (error) {
    dispatch(getTreatmentsFailure(error));
  }
};

export const fetchTreatmentDetail = ({ treatmentId, clinic }) => async (
  dispatch
) => {
  try {
    dispatch(getTreatmentDetailStart());
    const treatmentById = JSON.parse(localStorage.getItem('treatmentById'));
    if (treatmentById && treatmentById[treatmentId]) {
      dispatch(getTreatmentDetailSuccess(treatmentById[treatmentId]));
    } else {
      const response = await API.get(
        `/clinicService/service?clinicServiceId=${treatmentId}`
      );
      const treatment = response.data;
      const geocoding = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${clinic.address}, Croatia&key=${GOOGLE_API}`
      );

      if (geocoding.data.results) {
        treatment.location = geocoding.data.results[0].geometry.location;
      }

      const cacheData = { [treatmentId]: treatment };

      if (!treatmentById) {
        localStorage.setItem('treatmentById', JSON.stringify(cacheData));
      } else {
        localStorage.setItem(
          'treatmentById',
          JSON.stringify({ ...treatmentById, ...cacheData })
        );
      }

      dispatch(getTreatmentDetailSuccess(treatment));
    }
  } catch (error) {
    dispatch(getTreatmentsFailure(error));
  }
};
export const {
  getTreatmentsStart,
  getTreatmentsSuccess,
  getTreatmentsFailure,
  getTreatmentDetailStart,
  getTreatmentDetailSuccess,
  getTreatmentDetailFailure,
} = treatmentsSlice.actions;
export default treatmentsSlice.reducer;
