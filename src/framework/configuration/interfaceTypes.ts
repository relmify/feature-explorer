import { EventBus } from '../eventBus';
import { Service as WatcherService } from '../../domain/summarizingService/watcher';

export type EventBusConfiguration = {
  readonly eventBus: EventBus;
};

export type ServicesConfiguration = {
  readonly watcherService: WatcherService;
};

export type ApplicationConfiguration = EventBusConfiguration & ServicesConfiguration;
