import { Route, BrowserRouter as Router } from 'react-router-dom';

import DevTools from './DevTools';
import PropTypes from 'prop-types';
import React from 'react';
import TaskPanel from './TaskPanel';
import { hot } from 'react-hot-loader';

const Root = ({ store }) => (
  <div>
    <Router>
      <Route path="/" component={TaskPanel} />
    </Router>
    <DevTools />
  </div>
);

// Root.propTypes = {
//   store: PropTypes.object.isRequired,
// }
/* <Route path="/:login/:name"
             component={RepoPage} />
      <Route path="/:login"
             component={UserPage} /> */
export default hot(module)(Root);
