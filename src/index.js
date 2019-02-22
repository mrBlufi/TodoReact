import './index.scss';

import { Provider } from 'react-redux';
import React from 'react';
import Root from './containers/Root';
import { render } from 'react-dom';
import rootReducer from './store/configureStore';

render(
  <Provider store={rootReducer}>
    <Root />
  </Provider>,
  document.getElementById('app')
);
