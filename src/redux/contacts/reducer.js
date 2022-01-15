import contactsTypes from "./types";

const initialState = {
  isLoading: true,
  error: null,
  contacts: null,
};

export default function contactsReducer(state = initialState, action) {
  const { getAll } = contactsTypes;
  const { payload } = action;
  switch (action.type) {
    case getAll.success:
      return {
        ...state,
        isLoading: false,
        contacts: payload.contacts,
      };
    case getAll.failure:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    default:
      return state;
  }
}
