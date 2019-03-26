import API from './http/API';
import MessageConsumer, {IConsumerConfig, IClientDelegates, IEmitData} from './tcp/MessageConsumer';
import {IExperience} from './Client';
import {generateUUID} from '../scaffolding/Helpers';

export type VoidDelegate = (...args) => void;

export default class DeliveryPipe {
    private mode: string = 'ws';
    private storyId: string = '';
    private api: API = null;
    private consumerConfig: IConsumerConfig = null;
    private consumer: MessageConsumer = null;
    private delegates: Map<string, VoidDelegate> = new Map();

    constructor(api: API, storyId: string) {
        this.api = api;
        this.storyId = storyId;
    }

    public setMode = (mode: string): void => { this.mode = mode; }

    public setDelegate = (key: string, delegate: VoidDelegate) => {
        this.delegates.set(key, delegate);
    }

    public getExperience = (experienceId: string): void => {
        this.api.getExperience(experienceId)
        .then((exp: IExperience) => {
            this.delegates.get('gotExperience')(exp);
        })
        .catch((e: Error) => {
            this.delegates.get('internalError')(e)
        });
    }

    public startDeferredRender = (experienceId: string): void => {
        // TO DO: if mode==='http', start short poll instead
        this.startConsumer(experienceId)
        .then(() => {
            this.api.invokeStream(experienceId)
            .catch((e) => {
                this.delegates.get('internalError')(e);
            });
        });
    }

    public createExperience = (inventory: any, render: boolean, uploadProgress: (n: number) => any): void => {
        const {storyId} = this;
        const uuid: string = generateUUID();

        const config: any = {
            storyId,
            inventory,
            render,
            uuid,
            uploadProgress
        };

        if (!render) {
            this.doCreate(config);
        }

        if (render && this.mode === 'poll') {
            this.doCreate(config, true);
        }

        if (render && this.mode === 'ws') {
            this.startConsumer(uuid)
            .then(() => { this.doCreate(config); });
        }
    }

    private doCreate = (config: any, runPoll: boolean = false): void => {
        const {storyId, inventory, render, uuid, uploadProgress} = config;

        this.api.postExperience(storyId, inventory, render, uuid, uploadProgress)
        .then((e: IExperience) => {
            this.doShortPoll(e.id);
            this.delegates.get('experienceCreated')(e);
        })
        .catch((e: Error) => { 
            this.delegates.get('internalError')(e) 
        });
    }

    private startConsumer = (experienceId: string): Promise<void> => {
        return new Promise((resolve) => {
            this.killConsumer()
            .then(() => {
                this.consumer = new MessageConsumer(this.consumerConfig);
                this.consumer.connect().then(() => { resolve(); });
            });
        });
    }

    private killConsumer = (): Promise<void> => {
        return new Promise((resolve) => {
            if (!this.consumer) resolve();

            this.consumer.kill()
            .then(() => {
                this.consumer = null;
                resolve();
            });
        });
    }

    private consumerFailure = (e: Error): void => {
        // TO DO: switch over to poll mode
    }

    private doShortPoll = (experienceId: string): Promise<void> => {
        return Promise.resolve();
    }
}