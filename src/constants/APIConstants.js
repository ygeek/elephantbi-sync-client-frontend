export const HOST = window.host;
export const NEWHOST = window.newHost
export const example = {}

export const WEBSOCKETURL = (id) => {
  const matchBaseUrl = /^(.*):\/\/(.*)$/.exec(window.baseurl);
  const websocketURL = `${matchBaseUrl[1] === 'http' ? 'ws' : 'wss'}://ws.${matchBaseUrl[2]}/websocket/${id}`;
  return websocketURL;
}