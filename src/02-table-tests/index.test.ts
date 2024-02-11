import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 0, b: 2, action: Action.Subtract, expected: -2 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 3, b: 3, action: Action.Multiply, expected: 9 },
  { a: 3, b: -2, action: Action.Multiply, expected: -6 },
  { a: 3, b: -2, action: Action.Divide, expected: -1.5 },
  { a: 0, b: 3, action: Action.Divide, expected: 0 },
  { a: 10000, b: -20, action: Action.Divide, expected: -500 },
  { a: 10, b: 2, action: Action.Exponentiate, expected: 100 },
  { a: 10, b: 0, action: Action.Exponentiate, expected: 1 },
  { a: 1, b: '2', action: Action.Add, expected: null },
  { a: '2', b: 2, action: Action.Add, expected: null },
  { a: 3, b: '2', action: Action.Add, expected: null },
  { a: 3, b: undefined, action: Action.Subtract, expected: null },
  { a: 0, b: {}, action: Action.Subtract, expected: null },
  { a: 3, b: null, action: Action.Multiply, expected: null },
  { a: 3, b: '3', action: Action.Multiply, expected: null },
  { a: 3, b: '-2', action: Action.Multiply, expected: null },
  { a: 3, b: {}, action: Action.Divide, expected: null },
  { a: 0, b: [3], action: Action.Divide, expected: null },
  { a: 10000, b: [-20], action: Action.Divide, expected: null },
  { a: 10, b: [2], action: Action.Exponentiate, expected: null },
  { a: [10], b: 0, action: Action.Exponentiate, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)('should count result properly', (testCase) => {
    expect(
      simpleCalculator({
        a: testCase.a,
        b: testCase.b,
        action: testCase.action,
      }),
    ).toBe(testCase.expected);
  });
});
