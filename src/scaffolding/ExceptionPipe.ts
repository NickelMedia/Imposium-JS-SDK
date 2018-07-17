import {ImposiumError} from './Exceptions';
import ImposiumEvents from '../client/ImposiumEvents';

const warnings = require('../conf/warnings.json');

export default class ExceptionPipe {
	public static logWarning = (type:string, messageKey:string):void => {
		console.warn(`IMPOSIUM\n${warnings[type][messageKey]}`);
	}

	public static trapError = (e:ImposiumError, breakFlow:boolean = true):void => {
		const {onError} = ImposiumEvents;

		if (onError && breakFlow) {
			onError(e);
		}
		
		e.log();
	}
}