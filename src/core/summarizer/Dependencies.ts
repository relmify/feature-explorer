import { ReplaySubject } from 'rxjs';
import { FilesValidated } from './Commands';

export type FeatureExplorerDependencies = {
  readonly filesValidated$: ReplaySubject<FilesValidated>;
};
