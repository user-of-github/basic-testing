import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  const source1 = [1, 2, 3];
  const source2 = [3, 2, 1];

  const expectedListFromSource1 = {
    next: {
      next: {
        next: {
          next: null,
          value: null,
        },
        value: 3,
      },
      value: 2,
    },
    value: 1,
  };

  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const list = generateLinkedList(source1);
    expect(list).toStrictEqual(expectedListFromSource1);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const list = generateLinkedList(source2);
    expect(list).toMatchSnapshot();
  });
});
