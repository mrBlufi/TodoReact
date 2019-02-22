import { applyMiddleware, compose, createStore } from 'redux';

import DevTools from '../containers/DevTools';
import api from '../middleware/api';
import logger from './../middleware/logger';
import reducer from './reducer';

export default createStore(
  reducer,
  compose(
    applyMiddleware(logger, api),
    DevTools.instrument()
  )
);
