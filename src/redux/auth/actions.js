import authTypes from "./types";

export function signUp() {
  return {
    type: authTypes.signUp,
  };
}

export function signIn() {
  return {
    type: authTypes.signIn,
  };
}

export function signOut() {
  return {
    type: authTypes.signOut,
  };
}
