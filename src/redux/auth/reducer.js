import authTypes from "./types";

const initialState = {
  isLoading: true,
  isAuthenticated: false,
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
    default:
      return state;
  }
}
