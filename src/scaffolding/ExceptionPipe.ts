import {ImposiumError} from './Exceptions';

const warnings = require('../conf/warnings.json');

export default class ExceptionPipe {
	public static logWarning = (type:string, messageKey:string):void => {
		console.warn(`IMPOSIUM\n${warnings[type][messageKey]}`);
	}

	public static trapError = (e:ImposiumError, errorEvent:(e:any)=>any = null):void => {
		if (errorEvent) {
			errorEvent(e);
		}
		
		e.log();
	}
}