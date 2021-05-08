// action
import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initalState = [];

export default function (state = initalState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      return [...state, action.payload];
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== payload);
    default:
      return state;
  }
}