import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import SignupForm from './SignupForm';
import SigninForm from './SigninForm';
import Loading from '../../common/components/Loading';

/* 
  Component that displays sign in and sign up pages.
*/

const AuthPage = () => {
  const { loading } = useSelector((state) => state.auth);
  const { t } = useTranslation();
  const [isSignin, setIsSignin] = useState(true);

  return loading ? (
    <Loading />
  ) : (
    <div className='py-16 px-4 max-w-sm mx-auto flex flex-col items-center min-h-screen'>
      <div className='flex mb-10'>
        <button
          onClick={() => setIsSignin(true)}
          className={`${isSignin && 'btn-purple'} btn btn-sm mr-6 uppercase`}
        >
          {t('Sign In')}
        </button>
        <button
          onClick={() => setIsSignin(false)}
          className={`${!isSignin && 'btn-purple'} btn btn-sm uppercase`}
        >
          {t('Sign Up')}
        </button>
      </div>
      <div className='my-auto self-stretch text-center'>
        <h1 className='text-2xl font-semibold mb-8 text-dark-blue uppercase'>
          {t('Health')} {t('Tourism')}
        </h1>
        <div>{isSignin ? <SigninForm /> : <SignupForm />}</div>
      </div>
    </div>
  );
};

export default AuthPage;
