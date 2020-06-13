import { APP_ROUTES } from '../types';

const initialState = {
  routesArray: [],
  path: '',
  url: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case APP_ROUTES:
      return {
        ...state,
        routesArray: action.payload
      };
    default:
      return state;
  }
};
