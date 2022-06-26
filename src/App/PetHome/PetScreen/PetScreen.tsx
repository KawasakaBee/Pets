import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { mouseMoveHandler } from '../../handlers/mouseMoveHandler';
import { useBoredom } from '../../hooks/useBoredom';
import { useHunger } from '../../hooks/useHunger';
import { usePurity } from '../../hooks/usePurity';
import { useWeariness } from '../../hooks/useWeariness';
import { updatePetHunger, updatePetPurity, updatePetWeariness } from '../../store/store';
import { PetBar } from './PetBar';
import './petScreen.scss';

interface IPetScreenProp {
  action: string;
}

export function PetScreen({ action }: IPetScreenProp) {

  const audioFish: HTMLAudioElement = new Audio('../audio-fish.mp3')
  const audioSponge: HTMLAudioElement = new Audio('../audio-sponge.mp3')

  const [wearinessWidth] = useWeariness();
  const [hungerWidth] = useHunger();
  const [boredomWidth] = useBoredom();
  const [purityWidth] = usePurity();

  const [wearinessTimer, setWearinessTimer] = useState(wearinessWidth);
  const [isBedButtonDisabled, setIsBedButtonDisabled] = useState(false);
  const [isBedroom, setIsBedroom] = useState(false);
  const [isKitchen, setIsKitchen] = useState(false);
  const [isBathroom, setIsBathroom] = useState(false);
  const [isLivingRoom, setIsLivingRoom] = useState(false);

  const [isEating, setIsEating] = useState(false);
  const [isWashing, setIsWashing] = useState(false);

  const dispatch = useDispatch();
  const timerRef: { current: NodeJS.Timeout | null } = useRef();

  const screen = {
    xL: (window.screen.width / 2) - 100,
    xR: (window.screen.width / 2) + 100,
    yU: (window.screen.height / 2) + 100,
    yD: (window.screen.height / 2) + 300,
  }

  function catNames() {
    if (isEating) {
      return "pet__body pet__body--eating"
    } else if (isWashing) {
      return "pet__body pet__body--washing"
    }
    return 'pet__body'
  }

  useEffect(() => {
    setIsBedroom(false);
    setIsKitchen(false);
    setIsLivingRoom(false);
    setIsBathroom(false);
    switch (action) {
      case 'bedroom': setIsBedroom(true); break
      case 'kitchen': setIsKitchen(true); break
      case 'livingRoom': setIsLivingRoom(true); break
      case 'bathroom': setIsBathroom(true); break
    }
  }, [action])

  function handleCLick() {
    setIsBedButtonDisabled(true);
    setWearinessTimer(wearinessWidth)
    timerRef.current = setInterval(() => {
      setWearinessTimer(prev => prev + 5)
    }, 1000)
  }

  useEffect(() => {
    if (wearinessWidth === 100) {
      clearInterval(timerRef.current);
      setIsBedButtonDisabled(false);
    }
    if (wearinessWidth < 100) dispatch(updatePetWeariness(wearinessTimer));
  }, [wearinessTimer])

  function dragCaptureHandler(event: React.DragEvent<HTMLDivElement>) {
    event.currentTarget.style.left = event.screenX - 275 + 'px'
    event.currentTarget.style.top = event.screenY - 300 + 'px'
  }

  function dragEndHandler(event: React.DragEvent<HTMLDivElement>) {
    event.currentTarget.style.left = '20px'
    event.currentTarget.style.top = '20px'
    if (isKitchen && event.clientX > screen.xL && event.clientX < screen.xR && event.clientY > screen.yU && event.clientY < screen.yD && hungerWidth < 100) {
      setIsEating(true);
      audioFish.play();
      dispatch(updatePetHunger(hungerWidth + 5));
      setTimeout(() => {
        setIsEating(false);
      }, 2000)
    }
    if (isBathroom && event.clientX > screen.xL && event.clientX < screen.xR && event.clientY > screen.yU && event.clientY < screen.yD && purityWidth < 100) {
      setIsWashing(true);
      audioSponge.play();
      dispatch(updatePetPurity(purityWidth + 5));
      setTimeout(() => {
        setIsWashing(false);
      }, 2000)
    }
  }

  return (
    <div className={`screen ${action}`} onMouseMove={mouseMoveHandler}>
      {isBedroom && (<button className="drag-and-drop-button button-bed" onClick={handleCLick} disabled={isBedButtonDisabled}></button>)}
      {isKitchen && (<div className={isEating ? "drag-and-drop-button button-fish button-fish-eating" : "drag-and-drop-button button-fish"} onDragCapture={dragCaptureHandler} onDragEnd={dragEndHandler} ></div>)}
      {isLivingRoom && (<button className="drag-and-drop-button button-game"></button>)}
      {isBathroom && (<div className={isWashing ? "drag-and-drop-button button-sponge button-sponge-washing" : "drag-and-drop-button button-sponge"} onDragCapture={dragCaptureHandler} onDragEnd={dragEndHandler} ></div>)}
      <div className='pet' >
        <div className="pet__tail"></div>
        <div className={catNames()}>
          <div className='pet__eyes'></div>
        </div>
      </div>
      <div className="screen__bars">
        <PetBar label='Weariness' width={wearinessWidth} />
        <PetBar label='Hunger' width={hungerWidth} />
        <PetBar label='Boredom' width={boredomWidth} />
        <PetBar label='Purity' width={purityWidth} />
      </div>
    </div>
  )
}
