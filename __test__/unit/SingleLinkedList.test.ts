import SingleLinkedListNode from '../../src/SingleLinkedListNode';
import SingleLinkedList, { priority } from '../../src/SingleLinkedList';

class TestSingleLinkedList<T> extends SingleLinkedList<T> {
  public getHead() {
    return super.getHead();
  }

  public getCur() {
    return super.getCur();
  }
}

function compareNumber(a: number, b: number): priority {
  if (a > b) return 1;
  if (a === b) return 0;
  return -1;
}

const compareFn = jest.fn(compareNumber);

describe('SingleLinkedList', () => {
  test('create LinkedList', () => {
    const list = new TestSingleLinkedList(compareFn);
    expect(list).toBeInstanceOf(SingleLinkedList);
  });

  test('empty LinkedList', () => {
    const list = new TestSingleLinkedList(compareFn);
    expect(list.getCur()).toBeNull();
    expect(list.getHead()).toBeNull();
  });

  test('get length empty LinkedList', () => {
    const list = new TestSingleLinkedList(compareFn);
    expect(list.length).toBe(0);
  });

  test('add empty LinkedList', () => {
    const list = new TestSingleLinkedList(compareFn);
    list.add(123);
    expect(list.length).toBe(1);
    expect(list.getCur()).toBeNull();
    expect(list.getHead()).not.toBeNull();
    expect(list.getHead()?.getValue()).toBe(123);
    expect(list.getHead()?.getNext()).toBeNull();
  });

  test('add tow value LinkedList', () => {
    const list = new TestSingleLinkedList(compareFn);
    list.add(123);

    list.add(111);
    expect(compareFn).toBeCalledWith(123, 111);

    // expect(list.length).toBe(2);
    expect(list.getHead()).not.toBeNull();
    expect(list.getHead()?.getValue()).toBe(111);
    expect(list.getHead()?.getNext()).not.toBeNull();
    expect(list.getHead()?.getNext()?.getValue()).toBe(123);
  });

  test('add value LinkedList', () => {
    const list = new TestSingleLinkedList(compareFn);
    list.add(123);
    expect(list.length).toBe(1);
    expect(list.getHead()).not.toBeNull();
    expect(list.getHead()?.getValue()).toBe(123);

    list.add(111);
    expect(compareFn).toBeCalledWith(123, 111);
    expect(list.length).toBe(2);
    expect(list.getHead()).not.toBeNull();
    expect(list.getHead()?.getValue()).toBe(111);

    list.add(100);
    expect(compareFn).toBeCalledWith(111, 100);
    expect(list.length).toBe(3);
    expect(list.getHead()).not.toBeNull();
    expect(list.getHead()?.getValue()).toBe(100);

    list.add(125);
    expect(list.length).toBe(4);
    expect(compareFn).toBeCalledWith(100, 125);
    expect(compareFn).toBeCalledWith(111, 125);
    expect(compareFn).toBeCalledWith(123, 125);
    expect(list.getHead()).not.toBeNull();
    expect(list.getHead()?.getValue()).toBe(100);

    list.add(124);
    expect(list.length).toBe(5);
    expect(compareFn).toBeCalledWith(100, 124);
    expect(compareFn).toBeCalledWith(111, 124);
    expect(compareFn).toBeCalledWith(123, 124);
    expect(compareFn).toBeCalledWith(125, 124);
    expect(list.getHead()).not.toBeNull();
    expect(list.getHead()?.getValue()).toBe(100);

    list.add(1);
    expect(list.length).toBe(6);
    expect(compareFn).toBeCalledWith(100, 1);
    expect(list.getHead()).not.toBeNull();
    expect(list.getHead()?.getValue()).toBe(1);

    expect(list.getHead()).not.toBeNull();
    expect(list.getHead()?.getValue()).toBe(1);
    expect(list.getHead()?.getNext()).not.toBeNull();
    expect(list.getHead()?.getNext()?.getValue()).toBe(100);
  });
});
