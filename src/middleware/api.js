const API_URL = 'https://localhost:5001/api/';
export const CALL_API = 'Call API';

const callApi = (endpoint, params = {}) => {
  const fullUrl =
    endpoint.indexOf(API_URL) === -1 ? API_URL + endpoint : endpoint;

  if (params) {
    const reqParam = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(params)
    };
    return fetch(fullUrl, reqParam).then(response =>
      response.json().then(json => {
        if (!response.ok) {
          return Promise.reject(json);
        }
        return json;
      })
    );
  }

  return fetch(fullUrl).then(response =>
    response.json().then(json => {
      if (!response.ok) {
        return Promise.reject(json);
      }

      return json;
    })
  );
};

const api = store => next => action => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  let { endpoint } = callAPI;
  const { params, types } = callAPI;

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  };

  const [requestType, successType, failureType] = types;
  next(actionWith({ type: requestType }));

  return callApi(endpoint, params).then(
    response =>
      next(
        actionWith({
          response,
          type: { requestType, status: successType }
        })
      ),
    error =>
      next(
        actionWith({
          type: { requestType, status: failureType },
          statys: error.message || 'Something bad happened'
        })
      )
  );
};

export default api;
