import authTypes from "./types";

const initialState = {
  isLoading: true,
  isAuthenticated: false,
  error: null,
  message: null,
};

// TODO: use react-thunk to query the API
export default function authReducer(state = initialState, action) {
  const { signUp } = authTypes;
  const { payload } = action;
  switch (action.type) {
    case signUp.success:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        message: payload,
      };
    case signUp.failure:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        message: null,
        error: payload,
      };
    default:
      return state;
  }
}
