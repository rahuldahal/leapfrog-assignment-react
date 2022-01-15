import { getContacts } from "../services/fetch";
import contactsTypes from "./types";

export function getAllRequest({ token }) {
  return async (dispatch) => {
    const message = await getContacts({ token });
    const { error } = message;
    if (error) {
      return dispatch(getAllFailure(error));
    }
    return dispatch(getAllSuccess(message));
  };
}

export function getAllSuccess(payload) {
  return {
    type: contactsTypes.getAll.success,
    payload,
  };
}

export function getAllFailure(error) {
  return {
    type: contactsTypes.getAll.failure,
    payload: error,
  };
}
