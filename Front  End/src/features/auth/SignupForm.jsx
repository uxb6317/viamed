import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { emailSignup } from './authSlice';

/* 
  Component that renders a sign up form.
*/

const SignupForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const handleSignup = (data) => {
    const { name, email, password } = data;
    dispatch(emailSignup({ name, email, password }));
  };

  return (
    <form className='flex flex-col' onSubmit={handleSubmit(handleSignup)}>
      <input
        className='input-text mb-4'
        placeholder={t('Name')}
        type='text'
        name='name'
        ref={register({ required: true })}
      />
      <input
        className='input-text mb-4'
        placeholder={t('Email')}
        type='email'
        name='email'
        ref={register({ required: true })}
      />
      <input
        className='input-text mb-4'
        placeholder={t('Password')}
        type='password'
        name='password'
        ref={register({ required: true })}
      />
      <input
        className='input-text'
        placeholder={t('Confirm Password')}
        type='password'
        name='confirmPassword'
        ref={register({ required: true })}
      />
      <p className='my-6 self-center text-gray-600'>{t('Forgot Password')}</p>
      <button
        className='btn btn-lg bg-dark-turquoise text-white uppercase'
        type='submit'
      >
        {t('Continue')}
      </button>
    </form>
  );
};

export default SignupForm;
