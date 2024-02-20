import boom from '@hapi/boom';

import squareRoot from './square_root';

describe('squareRoot function test', () => {
  test('should return 9, when taking the square root of 81', () => {
    const rta = squareRoot(81);
    expect(rta).toEqual(9);
  });
  test('should return a boom error when taking the square root of zero or a number for negative', async () => {
    let rta1;
    let rta2;
    try {
      rta1 = squareRoot(0);
      rta2 = squareRoot(-12);
    } catch (error) {
      rta2 = error;
      rta1 = error;
    }
    expect(boom.isBoom(rta1)).toBeTruthy();
    expect(boom.isBoom(rta2)).toBeTruthy();
  });
});
