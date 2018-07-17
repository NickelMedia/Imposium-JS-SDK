const errors = require('../conf/errors.json');

const types = {
	ENV        : 'environment',
	CONFIG     : 'configuration',
	NETWORK    : 'network',
	MODERATION : 'moderation'
};

export abstract class ImposiumError extends Error {
	protected prefix:string = '[IMPOSIUM ERROR]\n'
	protected type:string = '';

	constructor(message:string, type:string) {
		super(message);

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, ImposiumError);
		}

		this.type = type;
	}

	public log = ():void => {}
}

export class EnvironmentError extends ImposiumError {
	constructor(messageKey:string, type:string = types.ENV) {
		super(errors[type][messageKey], type);

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, EnvironmentError);
		}
	}

	public log = ():void => {
		console.error(`${this.prefix}\nReason: Unavailable feature\nMessage: ${this.message}`);
	}
}

export class ModerationError extends ImposiumError {
	constructor(messageKey:string, type:string = types.MODERATION) {
		super(errors[type][messageKey], type);

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, ModerationError);
		}
	}

	public log = ():void => {
		console.error(`${this.prefix}\nReason: Imposium moderation\nMessage: ${this.message}`);
	}
}

export class ConfigurationError extends ImposiumError {
	private eventName:string = '';

	constructor(messageKey:string, eventName:string, type:string = types.CONFIG) {
		super(errors[type][messageKey], type);

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, ConfigurationError);
		}

		this.eventName = eventName || '<not_set>';
	}

	public log = ():void => {
		console.error(`${this.prefix}\nReason: Invalid configuration\nMessage: ${this.message}\nEvent name: ${this.eventName}`);
	}
}

export class NetworkError extends ImposiumError {
	private networkError:Error = null;

	constructor(messageKey:string, networkError:Error, type:string = types.NETWORK) {
		super(errors[type][messageKey], type);

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, NetworkError);
		}

		this.networkError = networkError;
	}

	public log = ():void => {
		console.error(`${this.prefix}\nReason: Network related error\nMessage: ${this.message}\nNetwork Error:`, this.networkError);
	}
}
