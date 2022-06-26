import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PetNameAction, PetWearinessAction, updatePetWeariness } from '../store/store';

export function useWeariness() {
  const wearinessWidth = useSelector<PetWearinessAction, number>(store => store.wearinessWidth);
  const petName = useSelector<PetNameAction, string>(store => store.name);
  const [weariness, setWeariness] = useState(wearinessWidth);
  const intervalRef: { current: NodeJS.Timeout | null } = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setWeariness(prev => prev - 5);
    }, 100000)
    return () => clearInterval(intervalRef.current)
  }, [])

  const cancelInterval = () => {
    if (wearinessWidth === 0) {
      clearInterval(intervalRef.current);
    }
  }

  cancelInterval();

  useEffect(() => {
    setWeariness(wearinessWidth);
    localStorage.setItem(petName, JSON.stringify({ ...JSON.parse(localStorage.getItem(petName)), wearinessWidth: wearinessWidth }));
    if (wearinessWidth === 0) navigate('./end');
  }, [wearinessWidth])

  useEffect(() => {
    dispatch(updatePetWeariness(weariness));
  }, [weariness])

  return [wearinessWidth];
}
