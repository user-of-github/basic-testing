// Uncomment the code below and write your tests
// import { simpleCalculator, Action } from './index';

import { Action, simpleCalculator } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const action = Action.Add;
    expect(simpleCalculator({ a: 48, b: -3, action: action })).toEqual(45);
  });

  test('should subtract two numbers', () => {
    const action = Action.Subtract;
    expect(simpleCalculator({ a: 48, b: -3, action: action })).toEqual(51);
  });

  test('should multiply two numbers', () => {
    const action = Action.Multiply;
    expect(simpleCalculator({ a: 48, b: -3, action: action })).toEqual(-144);
  });

  test('should divide two numbers', () => {
    const action = Action.Divide;
    expect(simpleCalculator({ a: 48, b: -3, action: action })).toEqual(-16);
  });

  test('should exponentiate two numbers', () => {
    const action = Action.Exponentiate;
    expect(simpleCalculator({ a: 48, b: 3, action: action })).toEqual(110592);
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 48, b: 3, action: 'NOT_EXISTING' })).toEqual(
      null,
    );
  });

  test.each([Object.values(Action)])(
    'should return null for invalid arguments',
    (action) => {
      expect(simpleCalculator({ a: '5', b: '6', action: action })).toEqual(
        null,
      );
      expect(simpleCalculator({ a: 2, b: '7', action: action })).toEqual(null);
      expect(simpleCalculator({ a: 'a', b: 5, action: action })).toEqual(null);
    },
  );
});
