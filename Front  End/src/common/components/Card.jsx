import React from 'react';

/* 
  Generic card component.
*/

const Card = ({ image, title, subtitle, className, ...props }) => {
  return (
    <div
      {...props}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),  url(${image})`,
        backgroundSize: 'cover',
      }}
      className={`card h-48 flex flex-col bg-cover justify-end mt-4 ${className}`}
    >
      <p className='text-2xl text-white capitalize'>{title}</p>
      <p className='text-gray-100'>{subtitle}</p>
    </div>
  );
};

export default Card;
