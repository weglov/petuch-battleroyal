import config from './config';


export const api = (url, data = { headers: {} }) => {
  const defaultOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }

  const heads = Object.assign({}, defaultOptions.headers, data.headers);

  const options = Object.assign({}, defaultOptions, data, { headers: heads });

  return fetch(config.api + url, options)
    .then((res) => res.json())
    .catch(error => error);
}


export const pushScore = async (data) => {
  const result = await api('push-score', data);

  return result;
}

export const getCustomToken = async (code) => {
  const result = await api(`login/by/code/${code}`);

  return result;
}

export const emojiUrl = (str) => {
  if (str.length > 1) return `${config.emojiCdn}${str.toLowerCase()}.png`
};