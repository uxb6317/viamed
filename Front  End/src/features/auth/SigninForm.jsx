import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { emailLogin } from './authSlice';

/* 
  Component that renders a sign in form.
*/

const SigninForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const handleSignin = ({ email, password }) => {
    dispatch(emailLogin({ email, password }));
  };

  return (
    <form className='flex flex-col' onSubmit={handleSubmit(handleSignin)}>
      <input
        className='input-text mb-4'
        type='email'
        placeholder={t('Email')}
        name='email'
        ref={register()}
      />
      <input
        className='input-text'
        placeholder={t('Password')}
        type='password'
        name='password'
        ref={register()}
      />
      <button
        className='btn btn-lg mt-6 bg-dark-turquoise text-white uppercase'
        type='submit'
      >
        {t('Continue')}
      </button>
    </form>
  );
};

export default SigninForm;
