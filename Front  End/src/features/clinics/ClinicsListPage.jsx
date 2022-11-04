import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { fetchClinicsForCategory, fetchAllClinics } from './clinicsSlice';
import { useSearch } from '../../common/hooks/useSearch';

import TopNav from '../topnav/TopNav';
import ClinicsList from './ClinicsList';
import Loading from '../../common/components/Loading';

/* 
  Renders a page for display a list of clinics.
*/

const ClinicsListPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { categoryId } = useParams();

  const { clinicsById, clinicsList, loading } = useSelector(
    (state) => state.clinics
  );
  const clinics = clinicsList.map((clinicId) => clinicsById[clinicId]);
  const [searchResult, handleSearch] = useSearch(clinics, ['name']);

  useEffect(() => {
    if (categoryId === 'allClinics') {
      dispatch(fetchAllClinics());
    } else {
      dispatch(fetchClinicsForCategory({ categoryId }));
    }
  }, [categoryId, dispatch]);

  return (
    <div className='p-4 mx-auto flex flex-col min-h-screen'>
      <TopNav title={t('Clinics')} handleSearch={handleSearch} />
      {loading ? (
        <div className='mt-10'>
          <Loading />
        </div>
      ) : (
        <div className='flex flex-col'>
          <ClinicsList
            clinics={searchResult.length > 0 ? searchResult : clinics}
          />
        </div>
      )}
    </div>
  );
};

export default ClinicsListPage;
