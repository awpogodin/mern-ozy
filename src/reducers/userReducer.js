import { USER_ACTIONS } from '../actions/constants';

const initialState = {
  user: {},
};

function userReducer(state = initialState, { type, payload }) {
  switch (type) {
    case USER_ACTIONS.LOGIN: {
      const {
        user,
      } = payload;
      return {
        ...state,
        user,
      };
    }
    case USER_ACTIONS.LOGOUT: {
      return {
        ...state,
        user: {},
      };
    }
    default:
      return state;
  }
}

export default userReducer;
