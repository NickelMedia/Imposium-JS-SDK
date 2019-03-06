import {version} from './Version';

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
    public stringifyInternalError: () => void;
    public setStoryId = (s: string): void => { this.storyId = s; };
    protected prefix: string = '[IMPOSIUM ERROR]';
    protected type: string = '';
    protected storyId: string = '<not_set>';
    protected version: string = version;
    protected stringifedInternalError: string = '';

    constructor(message: string, type: string) {
        super(message);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ImposiumError);
        }

        this.type = type;
    }

}

export class ModerationError extends ImposiumError {
    private experienceId: string = null;

    constructor(messageKey: string, experienceId: string) {
        super(errors[types.MODERATION][messageKey], types.MODERATION);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ModerationError);
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

    constructor(messageKey: string, eventName: string) {
        super(errors[types.CLIENT_CONFIG][messageKey], types.CLIENT_CONFIG);

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

    constructor(messageKey: string, eventName: string) {
        super(errors[types.PLAYER_CONFIG][messageKey], types.PLAYER_CONFIG);

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
    private networkError: Error | CloseEvent = null;

    constructor(messageKey: string, experienceId: string, e: Error | CloseEvent) {
        super(errors[types.NETWORK][messageKey], types.NETWORK);

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

    public stringifyInternalError = (): void => {
        try {
            this.stringifedInternalError = JSON.stringify(this.networkError);
        } catch (e) {
            this.stringifedInternalError = '<not_available>';
        }
    }
}

export class UncaughtError extends ImposiumError {
    private uncaughtError: Error | string = null;

    constructor(messageKey: string, e: Error) {
        super(errors[types.UNCAUGHT][messageKey], types.UNCAUGHT);

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

    public stringifyInternalError = (): void => {
        try {
            this.stringifedInternalError = JSON.stringify(this.uncaughtError);
        } catch (e) {
            this.stringifedInternalError = '<not_available>';
        }
    }
}
