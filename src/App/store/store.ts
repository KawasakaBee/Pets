import { ActionCreator, Reducer } from "redux";

export interface RootState {
  name: string;
  wearinessWidth: number;
  hungerWidth: number;
  boredomWidth: number;
  purityWidth: number;
}

const initialState: RootState = {
  name: '',
  wearinessWidth: 100,
  hungerWidth: 100,
  boredomWidth: 100,
  purityWidth: 100
}

// PET_NAME

const PET_NAME = 'PET_NAME';
export type PetNameAction = {
  type: typeof PET_NAME;
  name:string;
}

export const updatePetName: ActionCreator<PetNameAction> = (name) => {
  return {type: PET_NAME, name};
}

// PET_WEARINESS

const PET_WEARINESS = 'PET_WEARINESS';
export type PetWearinessAction = {
  type: typeof PET_WEARINESS;
  wearinessWidth: number;
}

export const updatePetWeariness: ActionCreator<PetWearinessAction> = (wearinessWidth) => {
  return {type: PET_WEARINESS, wearinessWidth};
}

// PET_HUNGER

const PET_HUNGER = 'PET_HUNGER';
export type PetHungerActoin = {
  type: typeof PET_HUNGER;
  hungerWidth: number;
}

export const updatePetHunger: ActionCreator<PetHungerActoin> = (hungerWidth) => {
  return {type: PET_HUNGER, hungerWidth};
}

// PET_BOREDOM

const PET_BOREDOM = 'PET_BOREDOM';
export type PetBoredomAction = {
  type: typeof PET_BOREDOM;
  boredomWidth: number;
}

export const updatePetBoredom: ActionCreator<PetBoredomAction> = (boredomWidth) => {
  return {type: PET_BOREDOM, boredomWidth};
}

// PET_PURITY

const PET_PURITY = 'PET_PURITY';
export type PetPurityAction = {
  type: typeof PET_PURITY;
  purityWidth: number;
}

export const updatePetPurity: ActionCreator<PetPurityAction> = (purityWidth) => {
  return {type: PET_PURITY, purityWidth};
}

// Reducer

type MyAction = PetNameAction | PetWearinessAction | PetHungerActoin | PetBoredomAction | PetPurityAction;

export const rootReducer: Reducer<RootState, MyAction> = (state = initialState, action) => {
  switch (action.type) {
    case PET_NAME: return {...state, name: action.name};
    case PET_WEARINESS: return {...state, wearinessWidth: action.wearinessWidth};
    case PET_HUNGER: return {...state, hungerWidth: action.hungerWidth};
    case PET_BOREDOM: return {...state, boredomWidth: action.boredomWidth};
    case PET_PURITY: return {...state, purityWidth: action.purityWidth};
    default: return state;
  }
}
