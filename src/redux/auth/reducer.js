import authTypes from "./types";

const initialState = {
  isLoading: true,
  isAuthenticated: false,
  message: null,
};

// TODO: use react-thunk to query the API
export default function authReducer(state = initialState, action) {
  const { signUp, signIn, signOut } = authTypes;
  switch (action.type) {
    case signUp:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        message: "Your account been created successfully.",
      };
    case signIn:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        message: "You have been authenticated successfully.",
      };
    case signOut:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        message: "You have been signed out from the application.",
      };
    default:
      return state;
  }
}
