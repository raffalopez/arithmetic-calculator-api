import boom from '@hapi/boom';

export default function multiplication(a: number, b: number) {
  if ((!b && b !== 0) || (!a && a !== 0)) {
    throw boom.badRequest(
      'You must fill in all the fields to perform this operation.',
    );
  }
  return a * b;
}
