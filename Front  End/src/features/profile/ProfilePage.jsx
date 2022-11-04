import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

/* 
  Renders a profile page.
*/

const ProfilePage = () => {
  const history = useHistory();
  const { user } = useSelector((state) => state.auth);

  return (
    <div className='mx-auto min-h-screen w-full relative flex flex-col'>
      <div
        className='absolute top-0 w-full h-64 flex flex-col justify-end'
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),  url(/images/treatments/0.jpg)`,
          backgroundSize: 'cover',
        }}
      >
        <div
          style={{ top: '4rem' }}
          className='z-10 ml-8 relative flex items-center'
        >
          <img
            className='w-32 h-32 p-2 rounded-full bg-gray-100'
            src='/images/user.svg'
            alt='user'
          />
        </div>
      </div>
      <div className='flex justify-between p-6 z-10'>
        <img
          onClick={() => history.goBack()}
          className='w-6 h-6'
          src='/images/left_arrow.svg'
          alt='back'
        />
      </div>
      <div className='mt-72 px-8'>
        <p className='text-lg pb-2 px-2 my-2'>Name: {user.name}</p>
        <p className='text-lg pb-2 px-2 my-2'>Email: {user.email}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
