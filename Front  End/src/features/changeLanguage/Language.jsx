import React from 'react';

const Language = ({ icon, text, ...props }) => {
  return (
    <div className='flex items-center mb-2' {...props}>
      <img className='w-3 h-3 mr-2' src={icon} alt='language' />
      <p className='text-sm'>{text}</p>
    </div>
  );
};

export default Language;
