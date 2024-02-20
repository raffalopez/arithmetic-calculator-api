import boom from '@hapi/boom';

import division from './division';

describe('division function test', () => {
  test('should return 20, when divided by 40, 2', () => {
    const rta = division(40, 2);
    expect(rta).toEqual(20);
  });
  test('should return a boom error when dividing a number by zero', async () => {
    let rta;
    try {
      rta = division(40, 0);
    } catch (error) {
      rta = error;
    }
    expect(boom.isBoom(rta)).toBeTruthy();
  });
});
