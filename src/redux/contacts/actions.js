import { createContact, deleteContact, getContacts } from "../services/fetch";
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
export function newContactRequest({ name, phone, photograph, token }) {
  return async (dispatch) => {
    const message = await createContact({ name, phone, photograph, token });
    const { error } = message;
    if (error) {
      return dispatch(newContactFailure(error));
    }
    return dispatch(newContactSuccess(message));
  };
}

export function newContactSuccess(payload) {
  return {
    type: contactsTypes.newContact.success,
    payload,
  };
}

export function newContactFailure(error) {
  return {
    type: contactsTypes.newContact.failure,
    payload: error,
  };
}

export function deleteContactRequest({ _id, token }) {
  return async (dispatch) => {
    const message = await deleteContact({ _id, token });
    const { error } = message;
    if (error) {
      return dispatch(deleteContactFailure(error));
    }
    return dispatch(deleteContactSuccess(message));
  };
}

export function deleteContactSuccess(payload) {
  return {
    type: contactsTypes.deleteContact.success,
    payload,
  };
}

export function deleteContactFailure(error) {
  return {
    type: contactsTypes.deleteContact.failure,
    payload: error,
  };
}
