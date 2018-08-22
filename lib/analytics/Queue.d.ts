export default class Queue {
    private q;
    constructor();
    enqueue: (item: any) => void;
    pop: () => void;
    peek: () => any;
    isEmpty: () => boolean;
    isFull: (max: number) => boolean;
    getLength: () => number;
}
