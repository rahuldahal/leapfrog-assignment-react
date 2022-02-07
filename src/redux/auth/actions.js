import { checkAuthStatusRequest, signIn, signUp } from "../services/fetch";
import authTypes from "./types";

export function checkAuthStatus({ accessToken }) {
  return async (dispatch) => {
    const status = await checkAuthStatusRequest({ accessToken });
    console.log({ status });
    if (status === 200) {
      return dispatch(checkAuthStatusSuccess("success"));
    }
    return dispatch(checkAuthStatusFailure("error"));
  };
}

function checkAuthStatusSuccess(payload) {
  console.log({ payload });
  return {
    type: authTypes.status.success,
    payload: {},
  };
}

function checkAuthStatusFailure(error) {
  console.log({ error });
  return {
    type: authTypes.status.failure,
    payload: error,
  };
}

export function signUpRequest({ email, password }) {
  return async (dispatch) => {
    const message = await signUp({ email, password });
    const { error } = message;
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
    const message = await signIn({ email, password });
    const { error } = message;
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
