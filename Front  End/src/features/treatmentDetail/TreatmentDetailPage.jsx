import React, { useEffect } from 'react';
import TreatmentAction from './TreatmentAction';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { fetchTreatmentDetail } from '../treatments/treatmentsSlice';

import FullScreenLoading from '../../common/components/FullScreenLoading';

/* 
  Renders a treatment with its details.
*/

const TreatmentDetailPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const history = useHistory();
  const location = useLocation();
  const { treatmentId } = useParams();
  const { treatmentsById, loading } = useSelector((state) => state.treatments);
  const treatment = treatmentsById[parseInt(treatmentId)];
  const clinic = location.state.clinic;

  useEffect(() => {
    dispatch(fetchTreatmentDetail({ treatmentId, clinic }));
  }, [dispatch, treatmentId]);

  return loading ? (
    <FullScreenLoading />
  ) : (
    <div className='mx-auto flex flex-col min-h-screen text-dark-blue w-full'>
      <div
        className='absolute top-0 w-full bg-cover h-64'
        style={{ backgroundImage: `url(${treatment.image})` }}
      />
      <div className='flex justify-between p-6 z-10'>
        <img
          onClick={() => history.goBack()}
          className='w-6 h-6'
          src='/images/left_arrow.svg'
          alt='back'
        />
      </div>
      <div className='mt-40 rounded-xl z-10 bg-offwhite p-4'>
        <div className='flex justify-between p-4 mb-6'>
          <div className='flex flex-col mr-2'>
            <h1 className='text-2xl'>{treatment.clinicServiceName}</h1>
            <h1 className='text-gray-700'>{treatment.clinicName}</h1>
          </div>
          <div className='flex justify-center'>
            <button
              onClick={() =>
                window.open(
                  'https://www.poliklinikabagatin.hr/eng/Dermatology/Mesotherapy',
                  '_blank'
                )
              }
              className='self-start mt-1 btn btn-dark-blue'
            >
              {t('Book')}
            </button>
          </div>
        </div>
        <div className='card p-6 flex justify-around'>
          <TreatmentAction
            onClick={() => (window.location.href = `mailto:${clinic.email}`)}
            icon='/images/mail.svg'
            text={t('Contact')}
          />
          <TreatmentAction
            onClick={() => history.push(`/categories/${clinic.clinicId}`)}
            icon='/images/list.svg'
            text={t('Similar treatments')}
          />
          <TreatmentAction
            onClick={() =>
              window.open(
                `https://www.google.com/maps/@${treatment.location.lat},${treatment.location.lng},19.45z`,
                '_blank'
              )
            }
            icon='/images/map-pin.svg'
            text={t('Location')}
          />
        </div>
        <div className='card mt-4 p-5'>
          <div className='flex justify-between items-center mb-4'>
            <div>
              <p className='text-lg'>{t('About Treatment')}</p>
            </div>
            <img className='h-3 w-3' src='/images/down.svg' alt='' />
          </div>
          <p>{treatment.clinicServiceDescription}</p>
        </div>
      </div>
    </div>
  );
};

export default TreatmentDetailPage;
