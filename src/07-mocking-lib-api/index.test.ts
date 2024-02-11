import axios from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  const templateUrl = 'https://jsonplaceholder.typicode.com';
  const templateSubUrl = '/todos/1';
  const realResponseByThatTemplate = {
    userId: 1,
    id: 1,
    title: 'delectus aut autem',
    completed: false,
  };

  beforeAll(() => jest.useFakeTimers());
  afterAll(() => jest.useRealTimers());

  beforeEach(() => jest.runOnlyPendingTimers());
  afterEach(() => jest.clearAllMocks());

  test('should create instance with provided base url', async () => {
    const mockedAxiosCreate = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi(templateSubUrl);
    expect(mockedAxiosCreate).lastCalledWith({ baseURL: templateUrl });
  });

  test('should perform request to correct provided url', async () => {
    const mockedAxiosGet = jest.spyOn(axios.Axios.prototype, 'get');
    await throttledGetDataFromApi(templateSubUrl);
    expect(mockedAxiosGet).lastCalledWith(templateSubUrl);
  });

  test('should return response data', async () => {
    const data = await throttledGetDataFromApi(templateSubUrl);
    expect(data).toStrictEqual(realResponseByThatTemplate);
  });
});
