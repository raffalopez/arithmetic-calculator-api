import subtraction from '../utils/arithmetic/subtraction';

describe('subtraction function test', () => {
  test('should return 10, subtracting 20, 10', () => {
    const rta = subtraction(20, 10);
    expect(rta).toEqual(10);
  });
});
