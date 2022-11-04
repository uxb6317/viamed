import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../features/auth/authSlice';
import categoriesReducer from '../features/categories/categoriesSlice';
import clinicsReducer from '../features/clinics/clinicsSlice';
import treatmentsReducer from '../features/treatments/treatmentsSlice';

/* 
  Redux store.
*/

export default configureStore({
  reducer: {
    auth: authReducer,
    categories: categoriesReducer,
    clinics: clinicsReducer,
    treatments: treatmentsReducer,
  },
  devTools: true,
});
