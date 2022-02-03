import authTypes from "./types";

const initialState = {
  isLoading: true,
  isAuthenticated: false,
  error: null,
  accessToken: null,
  refreshToken: null,
};

// TODO: use react-thunk to query the API
export default function authReducer(state = initialState, action) {
  const { signUp, signIn } = authTypes;
  const { payload } = action;
  switch (action.type) {
    case signUp.success:
    case signIn.success:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        accessToken: payload.accessToken,
        refreshToken: payload.refreshToken,
      };
    case signUp.failure:
    case signIn.failure:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        error: payload,
      };
    default:
      return state;
  }
}
