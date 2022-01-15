import contactsTypes from "./types";

const initialState = {
  isLoading: true,
  error: null,
  contacts: null,
};

export default function contactsReducer(state = initialState, action) {
  const { getAll, newContact, updateContact, deleteContact } = contactsTypes;
  const { payload } = action;
  switch (action.type) {
    case getAll.success:
    case newContact.success:
    case deleteContact.success:
    case updateContact.success:
      return {
        ...state,
        isLoading: false,
        contacts: payload.contacts,
      };
    case getAll.failure:
    case newContact.failure:
    case deleteContact.failure:
    case updateContact.failure:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    default:
      return state;
  }
}
