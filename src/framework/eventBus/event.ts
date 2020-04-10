import * as t from 'io-ts';

type EventNameBrand = { readonly EventName: unique symbol };
const EventName = t.brand(
  t.string,
  (s): s is t.Branded<string, EventNameBrand> => typeof s === 'string' && s.length > 0,
  'EventName',
);
type EventName = t.TypeOf<typeof EventName>;

const EventData = t.unknown;
type EventData = t.TypeOf<typeof EventData>;

const Event = t.intersection([t.type({ name: EventName }), t.partial({ data: EventData })]);
type Event = t.TypeOf<typeof Event>;

export { Event, EventName, EventData };
