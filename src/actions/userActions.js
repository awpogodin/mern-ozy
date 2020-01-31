import { USER_ACTIONS } from './constants';

export const login = (user) => ({
  type: USER_ACTIONS.LOGIN,
  payload: {
    user,
  },
});

export const logout = () => ({
  type: USER_ACTIONS.LOGIN,
  payload: {},
});
