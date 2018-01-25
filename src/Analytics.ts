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
	private trackingId:string = null;
	private guid:string = null;

	public constructor(trackingId:string) {
		this.trackingId = trackingId;
		this.guid = this.checkCache();
		console.log('your guid: ' + this.guid)
	}

	public send(event:any):void {
		const url = this.formatString(event);
		this.makeRequest(url);
	}

	private checkCache():string {
		try {
			const cache = JSON.parse(localStorage.getItem(this.cachedKey));

			if (cache) {
				if (cache.expiry > new Date()) {
					return cache.guid;
				} else {
					localStorage.removeItem(this.cachedKey);

					return this.setCache(this.generateGuid());
				}
			} else {
				return this.setCache(this.generateGuid());
			}
		} catch (e) {
			return this.generateGuid();
		}
	}

	private setCache(guid:string):string {
		try {
			const expiry = new Date();

			const cache = {
				guid: guid,
				expiry: expiry.setFullYear(expiry.getFullYear() + 2)
			};

			localStorage.setItem(this.cachedKey, JSON.stringify(cache));
		} catch (e) {
			
		}

		return guid;
	}

	private s4():string {
		return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	}

	private getRandom():string {
		return Math.round(new Date().getTime() / 1000).toString();
	}

	private generateGuid():string {
		return `${this.s4()}${this.s4()}-${this.s4()}-${this.s4()}-${this.s4()}-${this.s4()}${this.s4()}${this.s4()}`;
	}

	private formatString(event:any):string {
		let queryString = `${this.baseUrl}?v=1&tid=${this.trackingId}&z=${this.getRandom()}&cid=${this.guid}`;

		for (const param of Object.keys(event)) {
			queryString += `&${encodeURIComponent(param)}=${encodeURIComponent(event[param])}`;
		}

		return queryString;
	}

	private makeRequest(url:string):void {
		// make ga calls here
		axios.get(url)
		.then((res) => {
			console.log('Successfully called GA', res.data);
		})
		.catch((err) => {
			console.error('GA call err: ', err);
		});
	}
}

