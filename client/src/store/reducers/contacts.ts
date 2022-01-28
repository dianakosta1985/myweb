import { Contact } from "../../types/contact";
import {
  LOAD_CONTACTS_REQUEST,
  LOAD_CONTACTS_SUCCESS,
  LOAD_CONTACTS_FAILURE,
  ADD_CONTACT,
  DELETE_CONTACT,
  SORT_CONTACTS
} from "../actions/contacts";

//import Result from '../../types/contact';

export interface Action {
  type: string;
  payload: any;
}

export default function assets(
  state = {
    isLoading: false,
    errorMessage: "",
    items: [],
    cursor: "",
    hasMore: true,
  },
  { type, payload }: Action
) {
  switch (type) {
    case LOAD_CONTACTS_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
        errorMessage: "",
      });
    case LOAD_CONTACTS_SUCCESS:
      const items = state.items as any;
      items.push(...payload.items);

      return Object.assign({}, state, {
        isLoading: false,
        errorMessage: "",
        items: items,
        cursor: payload.cursor,
        hasMore: payload.hasMore,
      });
    case LOAD_CONTACTS_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        errorMessage: payload,
      });
    case ADD_CONTACT:
      return Object.assign({}, state, {
        isLoading: false,
        errorMessage: "",
        items: [payload.items, ...state.items],
      });
    case DELETE_CONTACT:
      //@ts-ignore
      const index = state.items.indexOf(payload)
      state.items.splice(index, 1);
      return Object.assign({}, state, {
        isLoading: false,
        errorMessage: "",
        items: [...state.items],
      });
    case SORT_CONTACTS:
      return Object.assign({}, state, {
        isLoading: false,
        errorMessage: "",
        items: payload.items,
      });
     
    default:
      return state;
  }
}
