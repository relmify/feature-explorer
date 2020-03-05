import { Subject } from 'rxjs';
import { Event } from './eventStreamer/ExternalTypes';

const eventBus$ = new Subject();

export const EventBus = {
  sendEvent: ((subject: Subject<unknown>) => (event: Event<unknown>) => subject.next({ event: event }))(eventBus$),
  /* eslint-disable-next-line functional/functional-parameters */
  clearEvents: ((subject: Subject<unknown>) => () => subject.next())(eventBus$),
  /* eslint-disable-next-line functional/functional-parameters */
  getEvent: ((subject: Subject<unknown>) => () => subject.asObservable())(eventBus$),
};
