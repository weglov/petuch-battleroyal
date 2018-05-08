export const config = {
  width: 3,
  height: 2,
  alphabet: [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' ],
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
};

export default config;