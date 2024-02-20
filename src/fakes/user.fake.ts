import { faker } from '@faker-js/faker';

interface IFakeUser {
  id: string;
  email: string;
  password: string;
  amount: string;
  isActive: boolean;
  createdAt: Date;
}

function generateOneUser(): IFakeUser {
  return {
    id: faker.datatype.uuid(),
    email: faker.internet.email(),
    password: faker.random.alpha(8),
    amount: faker.random.alphaNumeric(4),
    isActive: faker.datatype.boolean(),
    createdAt: faker.datatype.datetime(),
  };
}

function generateManyUser(size: number) {
  const limit = size ?? 10;
  const fakeUsers: IFakeUser[] = [];
  for (let index = 0; index < limit; index += 1) {
    fakeUsers.push(generateOneUser());
  }
  return [...fakeUsers];
}

export { generateOneUser, generateManyUser };
