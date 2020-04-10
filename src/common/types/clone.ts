import * as t from 'io-ts';

/* eslint-disable functional/immutable-data, functional/no-expression-statement */

export const clone = <C extends t.Any>(codec: C, name: string = codec.name): C => {
  const r = Object.create(Object.getPrototypeOf(t));
  Object.assign(r, t);
  r.name = name;
  return r;
};
