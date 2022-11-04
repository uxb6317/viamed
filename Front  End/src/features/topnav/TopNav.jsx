import React from 'react';
import { useTranslation } from 'react-i18next';

import SideBar from '../sidebar/SideBar';
import { useState } from 'react';

/* 
  Renders the top navigation.
  title - title text to display on the navigation
  handleSearch - callback function when a user searches something 
*/

const TopNav = ({ title, handleSearch }) => {
  const [sideBarState, setSideBarState] = useState(false);
  const { t } = useTranslation();

  return (
    <div className='stack relative'>
      <SideBar
        sideBarState={sideBarState}
        close={() => setSideBarState(false)}
      />
      <div className='flex items-center mb-4'>
        <img
          onClick={() => setSideBarState(true)}
          className='w-6 h-6'
          src='/images/menu.svg'
          alt='menu'
        />
        <h4 className='ml-4 text-3xl text-dark-blue'>{title}</h4>
      </div>
      <div className='relative flex'>
        <img
          className='absolute ml-3 w-5 h-5 self-center'
          src='/images/search.svg'
          alt=''
        />
        <span
          style={{ borderLeft: '1px solid rgb(200, 200, 200)' }}
          className='absolute h-6 self-center ml-12'
        ></span>
        <input
          placeholder={t('Search')}
          className='input-text w-full pl-16'
          type='text'
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default TopNav;
