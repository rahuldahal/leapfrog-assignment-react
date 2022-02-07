import authTypes from "./types";

const initialState = {
  isLoading: true,
  isAuthenticated: false,
  error: null,
  accessToken: localStorage.getItem("accessToken"),
  refreshToken: localStorage.getItem("refreshToken"),
};

function addTokensToLocalStorage({ accessToken, refreshToken }) {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
}

// TODO: use react-thunk to query the API
export default function authReducer(state = initialState, action) {
  const { signUp, signIn, status } = authTypes;
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
    case status.success:
      const { accessToken, refreshToken } = payload;
      let newPairOfTokens = {};
      if (accessToken && refreshToken) {
        newPairOfTokens = { accessToken, refreshToken };
        addTokensToLocalStorage({ accessToken, refreshToken });
      }
      return {
        ...state,
        isLoading: true,
        isAuthenticated: true,
        ...newPairOfTokens,
      };
    case status.failure:
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
