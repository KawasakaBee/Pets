import React from 'react';
import './petBar.scss';

interface IPetBarProp {
  label: string;
  width: number;
}

export function PetBar({ label, width }: IPetBarProp) {

  let styles = 'bar__progress';
  if (width < 60) styles = styles.concat(' medium');
  if (width < 30) styles = styles.concat(' low');

  return (
    <div className='bar'>
      <p className="bar__label">{label}</p>
      <div className='bar__out'>
        <div className={styles} style={{ width: `${width}%` }}></div>
      </div>
    </div>
  )
}
