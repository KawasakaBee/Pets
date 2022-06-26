import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PetNameAction } from '../store/store';
import './endPage.scss';

export function EndPage() {
  const petName = useSelector<PetNameAction, string>(store => store.name);

  const navigate = useNavigate();

  function handleClick() {
    localStorage.removeItem(petName);
    navigate('../../main.html');
  }

  return (
    <div className="end-page">
      <h2 className="end-page__title">Your pet is dead</h2>
      <button className="end-page__button" type='button' onClick={handleClick}>Retry?</button>
    </div>
  )
}
