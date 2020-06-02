import { LOGIN, LOADING, ERROR, LOGOUT, AUTO_LOGIN } from "../types/auth";

const initialState = {
  userId: null,
  token: null,
  username: null,
  didTryLogin: false,
  loading: false,
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        userId: action.userData.userId,
        token: action.userData.token,
        username: action.userData.username,
        error: false,
        didTryLogin: true,
      };
    case LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    case LOGOUT:
      return {
        ...initialState,
      };
    case ERROR:
      return {
        ...state,
        loading: false,
        error: action.message,
      };
    case AUTO_LOGIN:
      if (!action.success)
        return {
          ...state,
          loading: false,
          token: null,
          userId: null,
          username: null,
          didTryLogin: true
        };
      return {
        ...state,
        loading: false,
        token: action.userData.token,
        userId: action.userData.userId,
        username: action.userData.username,
        error: false,
        didTryLogin: true,
      };
    default:
      return state;
  }
};

export default reducer;
