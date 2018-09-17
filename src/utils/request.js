/* global window localStorage */
import fetch from 'dva/fetch';
import _ from 'lodash';
import urljoin from 'url-join';
import jsonToQuery from 'utils/url_helper';
//import { HOST } from 'constants/APIConstants';

export function getRequestHeaders() {
  const storageState = JSON.parse(localStorage.getItem('reduxState'));
  const token = _.get(storageState, 'currentUser.token');

  return {
    token
  }
}

function parseJSON(response) {
  if (response.status === 204) {
    return Promise.resolve({ data: 'success' });
  }
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  // 提示请求错误
  // errorMessage(response.status);
  throw error;
}

export function requestUrl({ host, url, params }) {
  const domain = _.get(JSON.parse(localStorage.getItem('reduxState')), 'currentUser.domain')
  const baseUrl = window.baseurl
  const matchBaseUrl = /^(.*)\/\/(.*)$/.exec(baseUrl) || [];
  const HOST = matchBaseUrl[1] + '//' + domain + '.' + matchBaseUrl[2];
  const reqHost = host || HOST;
  const queryString = _.isEmpty(params) ? '' : jsonToQuery(params);
  if (queryString) {
    return `${urljoin(reqHost, url)}${queryString}`;
  }
  return `${urljoin(reqHost, url)}`
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */

function _fetch(fetchPromise, timeout) {
  let abortFn = null;

  //这是一个可以被reject的promise
  const abortPromise = new Promise(((resolve, reject) => {
    abortFn = function () {
      reject('abort promise');
    };
  }));

  //这里使用Promise.race，以最快 resolve 或 reject 的结果来传入后续绑定的回调
  const abortablePromise = Promise.race([
    fetchPromise,
    abortPromise
  ]);

  setTimeout(() => {
    abortFn();
  }, timeout);

  return abortablePromise;
}

export function request(url, options) {
  return _fetch(fetch(url, options), 120000)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }));
}

export function requestSimple({ url, method, headers, params, body, token, host }) {
  const reqURL = requestUrl({ host, url, params });
  const requestHeaders = getRequestHeaders();
  return request(reqURL, {
    method,
    headers: _.pickBy({
      'Content-Type': 'application/json',
      Authorization: `jwt ${requestHeaders.token}`,
      ...headers
    }),
    body: JSON.stringify(body)
  });
}

export function requestNoToken({ url, method, headers, params, body, token, host }) {
  const reqURL = requestUrl({ host, url, params });
  return request(reqURL, {
    method,
    headers: _.pickBy({
      'Content-Type': 'application/json',
      ...headers
    }),
    body: JSON.stringify(body)
  });
}
