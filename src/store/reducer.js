import * as ActionTypes from './actions';

import { combineReducers } from 'redux';

const tasks = (
  state = [
    {
      id: '213',
      title: 'Title',
      description: 'Description',
      dueDate: '02/22/2019'
    },
    {
      id: '2213',
      title: 'Title',
      description: 'Description',
      dueDate: '02/22/2019'
    }
  ],
  action
) => {
  if (action.response && action.type.status === ActionTypes.SUCCESS) {
    switch (action.type.requestType) {
      case ActionTypes.TASK.ADD_TASK:
        return [...state, action.response];
    }
  }

  return state;
};

const user = (state = {}, action) => {
  return state;
};

const visibility = (state = ActionTypes.VisibilityFilters.SHOW_ALL, action) => {
  return state;
};

const errorMessage = (state = null, action) => {
  const { type, error } = action;

  if (type === ActionTypes.FAILURE) {
    return null;
  } else if (error) {
    return error;
  }

  return state;
};

const reducer = combineReducers({ tasks, visibility, user, errorMessage });
export default reducer;
