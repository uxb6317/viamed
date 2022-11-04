import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

/* 
  Renders a landing page.
*/

const LandingPage = () => {
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <div className='py-16 max-w-sm px-4 mx-auto flex flex-col items-center min-h-screen'>
      <div className='flex mb-20'>
        <span className='w-2 h-2 bg-offwhite mx-1' />
        <span className='w-2 h-2 bg-offwhite opacity-50 mx-1' />
        <span className='w-2 h-2 bg-offwhite opacity-50 mx-1' />
        <span className='w-2 h-2 bg-offwhite opacity-50 mx-1' />
      </div>
      <div className='uppercase text-dark-blue tracking-widest leading-none text-center'>
        <h1 className='text-5xl mb-1'>Health</h1>
        <h1 className='text-5xl mb-1'>Tourism</h1>
        <h1 className='font-medium'>Croatia</h1>
      </div>
      <p className='text-xs font-semibold text-dark-blue mb-5 mt-auto uppercase'>
        {t('Continue With')}:
      </p>
      <div className='flex flex-col text-white self-stretch'>
        <button
          onClick={() => history.push('/auth')}
          className='btn btn-lg bg-dark-turquoise mb-3'
        >
          EMAIL
        </button>
        <button className='btn btn-lg bg-dark-blue'>FACEBOOK/GOOGLE</button>
      </div>
    </div>
  );
};

export default LandingPage;
