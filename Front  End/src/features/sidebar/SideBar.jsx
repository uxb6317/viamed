import React from 'react';
import ScrollLock from 'react-scrolllock';
import { useHistory, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import OutsideClickHandler from 'react-outside-click-handler';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { logout } from '../auth/authSlice';

import SideItem from './SideItem';
import Language from '../changeLanguage/Language';

/* 
  Renders a sidebar
  sideBarState - boolean 
  close - function that closes the sidebar
*/

const SideBar = ({ sideBarState, close }) => {
  const { i18n, t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  return (
    <OutsideClickHandler
      onOutsideClick={(e) => {
        if (sideBarState) {
          close();
        }
      }}
    >
      <motion.div
        initial={false}
        animate={
          sideBarState
            ? {
                x: 0,
              }
            : {
                x: '-105%',
              }
        }
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 40,
        }}
        className='h-full min-h-screen absolute top-0 left-0 bottom-0 shadow-lg bg-offwhite flex flex-col z-50 px-8 w-80 -m-4'
      >
        <ScrollLock isActive={sideBarState} />
        <img
          onClick={() => close()}
          className='absolute right-0 top-0 mt-5 mr-6 w-8 h-8 bg-gray-100 p-2 rounded-full'
          src='/images/x.svg'
          alt='close'
        />
        <div className='flex items-center mt-20 pb-6 border-b'>
          <img
            src='/images/cat.jpg'
            alt='profile'
            className='w-16 h-16 rounded-full mr-4'
          />
          <p>{user && user.name}</p>
        </div>
        <div className='flex flex-col mt-10'>
          <SideItem
            onClick={() => {
              if (location.pathname === '/categories') {
                close();
              } else {
                history.push('/categories');
              }
            }}
            text={t('Categories')}
            icon='/images/grid.svg'
          />
          <SideItem
            onClick={() => {
              close();
              history.push(`/categories/allClinics`);
            }}
            text={t('All Clinics')}
            icon='/images/list.svg'
          />
          <SideItem
            onClick={() => {
              close();
              history.push(`/profile`);
            }}
            text={t('Profile')}
            icon='/images/user.svg'
          />
          <SideItem
            text={t('Language')}
            icon={`/images/languages/${i18n.language}.svg`}
          >
            <Language
              icon='/images/languages/en.svg'
              text='English'
              onClick={() => i18n.changeLanguage('en')}
            />
            <Language
              icon='/images/languages/hr.svg'
              text='Croatia'
              onClick={() => i18n.changeLanguage('hr')}
            />
          </SideItem>
        </div>
        <div className='mt-auto mb-10 pt-6 border-t'>
          <SideItem
            onClick={() => dispatch(logout())}
            text={t('Logout')}
            icon='/images/log-out.svg'
          />
        </div>
      </motion.div>
    </OutsideClickHandler>
  );
};

export default SideBar;
