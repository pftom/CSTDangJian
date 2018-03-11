'use strict';

import queryString from 'query-string';
import _ from 'lodash';

// The http header for request
const header = (METHOD, token, multipart) => ({
  method: METHOD,
  headers: {
    'Content-Type': multipart ? 'multipart/form-data;' : 'application/json',
    'Authorization': `Token ${token}`
  },
});

let request = {};

request.get =  ( url, item, token ) => {
  let options = null;
  console.log('params', item, token);
  if (item) {
    url += '?' + queryString.stringify(item);
  }

  if (token) {
    options = _.extend(header('GET', token));
  } else {
    options = _.extend(header('GET'));
  }

  console.log('url', url);
  console.log('options', options);

  return fetch(url, options)
      .then(response => {
        if (response.status !== 200 || !response.ok) {
          throw response.json();
        }
        return response.json();
      })
}

request.post = ( url, body ) => {
  let options = _.extend(header('POST'), {
    body: JSON.stringify(body),
  });


  console.log('url', url);
  console.log('options', options);
  return fetch(url, options)
        .then(response => {
          if (response.status >= 400 || !response.ok) {
            throw response.json();
          }
          return response.json();
        })
}

request.put = ( url, body, token, multipart ) => {
  let options = _.extend(header('PUT', token, multipart), {
    body: multipart ? body : JSON.stringify(body),
  });

  console.log('url', url);
  console.log('options', options);

  return fetch(url, options) 
        .then(response => {
          if (response.status >= 400 || !response.ok) {
            throw response.json();
          }
          return response.json();
        })
}

export default request;
