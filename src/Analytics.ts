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
	private baseUrl:string = 'https://ssl.google-analytics.com/collect?v=1';
	private trackingId:string = null;

	public constructor(trackingId:string) {
		this.trackingId = trackingId;
	}

	public send(event:any) {
		const url = this.formatString(event);
		this.makeRequest(url);
	}

	private s4() {
		return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	}

	private getRandom() {
		return Math.round(new Date().getTime() / 1000).toString();
	}

	private generateGuid() {
		return `${this.s4()}${this.s4()}-${this.s4()}-${this.s4()}-${this.s4()}-${this.s4()}${this.s4()}${this.s4()}`;
	}

	private formatString(event:any):string {
		let queryString = `${this.baseUrl}&tid=${this.trackingId}&z=${this.getRandom()}&cid=${this.generateGuid()}`;

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

