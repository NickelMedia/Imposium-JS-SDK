export default class Queue {
	private q:any[];

	public constructor() {
		this.q = [];
	}

	public enqueue(item):any[] {
		this.q.push(item);
		return this.q;
	}

	public pop(count:number = 1):any[] {
		this.q.splice(0,count);
		return this.q;
	}

	public peek():any {
		return this.q[0];
	}

	public isEmpty():boolean {
		return (this.q.length === 0);
	}

	public isFull(max:number):boolean {
		return (this.q.length < max);
	}

	public getLength():number {
		return this.q.length;
	}
}