/**
 * Common types used across the Summarizng service
 * @packageDocumentation
 */
import { NonEmptyString } from '../../../common/types';

type PathBrand = { readonly Path: unique symbol };
export type Path = PathBrand & NonEmptyString;
