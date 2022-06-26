import React, { useState } from 'react';
import { validatePetName } from '../validatePetName/validatePetName';
import { useNavigate } from 'react-router-dom';
import { handleSubmit } from '../handlers/handleSubmit';
import { useDispatch, useSelector } from 'react-redux';
import { PetNameAction, RootState, updatePetBoredom, updatePetHunger, updatePetName, updatePetPurity, updatePetWeariness } from '../store/store';
import './petName.scss';


export function PetName() {
  const name = useSelector<PetNameAction, string>(store => store.name);

  const [isValid, setIsValid] = useState(false);
  const [errorText, setErrorText] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleBlur(event: React.FormEvent<HTMLInputElement>) {
    const validate = validatePetName(event.currentTarget.value);
    setIsValid(validate.valid);
    setErrorText(validate.text);
    dispatch(updatePetName(event.currentTarget.value));
  }

  function handleClick() {
    if (errorText === '') setErrorText('Name is required!');
    if (localStorage.getItem(name) === null && isValid) localStorage.setItem(name, JSON.stringify({ name: name, wearinessWidth: 100, hungerWidth: 100, boredomWidth: 100, purityWidth: 100 }))

    const localStorageData: RootState = JSON.parse(localStorage.getItem(name));
    dispatch(updatePetWeariness(localStorageData.wearinessWidth));
    dispatch(updatePetHunger(localStorageData.hungerWidth));
    dispatch(updatePetBoredom(localStorageData.boredomWidth));
    dispatch(updatePetPurity(localStorageData.purityWidth));

    if (isValid) navigate('./app');
  }

  return (
    <form className="pet-name" onSubmit={handleSubmit}>
      <link className="pet-name__logo" href='main.html' />
      <label className="pet-name__label" htmlFor="pet-name">Enter pet name</label>
      <input className="pet-name__input" id='pet-name' type="text" onBlur={handleBlur} placeholder='Name' />
      {!isValid && (<p className='pet-name__error'>{errorText}</p>)}
      <button className="pet-name__button" onClick={handleClick}>Enter name</button>
    </form>
  )
}
