import { Integer, PositiveInteger, NonNegativeInteger, NegativeInteger, NonZeroInteger } from '../Integer';

describe('Integer.is()', () => {
  test.each([
    [Number.POSITIVE_INFINITY, false],
    [Number.MAX_VALUE, true],
    [Number.MAX_SAFE_INTEGER, true],
    [1, true],
    [Number.MIN_VALUE, false],
    [0, true],
    [-Number.MIN_VALUE, false],
    [-1, true],
    [-Number.MAX_SAFE_INTEGER, true],
    [-Number.MAX_VALUE, true],
    [Number.NEGATIVE_INFINITY, false],
    [NaN, false],
    ['not a number', false],
  ])('with input: %p should return: %p', (input, expected) => {
    expect(Integer.is(input)).toBe(expected);
  });
});

describe('PositiveInteger.is()', () => {
  test.each([
    [Number.POSITIVE_INFINITY, false],
    [Number.MAX_VALUE, true],
    [Number.MAX_SAFE_INTEGER, true],
    [1, true],
    [Number.MIN_VALUE, false],
    [0, false],
    [-Number.MIN_VALUE, false],
    [-1, false],
    [-Number.MAX_SAFE_INTEGER, false],
    [-Number.MAX_VALUE, false],
    [Number.NEGATIVE_INFINITY, false],
    [NaN, false],
    ['not a number', false],
  ])('with input: %p should return: %p', (input, expected) => {
    expect(PositiveInteger.is(input)).toBe(expected);
  });
});

describe('NonNegativeInteger.is()', () => {
  test.each([
    [Number.POSITIVE_INFINITY, false],
    [Number.MAX_VALUE, true],
    [Number.MAX_SAFE_INTEGER, true],
    [1, true],
    [Number.MIN_VALUE, false],
    [0, true],
    [-Number.MIN_VALUE, false],
    [-1, false],
    [-Number.MAX_SAFE_INTEGER, false],
    [-Number.MAX_VALUE, false],
    [Number.NEGATIVE_INFINITY, false],
    [NaN, false],
    ['not a number', false],
  ])('with input: %p should return: %p', (input, expected) => {
    expect(NonNegativeInteger.is(input)).toBe(expected);
  });
});

describe('NegativeInteger.is()', () => {
  test.each([
    [Number.POSITIVE_INFINITY, false],
    [Number.MAX_VALUE, false],
    [Number.MAX_SAFE_INTEGER, false],
    [1, false],
    [Number.MIN_VALUE, false],
    [0, false],
    [-Number.MIN_VALUE, false],
    [-1, true],
    [-Number.MAX_SAFE_INTEGER, true],
    [-Number.MAX_VALUE, true],
    [Number.NEGATIVE_INFINITY, false],
    [NaN, false],
    ['not a number', false],
  ])('with input: %p should return: %p', (input, expected) => {
    expect(NegativeInteger.is(input)).toBe(expected);
  });
});

describe('NonZeroInteger.is()', () => {
  test.each([
    [Number.POSITIVE_INFINITY, false],
    [Number.MAX_VALUE, true],
    [Number.MAX_SAFE_INTEGER, true],
    [1, true],
    [Number.MIN_VALUE, false],
    [0, false],
    [-Number.MIN_VALUE, false],
    [-1, true],
    [-Number.MAX_SAFE_INTEGER, true],
    [-Number.MAX_VALUE, true],
    [Number.NEGATIVE_INFINITY, false],
    [NaN, false],
    ['not a number', false],
  ])('with input: %p should return: %p', (input, expected) => {
    expect(NonZeroInteger.is(input)).toBe(expected);
  });
});

describe('Integer.decode()', () => {
  test('should succeed when a positive integer is supplied', () => {
    expect(Integer.decode(1)).toBeRight();
  });
  test('should succeed when a negative integer is supplied', () => {
    expect(Integer.decode(-1)).toBeRight();
  });
  test('should fail when a non-integer is supplied', () => {
    expect(Integer.decode(0.1)).toBeLeft();
  });
});

describe('Integer.encode()', () => {
  test('should return the correct value', () => {
    expect(Integer.encode(1 as Integer)).toEqual(1);
  });
});

describe('PositiveInteger.decode()', () => {
  test('should succeed when a positive integer is supplied', () => {
    expect(PositiveInteger.decode(1)).toBeRight();
  });
  test('should fail when a negative integer is supplied', () => {
    expect(PositiveInteger.decode(-1)).toBeLeft();
  });
  test('should fail when zero is supplied', () => {
    expect(PositiveInteger.decode(0)).toBeLeft();
  });
});

describe('PositiveInteger.encode()', () => {
  test('should return the correct value', () => {
    expect(PositiveInteger.encode(1 as PositiveInteger)).toEqual(1);
  });
});

describe('NonNegativeNumber.decode()', () => {
  test('should succeed when a positive integer is supplied', () => {
    expect(NonNegativeInteger.decode(1)).toBeRight();
  });
  test('should fail when a negative integer is supplied', () => {
    expect(NonNegativeInteger.decode(-1)).toBeLeft();
  });
  test('should succeed when zero is supplied', () => {
    expect(NonNegativeInteger.decode(0)).toBeRight();
  });
});

describe('NonNegativeInteger.encode()', () => {
  test('should return the correct value', () => {
    expect(NonNegativeInteger.encode(1 as NonNegativeInteger)).toEqual(1);
  });
});

describe('NegativeInteger.decode()', () => {
  test('should succeed when a negative integer is supplied', () => {
    expect(NegativeInteger.decode(-1)).toBeRight();
  });
  test('should fail when a positive integer is supplied', () => {
    expect(NegativeInteger.decode(1)).toBeLeft();
  });
  test('should fail when zero is supplied', () => {
    expect(NegativeInteger.decode(0)).toBeLeft();
  });
});

describe('NegativeInteger.encode()', () => {
  test('should return the correct value', () => {
    expect(NegativeInteger.encode(-1 as NegativeInteger)).toEqual(-1);
  });
});

describe('NonZeroInteger.decode()', () => {
  test('should succeed when a negative integer is supplied', () => {
    expect(NonZeroInteger.decode(-1)).toBeRight();
  });
  test('should succeed when a positive integer is supplied', () => {
    expect(NonZeroInteger.decode(1)).toBeRight();
  });
  test('should fail when zero is supplied', () => {
    expect(NonZeroInteger.decode(0)).toBeLeft();
  });
});

describe('NonZeroInteger.encode()', () => {
  test('should return the correct value', () => {
    expect(NonZeroInteger.encode(-1 as NonZeroInteger)).toEqual(-1);
  });
});
