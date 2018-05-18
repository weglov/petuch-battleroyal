import config from './config';


export const api = (url, data) => {
  const defaultOptions = {
    method: 'GET',
  }

  const options = Object.assign({}, defaultOptions, data);

  return fetch(config.api + url, options)
    .then((res) => res.json())
    .catch(error => error);
}