import React from 'react';

/* 
  Generic card component for display small amounts of data.
*/

const InfoCard = ({ title, children }) => {
  return (
    <div className={`card mt-4`}>
      <div className='flex justify-between items-center'>
        <p className='text-lg'>{title}</p>
        <img className='h-3 w-3' src='/images/down.svg' alt='' />
      </div>
      <hr className='my-4' />
      {children}
    </div>
  );
};

export default InfoCard;
