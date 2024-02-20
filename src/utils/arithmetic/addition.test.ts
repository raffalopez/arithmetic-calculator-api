import addition from './addition';

describe('addition function test', () => {
  test('should return 30, when 10, 20 are added', () => {
    const rta = addition(10, 20);
    expect(rta).toEqual(30);
  });
});
