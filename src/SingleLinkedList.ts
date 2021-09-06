import SingleLinkedListNode from './SingleLinkedListNode';

export type priority = -1 | 0 | 1;

export default class SingleLinkedList<T> {
  protected head: SingleLinkedListNode<T> | null;

  protected cur: SingleLinkedListNode<T> | null;

  constructor(private compareFn: (a: T, b: T) => priority) {
    this.head = null;
    this.cur = null;
  }

  protected getHead(): SingleLinkedListNode<T> | null {
    return this.head;
  }

  protected getCur(): SingleLinkedListNode<T> | null {
    return this.cur;
  }

  private pointHead(
    head: SingleLinkedListNode<T> | null
  ): head is SingleLinkedListNode<T> {
    this.cur = head;

    return this.cur !== null;
  }

  private pointNext(
    cur: SingleLinkedListNode<T> | null
  ): cur is SingleLinkedListNode<T> {
    if (cur === null) {
      throw Error(`cur = ${cur}`);
    }

    this.cur = cur.getNext();
    return this.cur !== null;
  }

  public get length(): number {
    let count = 0;
    if (this.pointHead(this.head)) {
      count += 1;

      while (this.pointNext(this.cur)) {
        count += 1;
      }
    }

    return count;
  }

  public add(value: T): this {
    const newNode = new SingleLinkedListNode(value);

    if (this.pointHead(this.head)) {
      let compareResult = this.compareFn(this.head.getValue(), value);
      if (compareResult === 1) {
        newNode.setNext(this.head);
        this.head = newNode;
        return this;
      }

      let prevNode = this.head;
      while (this.pointNext(this.cur)) {
        compareResult = this.compareFn(this.cur.getValue(), value);
        if (compareResult === 1) {
          newNode.setNext(this.cur);
          prevNode.setNext(newNode);
          return this;
        }

        prevNode = this.cur;
      }

      prevNode.setNext(newNode);
      return this;
    }
    this.head = newNode;
    return this;
  }
}
