import ImposiumEvents from '../client/ImposiumEvents';

const errors   = require('../conf/errors.json');
const warnings = require('../conf/warnings.json');

interface ImposiumError {
	type          : string;
	message       : string;
	experienceId ?: string;
	cause        ?: Error;
}

export default class ExceptionPipe {
	private static readonly stub:string = '[placeholder]';

	public static routeError = (e:ImposiumError, breakFlow:boolean = true):void => {
		const {onError} = ImposiumEvents;

		if (onError && breakFlow) {
			onError(e);
		}

		console.error('[IMPOSIUM-JS-SDK: Error]', e);
	}

	public static createError = (config:any):ImposiumError => {
		const {experienceId, type, messageKey, runtimeProp, exception} = config;
		const imposiumError:ImposiumError = {type: type, message: errors[type][messageKey]};
		
		if (runtimeProp) {
			imposiumError.message = imposiumError.message.replace(ExceptionPipe.stub, runtimeProp);
		}

		if (experienceId) {
			imposiumError.experienceId = experienceId;
		}

		if (exception) {
			imposiumError.cause = exception;
		}

		return imposiumError;
	}
}