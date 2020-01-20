import {AxiosError} from 'axios';
import {version} from './Version';

const {...errors} = require('../conf/errors.json');

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

    protected type: string = '';
    protected version: string = version;
    protected storyId: string = '<not_set>';
    protected logHeader: string = '[IMPOSIUM ERROR]';

    constructor(message: string, type: string) {
        super(message);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ImposiumError);
        }

        this.type = type;
    }

    public setStoryId = (s: string): void => { this.storyId = s; };
}

export class ModerationError extends ImposiumError {
    private experienceId: string = null;

    constructor(messageKey: string, experienceId: string) {
        super(errors[types.MODERATION][messageKey], types.MODERATION);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ModerationError);
        }

        this.experienceId = experienceId || '<not_set>';
    }

    public log = (): void => {
        console.error(`${this.logHeader}
            \nReason: Failed to pass moderation
            \nExperience ID: ${this.experienceId}
            \nMessage: ${this.message}`
        );
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
        console.error(`${this.logHeader}
            \nReason: Invalid client configuration
            \nMessage: ${this.message}
            \nEvent name: ${this.eventName}`
        );
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
        console.error(`${this.logHeader}
            \nReason: Invalid player configuration
            \nMessage: ${this.message}
            \nEvent name: ${this.eventName}`
        );
    }
}

export class HTTPError extends ImposiumError {
    private experienceId: string = null;
    private axiosError: AxiosError = null;

    constructor(messageKey: string, experienceId: string, e: AxiosError) {
        super(errors[types.NETWORK][messageKey], types.NETWORK);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, HTTPError);
        }

        if (
            e.hasOwnProperty('response') &&
            e.response.hasOwnProperty('data') &&
            e.response.data.hasOwnProperty('error')
        ) {
            this.message = e.response.data.error;
        }

        this.experienceId = experienceId || '<not_set>';
        this.axiosError = e;
    }

    public log = (): void => {
        console.error(`${this.logHeader}
            \nReason: HTTP error
            \nMessage: ${this.message}
            \nExperience ID: ${this.experienceId}
            \nNetwork Error: `,
            this.axiosError
        );
    }
}

export class SocketError extends ImposiumError {
    private experienceId: string = null;
    private closeEvent: CloseEvent = null;

    constructor(messageKey: string, experienceId: string, evt: CloseEvent) {
        super(errors[types.NETWORK][messageKey], types.NETWORK);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, SocketError);
        }

        this.experienceId = experienceId || '<not_set>';
        this.closeEvent = evt;
    }

    public log = (): void => {
        console.error(`${this.logHeader}
            \nReason: WebSocket error
            \nMessage: ${this.message}
            \nExperience ID: ${this.experienceId}
            \nClose event: `,
            this.closeEvent
        );
    }
}

export class UncaughtError extends ImposiumError {
    private uncaughtError: Error | string = null;

    constructor(messageKey: string, e: Error) {
        super(errors[types.UNCAUGHT][messageKey], types.UNCAUGHT);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, UncaughtError);
        }

        this.uncaughtError = e;
    }

    public log = (): void => {
        console.error(`${this.logHeader}
            \nReason: Unknown
            \nMessage: ${this.message}
            \nError: `,
            this.uncaughtError
        );
    }
}
