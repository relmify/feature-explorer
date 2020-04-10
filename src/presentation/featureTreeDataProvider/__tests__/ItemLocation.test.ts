import { ContentLocation } from '../ContentLocation';

const data: Array<Array<any>> = [
  [true, 'a valid location', { line: 1, column: 1 }],
  [false, 'an undefined location', undefined],
  [false, 'an line value of 0', { line: 0, column: 1 }],
  [false, 'an column value < 0', { line: 1, column: -1 }],
];
describe('ItemLocation.is()', () => {
  test.each(data)('should return %p for %s', (result, _description, input) => {
    expect(ContentLocation.is(input)).toBe(result);
  });
});
