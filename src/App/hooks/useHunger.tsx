import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PetHungerActoin, PetNameAction, updatePetHunger } from "../store/store";

export function useHunger() {
  const hungerWidth = useSelector<PetHungerActoin, number>(store => store.hungerWidth);
  const petName = useSelector<PetNameAction, string>(store => store.name);
  const [hunger, setHunger] = useState(hungerWidth);
  const intervalRef: { current: NodeJS.Timeout | null } = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setHunger(prev => prev - 5);
    }, 100000)
    return () => clearInterval(intervalRef.current)
  }, [])

  const cancelInterval = () => {
    if (hungerWidth === 0) {
      clearInterval(intervalRef.current);
    }
  }

  cancelInterval();

  useEffect(() => {
    setHunger(hungerWidth);
    localStorage.setItem(petName, JSON.stringify({ ...JSON.parse(localStorage.getItem(petName)), hungerWidth: hungerWidth }));
    if (hungerWidth === 0) navigate('./end');
  }, [hungerWidth])

  useEffect(() => {
    dispatch(updatePetHunger(hunger));
  }, [hunger])

  return [hungerWidth];
}
