import { USER_ACTIONS } from '../actions/constants';

const initialState = {
  userId: '',
  token: '',
};

function userReducer(state = initialState, { type, payload }) {
  switch (type) {
    case USER_ACTIONS.LOGIN: {
      const { userId, token } = payload;
      return {
        ...state,
        userId,
        token,
      };
    }
    case USER_ACTIONS.LOGOUT: {
      return {
        ...state,
        userId: '',
        token: '',
      };
    }
    default:
      return state;
  }
}

export default userReducer;
