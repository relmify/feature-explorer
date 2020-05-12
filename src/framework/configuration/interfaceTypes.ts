import { MessageBus } from '../messageBus';
import { Service as WatcherService } from '../../domain/watcher';

export type MessageBusConfiguration = {
  readonly messageBus: MessageBus;
};

export type ServicesConfiguration = {
  readonly watcherService: WatcherService;
};

export type ApplicationConfiguration = MessageBusConfiguration & ServicesConfiguration;
