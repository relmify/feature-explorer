import { left, right } from 'fp-ts/lib/Either';
import matchers from '../index';

expect.extend(matchers);

describe('.toBeLeft should pass', () => {
  test('if received is a Left', () => {
    expect(left('Left')).toBeLeft();
  });
});

describe('.toBeLeft should fail', () => {
  test('if received is a right', () => {
    expect(() => expect(right('right')).toBeLeft()).toThrowError();
  });
});

describe('.not.toBeLeft should pass', () => {
  test('if received is a Right', () => {
    expect(right('Right')).not.toBeLeft();
  });
});

describe('.not.toBeLeft should fail', () => {
  test('if received is a left', () => {
    expect(() => expect(left('left')).not.toBeLeft()).toThrowError();
  });
});
