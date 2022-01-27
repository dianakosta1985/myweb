import axios from 'axios';

export const LOAD_CONTACTS_REQUEST = 'LOAD_CONTACTS_REQUEST';
export const LOAD_CONTACTS_SUCCESS = 'LOAD_CONTACTS_SUCCESS';
export const LOAD_CONTACTS_FAILURE = 'LOAD_CONTACTS_FAILURE';
export const ADD_CONTACT = 'ADD_CONTACT';
export const DELETE_CONTACT = 'DELETE_CONTACT';


export function deleteContact(index, email){ 
  return async (dispatch) => {

    console.log(email);
    const url = 'http://localhost:9000/contacts/delete-contact';
    console.log("url", url);
    axios.delete(url, email).then((res) => {
      console.log("delete contact", res.data);
     
      const payload = index;
    
      dispatch({
        type: DELETE_CONTACT,
        payload
      });
  
      
    }).catch((err) => {
      console.log(err);
      console.log(err.response);
      dispatch({
        type: LOAD_CONTACTS_FAILURE,
        payload: err.response
      });
    });


  };
}


export function addContact(item) {
  return async (dispatch) => {

    const url = 'http://localhost:9000/contacts/add-contact';
    console.log("url", url);
    axios.post(url, item).then((res) => {
      console.log("new contact Id", res.data);
      
      const newContact =  Object.assign( {} ,item, {
        _id: res.data.insertedId
      });
      const payload = {
        items: newContact
      }

      dispatch({
        type: ADD_CONTACT,
        payload
      });
      
      
    }).catch((err) => {
      console.log(err);
      console.log(err.response);
      dispatch({
        type: LOAD_CONTACTS_FAILURE,
        payload: err.response
      });
    });

  };
}


export function loadContacts(cursor) {
  return async (dispatch) => {
    dispatch({
      type: LOAD_CONTACTS_REQUEST,
    });
    
    //const url = `https://randomuser.me/api/?results=${cursor}`;
    const url = 'http://localhost:9000/contacts/get-all';
    console.log("url", url);
    axios.get(url).then((res) => {
      console.log("assets", res.data);
      
      const payload = {
        items: res.data,
        cursor: 10,//res.data.results.cursor,
        hasMore: false,//res.data.results.hasMore
      }

      dispatch({
        type: LOAD_CONTACTS_SUCCESS,
        payload
      });
    }).catch((err) => {
      console.log(err);
      console.log(err.response);
      dispatch({
        type: LOAD_CONTACTS_FAILURE,
        payload: err.response
      });
    });
  };
}