import { left, right } from 'fp-ts/lib/Either';
import matchers from '../index';

expect.extend(matchers);

describe('.toEqualRight should pass', () => {
  test('if received is a Right with the expected value', () => {
    expect(right('Right')).toEqualRight('Right');
  });
  test('if received is a Right with an undefined expected value', () => {
    expect(right(undefined)).toEqualRight(undefined);
  });
  test('if the received is a Right with a null expected value', () => {
    expect(right(null)).toEqualRight(null);
  });
});

describe('.toEqualRight should fail', () => {
  test('if received is a Left', () => {
    expect(() => expect(left('right')).toEqualRight('right')).toThrowError();
  });
  test('if received is a Right that does not equal the expected value', () => {
    expect(() => expect(right('another right')).toEqualRight('right')).toThrowError();
  });
});

describe('.not.toEqualRight should pass', () => {
  test('if received is a Right that does not have the expected value', () => {
    expect(right('Right')).not.toEqualRight('A different value');
  });
  test('if received is a Left with the expected value', () => {
    expect(left('Left')).not.toEqualRight('Left');
  });
});

describe('.not.toEqualRight should fail', () => {
  test('if received is a Right that equals the expected value', () => {
    expect(() => expect(right('right')).not.toEqualRight('right')).toThrowError();
  });
});
