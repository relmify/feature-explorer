import { getMessageHandlers } from '../interface';
import { startFileWatchHandler, stopFileWatchHandler } from '../interface';

describe('getMessageHandlers()', () => {
  test('should return a function if the message type matches a handler', () => {
    expect(getMessageHandlers('Watcher.START_FILE_WATCH')).not.toBe(undefined);
  });
});

describe('startFileWatchHandler()', () => {
  test.skip('should ', () => {
    expect(startFileWatchHandler({ messageType: 'Watcher.START_FILE_WATCH', data: undefined })).toBe([]);
  });
});

describe('stopFileWatchHandler()', () => {
  test.skip('should ', () => {
    expect(stopFileWatchHandler({ messageType: 'Watcher.STOP_FILE_WATCH', data: undefined })).toBe([]);
  });
});
