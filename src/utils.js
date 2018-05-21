import config from './config';


export const api = (url, data) => {
  const defaultOptions = {
    method: 'GET',
    'Content-Type': 'application/json',
  }

  const options = Object.assign({}, defaultOptions, data);

  return fetch(config.api + url, options)
    .then((res) => res.json())
    .catch(error => error);
}


export const pushScore = async (data) => {
  const result = await api('push-score', data);

  return result;
}