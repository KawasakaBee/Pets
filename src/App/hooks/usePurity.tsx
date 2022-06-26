import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PetPurityAction, PetNameAction, updatePetPurity } from "../store/store";

export function usePurity() {
  const purityWidth = useSelector<PetPurityAction, number>(store => store.purityWidth);
  const petName = useSelector<PetNameAction, string>(store => store.name);
  const [purity, setPurity] = useState(purityWidth);
  const intervalRef: { current: NodeJS.Timeout | null } = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setPurity(prev => prev - 5);
    }, 100000)
    return () => clearInterval(intervalRef.current)
  }, [])

  const cancelInterval = () => {
    if (purityWidth === 0) {
      clearInterval(intervalRef.current);
    }
  }

  cancelInterval();

  useEffect(() => {
    setPurity(purityWidth);
    localStorage.setItem(petName, JSON.stringify({ ...JSON.parse(localStorage.getItem(petName)), purityWidth: purityWidth }));
    if (purityWidth === 0) navigate('./end');
  }, [purityWidth])

  useEffect(() => {
    dispatch(updatePetPurity(purity));
  }, [purity])

  return [purityWidth];
}
