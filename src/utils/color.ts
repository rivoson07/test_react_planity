const HEX_VALUES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];

export const randomHexColor = () => {
  let hex = '#';

  for (let i = 0; i < 6; i++) {
    const index = Math.floor(Math.random() * HEX_VALUES.length);
    hex += HEX_VALUES[index];
  }

  return hex;
};
