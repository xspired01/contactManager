import {
  GET_CONTACTS,
  DELETE_CONTACT,
  ADD_CONTACT,
  GET_CONTACT,
  UPDATE_CONTACT
} from "./types";
import axios from "axios";

export const getContacts = () => async dispatch => {
  const res = await axios.get(`http://localhost:5000/api/contact/`);
  dispatch({
    type: GET_CONTACTS,
    payload: res.data
  });
};

export const getContact = id => async dispatch => {
  const res = await axios.get(`http://localhost:5000/api/contact/${id}`);
  dispatch({
    type: GET_CONTACT,
    payload: res.data
  });
};

export const deleteContact = id => async dispatch => {
  await axios.delete(`http://localhost:5000/api/contact/${id}`);
  dispatch({
    type: DELETE_CONTACT,
    payload: id
  });
};

export const addContact = contact => async dispatch => {
  const res = await axios.post(`http://localhost:5000/api/contact/`, contact);
  dispatch({
    type: ADD_CONTACT,
    payload: res.data[0]
  });
};

export const updateContact = contact => async dispatch => {
  const res = await axios.put(
    `http://localhost:5000/api/contact/${contact.id}`,
    contact
  );
  console.log(res);
  dispatch({
    type: UPDATE_CONTACT,
    payload: res.data[0]
  });
};
