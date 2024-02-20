import randomString from './random_string';

describe('randomString function test', () => {
  test('should return a random string', async () => {
    const rta = await randomString();
    expect(rta).toEqual(expect.any(String));
  });
  test('should return a random string of 10 characters', async () => {
    const rta = await randomString();
    expect(rta).toHaveLength(10);
  });
});
