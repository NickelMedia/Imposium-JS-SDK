/*
    Simple queue for storing URL strings
 */
export default class Queue {
    private q: any[];

    public constructor() {
        this.q = [];
    }

    public enqueue = (item: any): void => {
        this.q.push(item);
    }

    public pop = (): void => {
        this.q.splice(0, 1);
    }

    public reset = (): void => {
        this.q = [];
    }

    public peek = (): any => {
        return this.q[0];
    }

    public isEmpty = (): boolean => {
        return (this.q.length === 0);
    }

    public isFull = (max: number): boolean => {
        return (this.q.length < max);
    }

    public getLength = (): number => {
        return this.q.length;
    }
}
