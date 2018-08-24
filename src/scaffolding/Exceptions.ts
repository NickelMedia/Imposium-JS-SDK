const errors = require('../conf/errors.json');

const types = {
    ENV: 'environment',
    MODERATION: 'moderation',
    CLIENT_CONFIG: 'clientConfiguration',
    PLAYER_CONFIG: 'playerConfiguration',
    NETWORK: 'network',
    UNCAUGHT: 'uncaught'
};

export abstract class ImposiumError extends Error {
    public log: () => void;
    protected prefix: string = '[IMPOSIUM ERROR]';
    protected type: string = '';

    constructor(message: string, type: string) {
        super(message);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ImposiumError);
        }

        this.type = type;
    }
}

export class EnvironmentError extends ImposiumError {
    constructor(messageKey: string, type: string = types.ENV) {
        super(errors[type][messageKey], type);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, EnvironmentError);
        }
    }

    public log = (): void => {
        console.error(`${this.prefix}
            \nReason: Unavailable feature
            \nMessage: ${this.message}`);
    }
}

export class ModerationError extends ImposiumError {
    private experienceId: string = null;

    constructor(messageKey: string, experienceId: string, type: string = types.MODERATION) {
        super(errors[type][messageKey], type);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, EnvironmentError);
        }
    }

    public log = (): void => {
        console.error(`${this.prefix}
            \nReason: Moderation Issue
            \nExperience ID: ${this.experienceId}
            \nMessage: ${this.message}`);
    }
}

export class ClientConfigurationError extends ImposiumError {
    private eventName: string = '';

    constructor(messageKey: string, eventName: string, type: string = types.CLIENT_CONFIG) {
        super(errors[type][messageKey], type);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ClientConfigurationError);
        }

        this.eventName = eventName || '<not_set>';
    }

    public log = (): void => {
        console.error(`${this.prefix}
            \nReason: Invalid client configuration
            \nMessage: ${this.message}
            \nEvent name: ${this.eventName}`);
    }
}

export class PlayerConfigurationError extends ImposiumError {
    private eventName: string = '';

    constructor(messageKey: string, eventName: string, type: string = types.PLAYER_CONFIG) {
        super(errors[type][messageKey], type);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, PlayerConfigurationError);
        }

        this.eventName = eventName || '<not_set>';
    }

    public log = (): void => {
        console.error(`${this.prefix}
            \nReason: Invalid player configuration
            \nMessage: ${this.message}
            \nEvent name: ${this.eventName}`);
    }
}

export class NetworkError extends ImposiumError {
    private experienceId: string = null;
    private networkError: Error = null;

    constructor(messageKey: string, experienceId: string, e: Error, type: string = types.NETWORK) {
        super(errors[type][messageKey], type);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, NetworkError);
        }

        this.experienceId = experienceId || '<not_set>';
        this.networkError = e;
    }

    public log = (): void => {
        console.error(`${this.prefix}
            \nReason: Network related error
            \nMessage: ${this.message}
            \nExperience ID: ${this.experienceId}
            \nNetwork Error: `, this.networkError);
    }
}

export class UncaughtError extends ImposiumError {
    private uncaughtError = null;

    constructor(messageKey: string, e: Error, type: string = types.UNCAUGHT) {
        super(errors[type][messageKey], type);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, NetworkError);
        }

        this.uncaughtError = e;
    }

    public log = (): void => {
        console.error(`${this.prefix}
            \nReason: Unknown
            \nMessage: ${this.message}
            \nError: `, this.uncaughtError);
    }
}
