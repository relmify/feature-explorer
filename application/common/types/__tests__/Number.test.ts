import { PositiveNumber, NonNegativeNumber, NegativeNumber } from '../Number';

describe('PositiveNumber.is()', () => {
  test.each([
    [Number.POSITIVE_INFINITY, true],
    [Number.MAX_VALUE, true],
    [1, true],
    [Number.MIN_VALUE, true],
    [0, false],
    [-Number.MIN_VALUE, false],
    [-1, false],
    [-Number.MAX_VALUE, false],
    [Number.NEGATIVE_INFINITY, false],
    [NaN, false],
    ['not a number', false],
  ])('with input: %p should return: %p', (input, expected) => {
    expect(PositiveNumber.is(input)).toBe(expected);
  });
});

describe('NonNegativeNumber.is()', () => {
  test.each([
    [Number.POSITIVE_INFINITY, true],
    [Number.MAX_VALUE, true],
    [1, true],
    [Number.MIN_VALUE, true],
    [0, true],
    [-Number.MIN_VALUE, false],
    [-1, false],
    [-Number.MAX_VALUE, false],
    [Number.NEGATIVE_INFINITY, false],
    [NaN, false],
    ['not a number', false],
  ])('with input: %p should return: %p', (input, expected) => {
    expect(NonNegativeNumber.is(input)).toBe(expected);
  });
});

describe('NegativeNumber.is()', () => {
  test.each([
    [Number.POSITIVE_INFINITY, false],
    [Number.MAX_VALUE, false],
    [1, false],
    [Number.MIN_VALUE, false],
    [0, false],
    [-Number.MIN_VALUE, true],
    [-1, true],
    [-Number.MAX_VALUE, true],
    [Number.NEGATIVE_INFINITY, true],
    [NaN, false],
    ['not a number', false],
  ])('with input: %p should return: %p', (input, expected) => {
    expect(NegativeNumber.is(input)).toBe(expected);
  });
});

// Uses PositiveNumber.is() so no need for more exhaustive testing
describe('PositiveNumber.decode()', () => {
  test('should succeed when a positive number is supplied', () => {
    expect(PositiveNumber.decode(1)).toBeRight();
  });
  test('should fail when a negative number is supplied', () => {
    expect(PositiveNumber.decode(-1)).toBeLeft();
  });
  test('should fail when zero is supplied', () => {
    expect(PositiveNumber.decode(0)).toBeLeft();
  });
});

// Assumes any branded positive number is valid no matter what the number is
describe('PositiveNumber.encode()', () => {
  test('should return the correct value', () => {
    expect(PositiveNumber.encode(1.11 as PositiveNumber)).toEqual(1.11);
  });
});

// Uses NonNegativeNumber.is() so no need for more exhaustive testing
describe('NonNegativeNumber.decode()', () => {
  test('should succeed when a positive number is supplied', () => {
    expect(NonNegativeNumber.decode(1)).toBeRight();
  });
  test('should fail when a negative number is supplied', () => {
    expect(NonNegativeNumber.decode(-1)).toBeLeft();
  });
  test('should succeed when zero is supplied', () => {
    expect(NonNegativeNumber.decode(0)).toBeRight();
  });
});

// Assumes any branded positive number is valid no matter what the number is
describe('NonNegativeNumber.encode()', () => {
  test('should return the correct value', () => {
    expect(NonNegativeNumber.encode(1.11 as NonNegativeNumber)).toEqual(1.11);
  });
});

// Uses NegativeNumber.is() so no need for more exhaustive testing
describe('NegativeNumber.decode()', () => {
  test('should succeed when a negative number is supplied', () => {
    expect(NegativeNumber.decode(-1)).toBeRight();
  });
  test('should fail when a positive number is supplied', () => {
    expect(NegativeNumber.decode(1)).toBeLeft();
  });
  test('should fail when zero is supplied', () => {
    expect(NegativeNumber.decode(0)).toBeLeft();
  });
});

// Assumes any branded positive number is valid no matter what the number is
describe('NegativeNumber.encode()', () => {
  test('should return the correct value', () => {
    expect(NegativeNumber.encode(-1.23 as NegativeNumber)).toEqual(-1.23);
  });
});
