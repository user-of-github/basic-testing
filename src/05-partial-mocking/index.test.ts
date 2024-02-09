import { mockOne, mockThree, mockTwo, unmockedFunction } from './index';

// eslint-disable-next-line @typescript-eslint/no-empty-function
function nope() {}

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');
  return {
    ...originalModule,
    mockOne: nope,
    mockTwo: nope,
    mockThree: nope,
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const logSpy = jest.spyOn(global.console, 'log');
    mockOne();
    mockTwo();
    mockThree();
    expect(logSpy).toHaveBeenCalledTimes(0);
    expect(logSpy.mock.calls).toHaveLength(0);
  });

  test('unmockedFunction should log into console', () => {
    const logSpy = jest.spyOn(global.console, 'log');
    unmockedFunction();
    expect(logSpy).toHaveBeenCalledTimes(1);
  });
});
