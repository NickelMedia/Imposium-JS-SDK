export default class Stomp {
    private static readonly exchange;
    private static readonly username;
    private static readonly password;
    private experienceId;
    private delegates;
    private endpoint;
    private socket;
    private client;
    private subscription;
    constructor(experienceId: string, delegates: any, env: string);
    disconnectAsync: () => any;
    private init;
    private establishSubscription;
}
