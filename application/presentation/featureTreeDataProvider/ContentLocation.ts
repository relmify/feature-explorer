/**
 * @packageDocumentation
 * Represents the location of an item within a file
 */
import * as t from 'io-ts';
import { PositiveInteger } from '../../common/types';

const LineNumber = PositiveInteger;
type LineNumber = t.TypeOf<typeof LineNumber>;
export { LineNumber };

const ColumnNumber = PositiveInteger;
type ColumnNumber = t.TypeOf<typeof ColumnNumber>;
export { ColumnNumber };

const ContentLocation = t.type(
  {
    line: LineNumber,
    column: ColumnNumber,
  },
  'ContentLocation',
);
type ContentLocation = t.TypeOf<typeof ContentLocation>;
export { ContentLocation };
