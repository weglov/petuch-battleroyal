export const config = {
  width: process.env.REACT_APP_AT_STAND ? 6 : 4,
  height: 4,
  maxGames: 5,
  crossRatio: .2,
  alphabet: [
    '1f436', // - 🐶
    '1f433', // - 🐳
    '1f414', // - 🐔
    '1f40d', // - 🐍
    '1f419', // - 🐙
    '1f984', // - 🦄
    '1f98A', // - 🦊
  ],
  rotateType: {
    1: ['1010', '0101'],
    2: ['1100', '0110', '0011', '1001'],
    3: ['1111'],
  },
  connections: {
    left: [0, 2],
    top: [1, 3],
    right: [2, 0],
    bottom: [3, 1],
  },
  nodes: {
    top: ['🌤️', '🌥️', '🌦️', '🌧️', '🌨️', '🌩️', '☁️', '⛅', '⛈️'],
    bottom: ['🐔', '🐣', '🐷', '🐙', '🐓', '🐋', '🦄', '🐘', '🐍', '🐟', '🐶', '🦊', '🐈', '🐖', '🐵', '🦆', '🐮', '🦁'],
  },
  emojiCdn: 'https://amplifr.com/emoji/assets/images/emojis/160/',
  api: 'https://us-central1-cloudpipeswin.cloudfunctions.net/api/',
};

export default config;