import { MessageBus } from '../messageBus';
import { Watcher } from '../../domain/watcher';

export type Framework = {
  readonly messageBus: MessageBus;
};

export type Domain = {
  readonly watcher: Watcher;
};

export type Application = {
  readonly framework: Framework;
  readonly domain: Domain;
};
