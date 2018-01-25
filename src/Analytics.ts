import axios from 'axios';
import parser from 'ua-parser-js';

/*
	Manually handles calls to GA, this was developed to avoid having to ask
	clients to include the GA/GTM snippets if they didn't want them.

	for information on the request protocol:
	https://developers.google.com/analytics/devguides/collection/protocol/v1/reference

	for information on the query parameter options:
	https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters
 */
export default class Analytics {
	private baseUrl:string = 'https://ssl.google-analytics.com/collect';
	private cachedKey:string = 'imposium_js_ga_cid';
	private idRegExp = /^ua-\d{4,9}-\d{1,4}$/i;
	private enabled = true;
	private trackingId:string = null;
	private guid:string = null;

	public constructor(trackingId:string) {
		if ((this.idRegExp).test(trackingId)) {
			this.trackingId = trackingId;
			this.guid = this.checkCache();
		} else {
			console.warn('Your Google Analytics tracking ID is invalid.');

			this.enabled = false;
		}
	}

	/*
		Sends events off to the GA collect API
	 */
	public send(event:any):void {
		if (this.enabled) {
			const url = this.concatParams(event);
			this.makeRequest(url);
		}
	}

	/*
		Checks to see if a user has a cached GA client id
		in their localStorage
	 */
	private checkCache():string {
		try {
			const cache = JSON.parse(localStorage.getItem(this.cachedKey));

			// If cached creds obj exits
			if (cache) {
				// Check if expiry is still valid
				if (cache.expiry > new Date()) {
					return cache.guid;
				} else {
					// If the expiry is invalid, remove the creds
					// and provide new ones
					localStorage.removeItem(this.cachedKey);

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
			const expiry = new Date();

			// Expiry is modeled after the GA client id cookie
			// which expires after 2 years
			const cache = {
				guid: guid,
				expiry: expiry.setFullYear(expiry.getFullYear() + 2)
			};

			localStorage.setItem(this.cachedKey, JSON.stringify(cache));
		} catch (e) {
			
		}

		return guid;
	}

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
		let queryString = `${this.baseUrl}?v=1&tid=${this.trackingId}&z=${this.getRandom()}&cid=${this.guid}`;

		for (const param of Object.keys(event)) {
			queryString += `&${encodeURIComponent(param)}=${encodeURIComponent(event[param])}`;
		}

		return queryString;
	}

	/*
		Makes GET request to GA collect API with formatted query string
	 */
	private makeRequest(url:string):void {
		// make ga calls here
		axios.get(url)
		.catch((err) => {
			console.error('GA call err: ', err);
		});
	}
}

