import React from 'react';

const MediumButton = ({ buttonLabel, buttonType, clickHandler }) => {
  const classNames = [
    'w-24',
    'px-4',
    'py-2',
    'rounded',
    'text-white',
    'font-bold',
  ];

  if (buttonType === 'primary') {
    classNames.push('bg-buttonPrimary');
    classNames.push('hover:bg-buttonPrimary-hover');
  } else if (buttonType === 'alert') {
    classNames.push('bg-buttonAlert');
    classNames.push('hover:bg-buttonAlert-hover');
  } else {
    classNames.push('bg-buttonDefault');
    classNames.push('hover:bg-buttonDefault-hover');
  }

  return (
    <button className={ classNames.join(' ') } onClick={ clickHandler }>
      { buttonLabel }
    </button>
  );
};

export default MediumButton;
