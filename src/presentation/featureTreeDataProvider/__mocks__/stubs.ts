// import { Disposable } from '../../vscodeinterface';
// import { Uri } from '../../vscodeinterface';
// import { FeatureItem } from '../FeatureItem';

/* eslint-disable unused-imports/no-unused-vars-ts */
// export const eventEmitterStub = {
//   event: function(
//     listener: (e: FeatureItem | undefined) => any,
//     thisArgs?: any,
//     disposables?: Disposable[],
//   ): Disposable {
//     return {
//       dispose: () => {
//         return;
//       },
//     };
//   },
//   dispose(): void {
//     return;
//   },
//   fire(data?: FeatureItem | undefined): void {
//     return;
//   },
// };

// export const uriParserStub = (uriString: string): Uri => {
//   return {
//     authority: '',
//     fragment: '',
//     fsPath: '',
//     path: uriString,
//     query: '',
//     scheme: '',
//     toJSON: function toJSONFn(): any {
//       return `{ "path": "${this.path}" }`;
//     },
//     toString: function toStringFn(skipEncoding?: boolean): string {
//       return skipEncoding ? this.path : this.path;
//     },
//     with: function withFn(change: {
//       authority: string;
//       fragment: string;
//       path: string;
//       query: string;
//       scheme: string;
//     }): Uri {
//       return {
//         authority: change.authority,
//         fragment: change.fragment,
//         fsPath: '',
//         path: change.path,
//         query: change.query,
//         scheme: change.scheme,
//       } as Uri;
//     },
//   };
// };
