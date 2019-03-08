import {AxiosError} from 'axios';
import {init, BrowserOptions, captureException, configureScope, Scope, SentryEvent}  from '@sentry/browser';
import {ImposiumError, UncaughtError} from './Exceptions';

const {...warnings} = require('../conf/warnings.json');
const {sentry: {dsn}} = require('../conf/settings.json');

export default class ExceptionPipe {
    public static startTracing = (): void => {
        // Initialize the Sentry client for error tracing
        init({
            dsn,
            beforeSend: (e: SentryEvent) => ExceptionPipe.beforeSend(e)
        });
    }

    public static logWarning = (type: string, messageKey: string): void => {
        console.warn(`IMPOSIUM\n${warnings[type][messageKey]}`);
    }

    // Process exceptions
    public static trapError = (e: any, storyId: string, callback: (e: ImposiumError) => () => any = null): void => {
        // If the error isn't a duck typed Imposium error, wrap with uncaught type to keep log formatting streamlined
        e = (!e.log) ? new UncaughtError('generic', e) : e;

        // Store storyId if available to assist in debugging network & uncaught exceptions
        if (storyId) {
            e.setStoryId(storyId);
        }

        // If a client error event delegate is set, propagate it
        if (callback) {
            callback(e);
        }

        // Trace err with Sentry.io
        if (e.axiosError) {
            configureScope((scope: Scope) => {
                if (typeof e.axiosError.response === 'object') {
                    scope.setExtra('response', e.axiosError.response);
                } else if (typeof e.axiosError.request === 'object') {
                    scope.setExtra('request', e.axiosError.request);
                    scope.setExtra('request_config', e.axiosError.config);
                } else {
                    scope.setExtra('axios_error_message', e.axiosError.message);
                    scope.setExtra('request_config', e.axiosError.config);
                }

                captureException(e);
            });
        } else {
            captureException(e);
        }

        // Log to browser console
        e.log();
    }

    private static beforeSend = (evt: SentryEvent): SentryEvent | Promise<SentryEvent> => {
        // Delete irrelevant default values from duck-typed errs to reduce payload / cleanse report
        delete evt.extra['Error']['prefix'];
        delete evt.extra['Error']['log'];
        delete evt.extra['Error']['setStoryId'];

        return evt;
    }
}
