import React from 'react';
import Loader from 'react-loader-spinner';

/* 
  Full screen loading screen component.
*/

const Loading = () => {
  return (
    <div className='w-full min-h-screen flex items-center justify-center'>
      <Loader type='ThreeDots' color='#384359' height={50} width={50} />
    </div>
  );
};

export default Loading;
