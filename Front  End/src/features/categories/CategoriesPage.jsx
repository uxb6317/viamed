import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { fetchCategories } from './categoriesSlice';
import { fetchAllClinics } from '../clinics/clinicsSlice';
import { useSearch } from '../../common/hooks/useSearch';

import TopNav from '../topnav/TopNav';
import CategoriesList from './CategoriesList';
import Loading from '../../common/components/Loading';

/* 
  Categories page component.
*/

const CategoriesPage = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { categoriesById, categoriesList, loading } = useSelector(
    (state) => state.categories
  );
  const categories = categoriesList.map((id) => categoriesById[id]);
  const [searchResult, handleSearch] = useSearch(categories, [
    'serviceCategoryName',
  ]);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchAllClinics());
  }, [i18n.language, dispatch]);

  return (
    <div className='p-4 mx-auto flex flex-col min-h-screen'>
      <TopNav title={t('Categories')} handleSearch={handleSearch} />
      {loading ? (
        <div className='mt-10'>
          <Loading />
        </div>
      ) : (
        <div className='flex flex-col'>
          {searchResult.length > 0 ? (
            <CategoriesList categories={searchResult} />
          ) : (
            <CategoriesList categories={categories} />
          )}
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
