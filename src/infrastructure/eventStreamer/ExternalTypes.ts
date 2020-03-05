export type Event<T> = {
  readonly eventType: T;
  readonly eventData: unknown;
};
