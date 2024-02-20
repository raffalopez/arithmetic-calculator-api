import addition from './addition';
import subtraction from './subtraction';
import multiplication from './multiplication';
import division from './division';
import squareRoot from './square_root';
import randomString from './random_string';

enum Types {
  addition = 'addition',
  subtraction = 'subtraction',
  division = 'division',
  square_root = 'square_root',
  multiplication = 'multiplication',
  random_string = 'random_string',
}

interface IOperation {
  numberA: number;
  numberB: number;
  type: Types;
}

export function arithmeticFn({ type, numberA, numberB }: IOperation) {
  switch (type) {
    case 'addition':
      return addition(numberA, numberB);
    case 'subtraction':
      return subtraction(numberA, numberB);
    case 'multiplication':
      return multiplication(numberA, numberB);
    case 'division':
      return division(numberA, numberB);
    case 'random_string':
      return randomString();
    case 'square_root':
      return squareRoot(numberA);
    default:
      return null;
  }
}
