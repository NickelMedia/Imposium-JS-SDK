import axios from 'axios';
import Queue from './Queue';

/*
	Manually handles calls to GA, this was developed to avoid having to ask
	clients to include the GA/GTM snippets if they didn't want them.

	for information on the request protocol:
	https://developers.google.com/analytics/devguides/collection/protocol/v1/reference

	for information on the query parameter options:
	https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters
 */

// Holds default request settings
interface Request {
 	baseUrl: string;
 	cacheKey: string;
 	appId: string;
 	clientId: string;
 }

// Holds settings related to rate limiting
interface Broker {
	concurrency: number;
	frequency: number;
	enqueued: number;
	defer: boolean;
	active: Queue;
	deferred: Queue;
}

// Holds request retry settings
interface Retries {
	current: number;
	max: number;
	delay: number;
}

export default class Analytics {
	private emitter:any = null;
	private retryTimeout:any = null;

	private request:Request = {
		baseUrl: 'https://ssl.google-analytics.com/collect',
		cacheKey: 'imposium_js_ga_cid',
		appId: null,
		clientId: null
	}

	private broker:Broker = {
		concurrency: 10, 
		frequency: 50, 
		enqueued: 0, 
		defer: false, 
		active: new Queue(), 
		deferred: new Queue()
	};

	private retries:Retries = {
		current: 0, 
		max: 3,  
		delay: 2000
	};

	public constructor(trackingId:string) {
		this.request.appId = trackingId;
		this.request.clientId = this.checkCache();
	}

	/*
		Sends events off to the GA collect API
	 */
	public send(event:any):void {
		const {defer, active} = this.broker;

		if (active.isEmpty() && !defer) this.emit();

		this.addToQueue(this.concatParams(event));
	}

	/*
		Checks to see if a user has a cached GA client id
		in their localStorage
	 */
	private checkCache():string {
		const {cacheKey} = this.request;

		try {
			const cache = JSON.parse(localStorage.getItem(cacheKey));

			// Check ref val
			if (cache) {
				// check guid expiry
				if (cache.expiry > new Date()) {
					return cache.guid;
				} else {
					// Set new creds if expired 
					localStorage.removeItem(cacheKey);
					return this.setCache(this.generateGuid());
				}
			} else {
				// If a user has no cached creds, set new ones
				return this.setCache(this.generateGuid());
			}
		} catch (e) {
			// If any operations fail, return a guid for this session
			return this.generateGuid();
		}
	}

	/*
		Sets new user creds in localStorage
	 */
	private setCache(guid:string):string {
		try {
			const {cacheKey} = this.request,
				cache = {guid: null, expiry: null},
				expiry = new Date();
				
			cache.guid = guid;
			cache.expiry = expiry.setFullYear(expiry.getFullYear() + 2)

			localStorage.setItem(cacheKey, JSON.stringify(cache));
		} catch (e) {
			
		}

		return guid;
	}

	// TO DO: use more robust uuid solution (?) 

	/*
		Generate random sequence 
	 */
	private s4():string {
		return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	}

	/*
		Concatenate a new guid
	 */
	private generateGuid():string {
		return `${this.s4()}${this.s4()}-${this.s4()}-${this.s4()}-${this.s4()}-${this.s4()}${this.s4()}${this.s4()}`;
	}

	/*
		Get a random number to supply the caching buster parameter
	 */
	private getRandom():string {
		return Math.round(new Date().getTime() / 1000).toString();
	}

	/*
		Concatenates the default and event supplied parameters into a query string that
		can be digested by the GA collect API. Any event provided params need to be
		url encoded to prevent errors.
	 */
	private concatParams(event:any):string {
		const {baseUrl, appId, clientId} = this.request;

		let queryString = `${baseUrl}?v=1&tid=${appId}&z=${this.getRandom()}&cid=${clientId}`;

		for (const param of Object.keys(event)) {
			queryString += `&${encodeURIComponent(param)}=${encodeURIComponent(event[param])}`;
		}

		return queryString;
	}

	/*
		Set request emitting interval
	 */
	private emit() {
		let {frequency} = this.broker;

		this.emitter = setInterval(() => this.setRequestUrl(), frequency);
	}

	/*
		Determine if request needs to be deferred during a burst
	 */
	private addToQueue(url:string):void {
		let {concurrency, defer, active, deferred} = this.broker;

		if (!defer) {
			active.enqueue(url);
			defer = !active.isFull(concurrency);
		} else {
			deferred.enqueue(url);
		}
	}

	/*
		If the deferral queue has urls in it, take 10 or queue length
		and pass them to the active queue
	 */
	private scrapeDeferred():void {
		let {concurrency, enqueued, defer, active, deferred} = this.broker;

		if (!deferred.isEmpty()) {
			let limit = 0;

			enqueued = deferred.getLength();

			if (enqueued > concurrency) {
				limit = concurrency;
			} else {
				limit = enqueued;
			}

			for (let i = 0; i < limit; i++) {
				active.enqueue(deferred.peek());
				deferred.pop();
			}

			defer = false;
			this.emit();
		} else {
			defer = false;
		}
	}

	/*
		Determine if the request is fresh, if so pop the request
		off the head of the queue. Otherwise call scrapeDeferred.
		Failed urls can also be passed as an optional param to
		enable retries. 
	 */
	private setRequestUrl(failedUrl:any = null) {
		if (failedUrl) {
			this.makeRequest(failedUrl);
		} else {
			const {active} = this.broker,
				url = active.peek();

			if (url) {
				active.pop();
				this.makeRequest(url);
			} else {
				clearInterval(this.emitter);
				this.scrapeDeferred();
			}
		}
	}

	/*
		Makes GET request to GA collect API with formatted query string
	 */
	private makeRequest(url:string):void {
		axios.get(url)
		.then((res) => {
			const {active} = this.broker;

			if (active.isEmpty()) {
				clearInterval(this.emitter);
			} 
		})
		.catch((err) => {
			clearInterval(this.emitter);
			this.retry(url);
		});
	}

	/*
		Retry requests recursively based on settings defined in 
		Retry interface.
	 */
	private retry(url:string):void {
		const {active} = this.broker;
		let {current, max, delay} = this.retries;

		this.retryTimeout = setTimeout(() => {
			if (current < max) {
				delay *= 2;
				current++;
				this.setRequestUrl(url);
			} else {
				clearTimeout(this.retryTimeout);
				active.pop();
				this.emit();
				// add a check here to do a long poll if 
				// n number of requests fail after retrying
			}
		}, delay);
	}
}

