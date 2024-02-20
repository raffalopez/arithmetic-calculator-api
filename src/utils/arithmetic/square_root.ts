import boom from '@hapi/boom';

export default function squareRoot(a: number) {
  if (!a && a !== 0) {
    throw boom.badRequest(
      'You must fill in all the fields to perform this operation.',
    );
  }
  if (a < 0) {
    throw boom.badRequest(
      'to perform this operation, the number must be 0 or positive.',
    );
  }
  return Math.sqrt(a);
}
