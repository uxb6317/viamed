import React from 'react';

/* 
  Component for when there's no data found.
*/

const NoData = ({ dataName }) => {
  return (
    <div className='flex flex-col justify-center items-center'>
      <img className='w-20 h-20 mb-2' src='/images/no_data.svg' alt='No data' />
      <p className='text-gray-500 text-lg text-center'>
        Sorry, we don't have data for that {dataName} yet.
      </p>
    </div>
  );
};

export default NoData;
