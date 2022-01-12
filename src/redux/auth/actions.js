import { signUp } from "../services/fetch";
import authTypes from "./types";

export function signUpRequest({ username, password }) {
  return async (dispatch) => {
    const tokens = await signUp({ username, password });
    console.log(tokens);
    dispatch(signUpSuccess(tokens));
  };
}

export function signUpSuccess(payload) {
  return {
    type: authTypes.signUp.success,
    payload,
  };
}

export function signUpFailure(error) {
  return {
    type: authTypes.signUp.failure,
    payload: error,
  };
}

export function signInRequest() {
  return () => {};
}

export function signInSuccess(payload) {
  return {
    type: authTypes.signIn.success,
    payload,
  };
}

export function signInFailure(error) {
  return {
    type: authTypes.signIn.failure,
    payload: error,
  };
}

export function signOutRequest() {
  return () => {};
}

export function signOutSuccess(payload) {
  return {
    type: authTypes.signOut.success,
    payload,
  };
}

export function signOutFailure(error) {
  return {
    type: authTypes.signOut.failure,
    payload: error,
  };
}
