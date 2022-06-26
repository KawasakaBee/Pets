import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PetBoredomAction, PetNameAction, updatePetBoredom } from "../store/store";

export function useBoredom() {
  const boredomWidth = useSelector<PetBoredomAction, number>(store => store.boredomWidth);
  const petName = useSelector<PetNameAction, string>(store => store.name);
  const [boredom, setBoredom] = useState(boredomWidth);
  const intervalRef: { current: NodeJS.Timeout | null } = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setBoredom(prev => prev - 5);
    }, 100000)
    return () => clearInterval(intervalRef.current)
  }, [])

  const cancelInterval = () => {
    if (boredomWidth === 0) {
      clearInterval(intervalRef.current);
    }
  }

  cancelInterval();

  useEffect(() => {
    setBoredom(boredomWidth);
    localStorage.setItem(petName, JSON.stringify({ ...JSON.parse(localStorage.getItem(petName)), boredomWidth: boredomWidth }));
    if (boredomWidth === 0) navigate('./end');
  }, [boredomWidth])

  useEffect(() => {
    dispatch(updatePetBoredom(boredom));
  }, [boredom])

  return [boredomWidth];
}
