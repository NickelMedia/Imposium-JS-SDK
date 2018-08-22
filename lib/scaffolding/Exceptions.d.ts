export declare abstract class ImposiumError extends Error {
    log: () => void;
    protected prefix: string;
    protected type: string;
    constructor(message: string, type: string);
}
export declare class EnvironmentError extends ImposiumError {
    constructor(messageKey: string, type?: string);
    log: () => void;
}
export declare class ClientConfigurationError extends ImposiumError {
    private eventName;
    constructor(messageKey: string, eventName: string, type?: string);
    log: () => void;
}
export declare class PlayerConfigurationError extends ImposiumError {
    private eventName;
    constructor(messageKey: string, eventName: string, type?: string);
    log: () => void;
}
export declare class NetworkError extends ImposiumError {
    private experienceId;
    private networkError;
    constructor(messageKey: string, experienceId: string, e: Error, type?: string);
    log: () => void;
}
export declare class UncaughtError extends ImposiumError {
    private uncaughtError;
    constructor(messageKey: string, e: Error, type?: string);
    log: () => void;
}
