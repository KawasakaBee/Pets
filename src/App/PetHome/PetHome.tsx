import React, { useState } from 'react';
import { handleSubmit } from '../handlers/handleSubmit';
import { PetScreen } from './PetScreen';
import { useDispatch, useSelector } from 'react-redux';
import { PetBoredomAction, PetNameAction, updatePetBoredom } from '../store/store';
import './petHome.scss';

export function PetHome() {
  const [action, setAction] = useState('');
  const [bedroomButton, setBedroomButton] = useState(true);
  const [kitchenButton, setKitchenButton] = useState(true);
  const [livingRoomButton, setLivingRoomButton] = useState(true);
  const [bathroomButton, setBathroomButton] = useState(true);
  const name = useSelector<PetNameAction, string>(store => store.name);

  const boredomWidth = useSelector<PetBoredomAction, number>(store => store.boredomWidth);

  const dispatch = useDispatch();

  function handleClick(act: string) {
    setAction(act);
    setBedroomButton(true);
    setKitchenButton(true);
    setLivingRoomButton(true);
    setBathroomButton(true);
    switch (act) {
      case 'bedroom': setBedroomButton(false); break
      case 'kitchen': setKitchenButton(false); break
      case 'livingRoom': {
        setLivingRoomButton(false);
        if (boredomWidth < 100) dispatch(updatePetBoredom(boredomWidth + 5)); break
      }
      case 'bathroom': setBathroomButton(false); break
    }
  }

  return (
    <div className='action'>
      <h1 className='action__pet-name'>This is your pet {name}</h1>
      <PetScreen action={action} />
      <form className='action__form' onSubmit={handleSubmit}>
        <button className='action__button' type='submit' onClick={() => handleClick('bedroom')} disabled={!bedroomButton}>Bedroom</button>
        <button className='action__button' type='submit' onClick={() => handleClick('kitchen')} disabled={!kitchenButton}>Kitchen</button>
        <button className='action__button' type='submit' onClick={() => handleClick('livingRoom')} disabled={!livingRoomButton}>Living Room</button>
        <button className='action__button' type='submit' onClick={() => handleClick('bathroom')} disabled={!bathroomButton}>Bathroom</button>
      </form>
    </div>
  )
}
