import multiplication from './multiplication';

describe('multiplication function test', () => {
  test('should return 40, when multiplying by 20, 2', () => {
    const rta = multiplication(20, 2);
    expect(rta).toEqual(40);
  });
});
