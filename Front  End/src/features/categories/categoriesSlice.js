import { createSlice } from '@reduxjs/toolkit';

import { API } from '../../common/api';

/* 
  Reducers and actions for categories.
*/

const initialState = {
  categoriesById: {},
  categoriesList: [],
  loading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    getCategoriesStart(state, action) {
      state.loading = true;
    },
    getCategoriesSuccess(state, action) {
      const categories = action.payload;
      categories.forEach((category, i) => {
        state.categoriesById[category.serviceCategoryId] = category;
        state.categoriesById[
          category.serviceCategoryId
        ].image = `/images/treatments/${(i + 1) % 6}.jpg`;
      });
      state.categoriesList = categories.map(
        (category) => category.serviceCategoryId
      );
      state.loading = false;
    },
    getCategoriesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const fetchCategories = () => async (dispatch) => {
  try {
    dispatch(getCategoriesStart());
    const cachedCategories = JSON.parse(localStorage.getItem('categories'));
    if (cachedCategories) {
      dispatch(getCategoriesSuccess(cachedCategories));
    } else {
      const response = await API.get(`/clinicService/categories`);
      const categories = response.data;
      localStorage.setItem('categories', JSON.stringify(categories));
      dispatch(getCategoriesSuccess(categories));
    }
  } catch (error) {
    dispatch(getCategoriesFailure(error));
  }
};

export const {
  getCategoriesStart,
  getCategoriesSuccess,
  getCategoriesFailure,
} = categoriesSlice.actions;
export default categoriesSlice.reducer;
