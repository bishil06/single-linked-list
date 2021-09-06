export default class SingleLinkedListNode<T> {
  private value: T;

  private next: SingleLinkedListNode<T> | null;

  constructor(value: T, next?: SingleLinkedListNode<T>) {
    this.value = value;

    if (next === undefined) {
      this.next = null;
    } else {
      this.next = next;
    }
  }

  setNext(nextNode: SingleLinkedListNode<T>): this {
    this.next = nextNode;
    return this;
  }

  setValue(value: T): this {
    this.value = value;
    return this;
  }

  getNext(): SingleLinkedListNode<T> | null {
    return this.next;
  }

  getValue(): T {
    return this.value;
  }
}
