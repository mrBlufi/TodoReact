import { CALL_API } from './../middleware/api';

export const FAILURE = 'FAILURE';
export const SUCCESS = 'SUCCESS';

const BASE_TYPES = [SUCCESS, FAILURE];

export const USER = {
  LOGIN_USER: 'LOGIN_USER',
  SIGN_OUT_USER: 'SIGN_OUT_USER'
};

function logIn(login, password) {
  return {
    [CALL_API]: {
      types: [USER.LOGIN_USER, ...BASE_TYPES],
      endpoint: 'user/login',
      params: { login, password }
    }
  };
}

export const loadUser = (login, password) => (dispatch, getState) => {
  if (getState().user) {
    return null;
  }

  return dispatch(logIn(login, password));
};

export const TASK = {
  ADD_TASK: 'ADD_TASK',
  UPDATE_TASK: 'UPDATE_TASK',
  REMOVE_TASK: 'REMOVE_TASK'
};

export function addTask({ title, description, dueDate }) {
  console.log('here');
  return {
    [CALL_API]: {
      types: [TASK.ADD_TASK, ...BASE_TYPES],
      endpoint: 'task',
      params: {
        title,
        description,
        dueDate
      }
    }
  };
}

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
};

export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

export function setVisibilityFilter(filter) {
  return { types: [SET_VISIBILITY_FILTER, ...BASE_TYPES], filter };
}
