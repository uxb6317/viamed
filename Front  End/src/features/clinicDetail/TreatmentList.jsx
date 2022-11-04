import React from 'react';
import { useHistory } from 'react-router-dom';

import './treatmentList.css';

import Card from '../../common/components/Card';

/* 
  Renders a list of treatments.
*/

const TreatmentList = ({ treatments, clinic }) => {
  const history = useHistory();

  return (
    <div>
      {treatments && (
        <div className='flex relative overflow-x-auto no-scroll-bar'>
          {treatments.map((treatment) => (
            <div
              key={treatment.clinicServiceId}
              className='px-2 first:pl-4 last:pr-4 w-11/12 flex-shrink-0 treatment-card'
            >
              <Card
                image={treatment.image}
                title={treatment.clinicServiceName}
                onClick={() =>
                  history.push({
                    pathname: `/treatments/${treatment.clinicServiceId}`,
                    state: {
                      clinic,
                    },
                  })
                }
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TreatmentList;
