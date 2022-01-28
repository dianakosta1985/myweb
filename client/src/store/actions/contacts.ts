import axios from "axios";
import { Contact } from "../../types/contact";

export const LOAD_CONTACTS_REQUEST = "LOAD_CONTACTS_REQUEST";
export const LOAD_CONTACTS_SUCCESS = "LOAD_CONTACTS_SUCCESS";
export const LOAD_CONTACTS_FAILURE = "LOAD_CONTACTS_FAILURE";
export const ADD_CONTACT = "ADD_CONTACT";
export const DELETE_CONTACT = "DELETE_CONTACT";
export const SORT_CONTACTS = "SORT_CONTACTS";


const sortArray = (items: Contact[], type: string)  => {
  const allTypes = {
    first: 'first',
    last: 'last',
    phone: 'phone'
  };
  //@ts-ignore
  const sortProperty = allTypes[type];
  let sorted ;
  if(type === "first" || type === "last"){ // TBD flat this field
    //@ts-ignore
    sorted = [...items].sort((a, b) => a["name"][sortProperty].localeCompare(b["name"][sortProperty]));
  }else{
     //@ts-ignore
     sorted = [...items].sort((a, b) => a[sortProperty].localeCompare(b[sortProperty]));
  }
  console.log(sorted);
  return sorted;
};



export function sortItems(items: Contact[], sortType:string){
  return (dispatch: any) => {

    const sortedItems = sortArray(items, sortType);

    const payload = {
      items: sortedItems,
    };
    dispatch({
      type: SORT_CONTACTS,
      payload,
    });
  }
}

export function deleteContact(item: any) {
  return async (dispatch: any) => {
    const url = `${process.env.REACT_APP_SERVER_DOMAIN}/contacts/delete-contact`;
    console.log("url", url);
    console.log("item", item);
    axios
      .delete(url, item)
      .then((res) => {
        console.log("delete contact", res.data);

        const payload = item;

        dispatch({
          type: DELETE_CONTACT,
          payload,
        });
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
        dispatch({
          type: LOAD_CONTACTS_FAILURE,
          payload: err.response,
        });
      });
  };
}

export function addContact(item: any) {
  return async (dispatch: any) => {
    const url = `${process.env.REACT_APP_SERVER_DOMAIN}/contacts/add-contact`;
    console.log("url", url);
    axios
      .post(url, item)
      .then((res) => {
        console.log("new contact Id", res.data);

        const newContact = Object.assign({}, item, {
          _id: res.data.insertedId,
        });
        const payload = {
          items: newContact,
        };

        dispatch({
          type: ADD_CONTACT,
          payload,
        });
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
        dispatch({
          type: LOAD_CONTACTS_FAILURE,
          payload: err.response,
        });
      });
  };
}

export function loadContacts(cursor: Number) {
  return async (dispatch: any) => {
    dispatch({
      type: LOAD_CONTACTS_REQUEST,
    });

    //const url = `https://randomuser.me/api/?results=${cursor}`;
    const url = `${process.env.REACT_APP_SERVER_DOMAIN}/contacts/get-all`;
    console.log("url", url);
    axios
      .get(url)
      .then((res) => {
        console.log("assets", res.data);

        const sortedItems = sortArray(res.data, "first");

        const payload = {
          items: sortedItems,
          cursor: 10, //res.data.results.cursor,
          hasMore: false, //res.data.results.hasMore
        };

        dispatch({
          type: LOAD_CONTACTS_SUCCESS,
          payload,
        });
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
        dispatch({
          type: LOAD_CONTACTS_FAILURE,
          payload: err.response,
        });
      });
  };
}
