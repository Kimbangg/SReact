import { Action } from '@/types/Store';
import { DECREASE_NUMBER, INCREASE_NUMBER } from './actionTypes';

export const increaseNumber = (): Action => {
  return {
    type: INCREASE_NUMBER,
  };
};

export const decreaseNumber = (): Action => {
  return {
    type: DECREASE_NUMBER,
  };
};
