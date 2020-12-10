import { ADD_FILTER, ADD_USER, CHANGE_USER_PARAMS, CHECK_VALID, REMOVE_USER, SET_DEFAULT_USER, SHOW_FORM } from "./actionTypes";

export function addFilter(filter) {
  return {
    type: ADD_FILTER,
    payload: filter
  }
}

export function changeUserParams(user) {
  return {
    type: CHANGE_USER_PARAMS,
    payload: user
  }
}

export function showForm() {
  return {
    type: SHOW_FORM
  }
}

export function checkValid(valid) {
  return {
    type: CHECK_VALID,
    payload: valid
  }
}

export function addUser(users) {
  return {
    type: ADD_USER,
    payload: users
  }
}

export function removeUser(users) {
  return {
    type: REMOVE_USER,
    payload: users
  }
}

export function setDefaultUser() {
  return {
    type: SET_DEFAULT_USER
  }
}