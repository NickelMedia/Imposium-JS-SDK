export default class ExceptionPipe {
    static logWarning: (type: string, messageKey: string) => void;
    static trapError: (e: any, storyId: string, errorEvent?: (e: any) => any) => void;
    private static readonly errorsProperty;
    private static logError;
    private static traceError;
}
