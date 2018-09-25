import _ from 'lodash'

const domain = _.get(JSON.parse(localStorage.getItem('reduxState')), 'currentUser.domain')
const baseUrl = window.baseurl
const matchBaseUrl = /^(.*)\/\/(.*)$/.exec(baseUrl) || [];
export const HOST = matchBaseUrl[1] + '//' + domain + '.' + matchBaseUrl[2];
export const AVATAR_URL = `${HOST}/static/`
export const NEWHOST = window.newHost
export const example = {}

export const WEBSOCKETURL = (id) => {
  const matchBaseUrl = /^(.*):\/\/(.*)$/.exec(window.baseurl);
  const websocketURL = `${matchBaseUrl[1] === 'http' ? 'ws' : 'wss'}://ws.${matchBaseUrl[2]}/websocket/${id}`;
  return websocketURL;
}