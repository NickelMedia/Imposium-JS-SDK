import {create} from 'apisauce';

export default class API {
	public static http:any = null;
	private static readonly baseUrl:string = 'https://api.imposium.com';
	
	public static setupAuth = (authToken:string):void => {
		API.http = create({
			baseURL: API.baseUrl,
			headers: this.getHeaders()
		});
	}
}
