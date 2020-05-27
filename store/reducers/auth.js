import { LOGIN, LOADING, ERROR, LOGOUT } from "../types/auth";

const initialState = {
  userId: null,
  token: null,
  username: null,
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
    default:
      return state;
  }
};

export default reducer;
