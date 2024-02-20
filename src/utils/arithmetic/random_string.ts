import RandomOrg from 'random-org';
import config from '../../config/config';

export default async function randomString() {
  let random = new RandomOrg({
    apiKey: config.apiKeyRandom,
  });
  const randomString = await random
    .generateStrings({ n: 1, length: 10, characters: 'string' })
    .then(function (result) {
      return result.random.data;
    });

  return randomString[0];
}
