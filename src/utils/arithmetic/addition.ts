import boom from '@hapi/boom';
export default function addition(a: number, b: number | null) {
  if ((!b && b !== 0) || (!a && a !== 0)) {
    throw boom.badRequest(
      'You must fill in all the fields to perform this operation.',
    );
  }
  return a! + b!;
}
