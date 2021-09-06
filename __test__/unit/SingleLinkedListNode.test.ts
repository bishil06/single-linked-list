import SingleLinkedListNode from '../../src/SingleLinkedListNode';

describe('SingleLinkedListNode', () => {
  test('create LinkedListNode', () => {
    const newNode = new SingleLinkedListNode(123);
    expect(newNode).toBeInstanceOf(SingleLinkedListNode);
  });

  test('getValue LinkedListNode', () => {
    const newNode = new SingleLinkedListNode(123);
    expect(newNode.getValue()).toBe(123);
  });

  test('setValue LinkedListNode', () => {
    const newNode = new SingleLinkedListNode(123);
    newNode.setValue(111);
    expect(newNode.getValue()).toBe(111);
  });

  test('getNext no linked LinkedListNode', () => {
    const newNode = new SingleLinkedListNode(123);
    expect(newNode.getNext()).toBeNull();
  });

  test('getNext one linked LinkedListNode', () => {
    const newNode = new SingleLinkedListNode(123);
    const newNode2 = new SingleLinkedListNode(111, newNode);
    expect(newNode2.getValue()).toBe(111);

    const nextNode = newNode2.getNext();
    expect(nextNode).toBe(newNode);

    if (nextNode !== null) {
      expect(nextNode.getValue()).toBe(123);
      expect(nextNode.getNext()).toBeNull();
    }
  });

  test('setNext no linked LinkedListNode', () => {
    const newNode = new SingleLinkedListNode(123);
    const newNode2 = new SingleLinkedListNode(111);

    newNode2.setNext(newNode);
    expect(newNode2.getValue()).toBe(111);
    expect(newNode2.getNext()).toBe(newNode);

    const nextNode = newNode2.getNext();
    expect(nextNode).toBe(newNode);

    if (nextNode !== null) {
      expect(nextNode.getValue()).toBe(123);
      expect(nextNode.getNext()).toBeNull();
    }
  });

  test('setNext one linked LinkedListNode', () => {
    const newNode = new SingleLinkedListNode(123);
    const newNode2 = new SingleLinkedListNode(111, newNode);
    const newNode3 = new SingleLinkedListNode(100, newNode2);

    newNode3.setNext(newNode2);
    expect(newNode3.getValue()).toBe(100);
    expect(newNode3.getNext()).toBe(newNode2);

    const nextNode = newNode3.getNext();
    expect(nextNode).toBe(newNode2);

    if (nextNode !== null) {
      expect(nextNode.getValue()).toBe(111);
      expect(nextNode.getNext()).toBe(newNode);
    }

    const nextNode2 = newNode.getNext();
    if (nextNode2 !== null) {
      expect(nextNode2.getValue()).toBe(123);
      expect(nextNode2.getNext()).toBeNull();
    }
  });
});
