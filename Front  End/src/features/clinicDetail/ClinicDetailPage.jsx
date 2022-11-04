import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { fetchTreatments } from '../treatments/treatmentsSlice';
import { fetchClinicDetail } from '../clinics/clinicsSlice';

import TreatmentList from './TreatmentList';
import InfoCard from '../../common/components/InfoCard';
import FullScreenLoading from '../../common/components/FullScreenLoading';
import Map from '../map/Map';

/* 
  Page that displays details for a clinic.
*/

const ClinicDetailPage = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { clinicId } = useParams();
  const {
    treatmentsById,
    treatmentsList,
    loading: treatmentLoading,
  } = useSelector((state) => state.treatments);
  const { clinicsById, loading: clinicLoading } = useSelector(
    (state) => state.clinics
  );
  const treatments = treatmentsList.map(
    (treatmentId) => treatmentsById[treatmentId]
  );
  const clinic = clinicsById[parseInt(clinicId)];

  useEffect(() => {
    dispatch(fetchClinicDetail({ clinicId }));
    dispatch(fetchTreatments({ clinicId }));
  }, [dispatch, clinicId]);

  return treatmentLoading && clinicLoading ? (
    <FullScreenLoading />
  ) : (
    <div className='p-4 mb-24 mx-auto flex flex-col min-h-screen text-dark-blue'>
      <div className='flex justify-between p-2'>
        <img
          onClick={() => history.goBack()}
          className='w-6 h-6'
          src='/images/left_arrow.svg'
          alt=''
        />
      </div>
      <h1 className='text-xl font-semibold ml-2 mt-4'>{clinic.name}</h1>
      <div className='-mx-4 my-2'>
        <TreatmentList treatments={treatments} clinic={clinic} />
      </div>
      <InfoCard title={t('About Us')}>
        <p>{clinic.description}</p>
      </InfoCard>
      <div className='w-full h-64 my-4 rounded-lg overflow-hidden shadow'>
        <Map center={{ lat: 40.73061, lng: -73.935242 }} />
      </div>
      <div className='flex flex-col mx-2'>
        <div className='flex flex-col'>
          <div className='flex items-center mb-2'>
            <img
              className='w-4 h-4 mr-2'
              src='/images/map-pin.svg'
              alt='address'
            />
            <p>
              {t('Address')}: {clinic.address}
            </p>
          </div>
          <div className='flex items-center mb-2'>
            <img className='w-4 h-4 mr-2' src='/images/phone.svg' alt='phone' />
            <p>
              {t('Phone Number')}: {clinic.phoneNumber}
            </p>
          </div>
          <div className='flex items-center'>
            <img className='w-4 h-4 mr-2' src='/images/mail.svg' alt='email' />
            <p>
              {t('Email')}: {clinic.email}
            </p>
          </div>
        </div>
      </div>

      <div className='fixed shadow bottom-0 left-0 h-24 bg-white w-screen flex justify-center items-center'>
        <button className='btn btn-dark-turquoise text-lg px-10 py-3'>
          {t('Contact')}
        </button>
      </div>
    </div>
  );
};

export default ClinicDetailPage;
