import React, { useState } from 'react';

/* 
  Renders a menu item for the sidebar.
*/

const SideItem = ({ text, onClick, icon, children }) => {
  const [expandMenu, setExpandMenu] = useState(false);

  return (
    <div
      onClick={children ? () => setExpandMenu(!expandMenu) : onClick}
      className='flex flex-col py-2 my-1 cursor-pointer'
    >
      <div className='flex items-center '>
        {icon && <img className='w-4 h-4' src={icon} alt='menu' />}
        <p className='ml-4 mr-2'>{text}</p>
        {children && (
          <img
            className='w-4 h-4 mt-1'
            src={
              expandMenu ? '/images/chevron-up.svg' : '/images/chevron-down.svg'
            }
            alt='menu'
          />
        )}
      </div>
      {expandMenu && <div className='ml-8 mt-2'>{children}</div>}
    </div>
  );
};

export default SideItem;
