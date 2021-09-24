import SingleLinkedListNode from './SingleLinkedListNode';

export type priority = -1 | 0 | 1;

export const abortError = new Error('abort');

type OnHeadFn<T> = (
  foundNode: SingleLinkedListNode<T> | null,
  abortSignal?: AbortSignal
) => unknown;

type OnNextFn<T> = (
  foundNode: SingleLinkedListNode<T>,
  prevNode: SingleLinkedListNode<T>,
  abortSignal?: AbortSignal
) => unknown;

type OnLastFn<T> = (lastNode: SingleLinkedListNode<T>) => unknown;

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
      throw Error(`cur is null ${cur}`);
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

  private forEach(
    onHeadFn: OnHeadFn<T>,
    onNextFn: OnNextFn<T>,
    onLastFn?: OnLastFn<T>,
    abortSignal?: AbortSignal
  ) {
    try {
      if (this.pointHead(this.head)) {
        onHeadFn(this.head, abortSignal);

        let prevNode = this.head;
        while (this.pointNext(this.cur)) {
          onNextFn(this.cur, prevNode, abortSignal);
          prevNode = this.cur;
        }
        if (onLastFn) {
          onLastFn(prevNode);
        }
      } else {
        onHeadFn(this.head, abortSignal);
      }
    } catch (err) {
      if (err !== abortError) {
        throw err;
      }
    }
  }

  private selectAction(
    value: T,
    selectFn: (node: SingleLinkedListNode<T>, v: T) => boolean,
    onHeadFn: OnHeadFn<T>,
    onNextFn: OnNextFn<T>,
    onLastFn?: OnLastFn<T>,
    abortSignal?: AbortSignal
  ) {
    try {
      if (this.pointHead(this.head)) {
        if (selectFn(this.head, value) === true) {
          onHeadFn(this.head, abortSignal);
        }

        let prevNode = this.head;
        while (this.pointNext(this.cur)) {
          if (selectFn(this.cur, value) === true) {
            onNextFn(this.cur, prevNode, abortSignal);
          }
          prevNode = this.cur;
        }
        if (onLastFn) {
          onLastFn(prevNode);
        }
      } else {
        onHeadFn(this.head, abortSignal);
      }
    } catch (err) {
      if (err !== abortError) {
        throw err;
      }
    }
  }

  private findNodeAction(
    value: T,
    onHeadFn: OnHeadFn<T>,
    onNextFn: OnNextFn<T>,
    onLastFn?: OnLastFn<T>,
    abortSignal?: AbortSignal
  ) {
    this.selectAction(
      value,
      (node, b) => this.compareFn(node.getValue(), b) === 0,
      onHeadFn,
      onNextFn,
      onLastFn,
      abortSignal
    );
  }

  public getArray(): T[] {
    const result: T[] = [];

    this.forEach(
      (node) => {
        if (node === null) {
          throw abortError;
        } else {
          result.push(node.getValue());
        }
      },
      (node) => {
        result.push(node.getValue());
      }
    );
    return result;
  }

  private deleteHead(head: SingleLinkedListNode<T>) {
    const deleteNode = head;

    this.head = head.getNext();
    deleteNode.setNext(null);
    return deleteNode.getValue();
  }

  // eslint-disable-next-line class-methods-use-this
  private deleteNext(
    node: SingleLinkedListNode<T>,
    prevNode: SingleLinkedListNode<T>
  ): T {
    const deleteNode = node;

    prevNode.setNext(deleteNode.getNext());
    deleteNode.setNext(null);
    return deleteNode.getValue();
  }

  public delete(value: T): boolean {
    let result = false;

    this.findNodeAction(
      value,
      (foundNode) => {
        if (foundNode !== null) {
          this.deleteHead(foundNode);
          result = true;
        }
        throw abortError;
      },
      (foundNode, prevNode) => {
        this.deleteNext(foundNode, prevNode);
        result = true;
        throw abortError;
      }
    );

    return result;
  }

  private addHead(value: T, head: SingleLinkedListNode<T>) {
    if (this.head !== head) {
      throw new Error('wrong');
    }

    const newNode = new SingleLinkedListNode(value);
    if (this.head !== null) {
      newNode.setNext(head);
    }

    this.head = newNode;
    return this;
  }

  private addNext(
    value: T,
    node: SingleLinkedListNode<T>,
    prevNode: SingleLinkedListNode<T>
  ) {
    if (this.cur !== node) {
      throw new Error('wrong');
    }

    const newNode = new SingleLinkedListNode(value);

    prevNode.setNext(newNode);
    newNode.setNext(node);

    return this;
  }

  add(value: T): this {
    this.selectAction(
      value,
      (node, v) => {
        return this.compareFn(node.getValue(), v) === 1;
      },
      (head) => {
        if (head === null) {
          this.head = new SingleLinkedListNode(value);
        } else {
          this.addHead(value, head);
        }
        throw abortError;
      },
      (cur, prevNode) => {
        this.addNext(value, cur, prevNode);
        throw abortError;
      },
      (last) => {
        last.setNext(new SingleLinkedListNode(value));
        throw abortError;
      }
    );

    return this;
  }
}
