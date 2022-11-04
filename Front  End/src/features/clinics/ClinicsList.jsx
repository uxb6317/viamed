import React from 'react';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';

import Card from '../../common/components/Card';
import NoData from '../../common/components/NoData';

/* 
  Renders a list of clinics.
*/

const ClinicsList = ({ clinics }) => {
  const history = useHistory();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {clinics.length > 0 ? (
        clinics.map((clinic) => (
          <Card
            key={clinic.clinicId}
            image={clinic.image}
            title={clinic.name}
            onClick={() => history.push(`/clinics/${clinic.clinicId}`)}
          />
        ))
      ) : (
        <div className='mt-20 mx-4'>
          <NoData dataName='category' />
        </div>
      )}
    </motion.div>
  );
};

export default ClinicsList;
