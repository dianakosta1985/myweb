import {
    LOAD_CONTACTS_REQUEST, LOAD_CONTACTS_SUCCESS, LOAD_CONTACTS_FAILURE, ADD_CONTACT, DELETE_CONTACT
  } from '../actions/contacts';

  //import Result from '../../types/contact';
  
  export default function assets(state = {
    isLoading: false,
    errorMessage: '',
    items: [],
    cursor: '',
    hasMore: true
  }, {type, payload}) {
      switch (type) {
          case LOAD_CONTACTS_REQUEST:
              return Object.assign({}, state, {
                  isLoading: true,
                  errorMessage: '',
              });
          case LOAD_CONTACTS_SUCCESS:
              const items = state.items;
              items.push(...payload.items);
              
              return Object.assign({}, state, {
                  isLoading: false,
                  errorMessage: '',
                  items: items,
                  cursor: payload.cursor,
                  hasMore: payload.hasMore
              });
            case LOAD_CONTACTS_FAILURE:
                return Object.assign({}, state, {
                    isLoading: false,
                    errorMessage: payload,
                });
            case ADD_CONTACT:
                return Object.assign({}, state, {
                    isLoading: false,
                    errorMessage: '',
                    items: [...state.items, payload.items]
                });    
            case DELETE_CONTACT:
                state.items.splice(payload,1);

                return Object.assign({}, state, {
                isLoading: false,
                errorMessage: '',
                items: [...state.items]
            });    
          default:
              return state;
      }
  }
  