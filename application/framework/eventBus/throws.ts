/* eslint-disable functional/no-expression-statement, functional/no-class, functional/no-this-expression */

//
// Custom Errors
//
export class UnregisteredEventError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UnregisteredEventError';
  }
}
