import { getHandlersFromEventName } from '../api';
import { startFileWatchHandler, stopFileWatchHandler } from '../handlers';
import { EventName } from '../../../../framework/eventBus';

describe('getWatcherEventHandlersFromName()', () => {
  test('should return a function if the event name matches a handler', () => {
    expect(getHandlersFromEventName('Watcher.START_FILE_WATCH' as EventName)).not.toBe(undefined);
  });
});

describe('startFileWatchHandler()', () => {
  test.skip('should ', () => {
    expect(startFileWatchHandler({ name: 'Watcher.START_FILE_WATCH' as EventName, data: undefined })).toBe([]);
  });
});

describe('stopFileWatchHandler()', () => {
  test.skip('should ', () => {
    expect(stopFileWatchHandler({ name: 'Watcher.START_FILE_WATCH' as EventName, data: undefined })).toBe([]);
  });
});
