import {
  readFileAsynchronously,
  doStuffByTimeout,
  doStuffByInterval,
} from './index';
import path from 'path';
import fs from 'fs';

describe('doStuffByTimeout', () => {
  const mockedTime = 2000;
  const nope = (): void => undefined;

  beforeAll(() => jest.useFakeTimers());

  afterAll(() => jest.useRealTimers());

  let spiedSetTimeout: jest.SpyInstance;

  beforeEach((): void => {
    spiedSetTimeout = jest.spyOn(global, 'setTimeout');
  });

  afterEach(() => jest.clearAllMocks());

  test('should set timeout with provided callback and timeout', () => {
    doStuffByTimeout(nope, mockedTime);
    expect(spiedSetTimeout).toBeCalledWith(nope, mockedTime);
  });

  test('should call callback only after timeout', () => {
    const mockedNope = jest.fn(nope);

    doStuffByTimeout(mockedNope, mockedTime);

    expect(mockedNope).not.toBeCalled();

    jest.advanceTimersByTime(mockedTime);
    expect(mockedNope.mock.calls.length).toBe(1);
  });
});

describe('doStuffByInterval', () => {
  const mockedTime = 2000;
  const nope = (): void => undefined;

  beforeAll(() => jest.useFakeTimers());

  afterAll(() => jest.useRealTimers());

  let spiedInterval: jest.SpyInstance;

  beforeEach(() => {
    spiedInterval = jest.spyOn(global, 'setInterval');
  });

  afterEach(() => jest.clearAllMocks());

  test('should set interval with provided callback and timeout', () => {
    doStuffByInterval(nope, mockedTime);
    expect(spiedInterval).toBeCalledWith(nope, mockedTime);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const mockedNope = jest.fn(nope);

    doStuffByInterval(mockedNope, mockedTime);

    expect(mockedNope).not.toBeCalled();

    jest.advanceTimersByTime(mockedTime);
    expect(mockedNope.mock.calls.length).toBe(1);

    jest.advanceTimersByTime(mockedTime);
    expect(mockedNope.mock.calls.length).toBe(2);

    jest.advanceTimersByTime(mockedTime);
    expect(mockedNope.mock.calls.length).toBe(3);
  });
});

describe('readFileAsynchronously', () => {
  let mockedPathJoin: jest.SpyInstance;
  let mockedFsExistsSync: jest.SpyInstance;
  const mockedText = '42';

  beforeEach((): void => {
    jest.spyOn(fs.promises, 'readFile').mockResolvedValue(mockedText);
    mockedFsExistsSync = jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    mockedPathJoin = jest.spyOn(path, 'join');
  });

  afterEach(() => jest.clearAllMocks());

  test('should call join with pathToFile', async () => {
    await readFileAsynchronously('test-file.txt');
    expect(mockedPathJoin).toBeCalled();
  });

  test('should return null if file does not exist', async () => {
    await expect(readFileAsynchronously('some-file.txt')).resolves.toBeNull();
  });

  test('should return file content if file exists', async () => {
    mockedFsExistsSync.mockReturnValueOnce(true);

    await expect(readFileAsynchronously('file.txt')).resolves.toBe(mockedText);
  });
});
