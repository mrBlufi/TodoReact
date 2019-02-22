import { CALL_API } from './api';

const logger = store => next => action => {
  if (action[CALL_API]) {
    console.group(action[CALL_API].types);
  } else {
    console.group(action.type);
  }
  console.info('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  console.groupEnd();
  return result;
};

export default logger;
