import React from 'react';

const DisplayCard = ({ headerText, children }) => (
  <div className='border border-grey rounded-lg shadow-xl'>
    {/* Optional Card Header */ }
    { headerText && (
      <header className='px-5 py-3 border-b border-grey'>
        <p className='text-xl font-medium'>{ headerText }</p>
      </header>
    ) }

    {/* Card Body */}
    <div className='p-5'>
      { children }
    </div>
  </div>
);

export default DisplayCard;
