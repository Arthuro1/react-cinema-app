import { APP_ROUTES } from '../types';

export const appRoutes = (routes) => async (dispatch) => {
  dispatch({ type: APP_ROUTES, payload: routes });
};
