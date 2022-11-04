import React from 'react';

/* 
  Simple label and icon for displaying an action on the treatment page.
*/

const TreatmentAction = ({ icon, text, ...props }) => {
  return (
    <div {...props} className='flex flex-col items-center'>
      <img className='w-6 h-6 mb-1' src={icon} alt='' />
      <p className='text-sm'>{text}</p>
    </div>
  );
};

export default TreatmentAction;
