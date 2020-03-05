import * as t from 'fp-ts';
import { NonEmptyString } from 'io-ts-types/lib/NonEmptyString';

/**
 * Input types
 */
type FileId = NonEmptyString;
type FilePath = NonEmptyString;
type FileName = NonEmptyString;

export type UnvalidatedFile = {
  readonly fileId: FileId;
  readonly filePath: FilePath;
  readonly fileName: FileName;
};

/**
 * Output types
 */

/**
 * Domain types
 */
export type FeatureDataItem = {
  readonly type: string;
  readonly id: string;
  readonly name: string;
  readonly filePath: string;
  readonly parent?: FeatureDataItem;
  readonly children: readonly FeatureDataItem[];
};
