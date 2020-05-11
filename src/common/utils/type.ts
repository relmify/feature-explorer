// TODO: Determine if this is useful or not
export type Opaque<K, T> = T & { readonly __TYPE__: K };
