import { getEventHandlers } from '../interface';
import { startFileWatchHandler, stopFileWatchHandler } from '../interface';

describe('getWatcherEventHandlersFromName()', () => {
  test('should return a function if the event name matches a handler', () => {
    expect(getEventHandlers('Watcher.START_FILE_WATCH')).not.toBe(undefined);
  });
});

describe('startFileWatchHandler()', () => {
  test.skip('should ', () => {
    expect(startFileWatchHandler({ name: 'Watcher.START_FILE_WATCH', data: undefined })).toBe([]);
  });
});

describe('stopFileWatchHandler()', () => {
  test.skip('should ', () => {
    expect(stopFileWatchHandler({ name: 'Watcher.STOP_FILE_WATCH', data: undefined })).toBe([]);
  });
});
