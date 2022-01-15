import { signIn, signUp } from "../services/fetch";
import authTypes from "./types";

export function signUpRequest({ email, password }) {
  return async (dispatch) => {
    const { error, message } = await signUp({ email, password });
    console.log({ error, message });
    if (error) {
      return dispatch(signUpFailure(error));
    }
    return dispatch(signUpSuccess(message));
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

export function signInRequest({ email, password }) {
  return async (dispatch) => {
    const { error, message } = await signIn({ email, password });
    console.log({ error, message });
    if (error) {
      return dispatch(signInFailure(error));
    }
    return dispatch(signInSuccess(message));
  };
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
