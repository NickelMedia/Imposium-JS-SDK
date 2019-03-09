import {AxiosError} from 'axios';
import {BrowserClient, BrowserOptions, Hub, Scope, SentryEvent} from '@sentry/browser';
import {ImposiumError, UncaughtError} from './Exceptions';
import {version} from './Version';

const {...warnings} = require('../conf/warnings.json');
const {sentry: {dsn}} = require('../conf/settings.json');

export default class ExceptionPipe {
    /*
        Log out warnings
     */
    public static logWarning = (type: string, messageKey: string): void => {
        console.warn(`IMPOSIUM\n${warnings[type][messageKey]}`);
    }

    /*
        Process the exception and trace
     */
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

        // Log to browser console
        e.log();

        // Trace err with Sentry.io
        ExceptionPipe.hub.configureScope((scope: Scope) => {
            scope.setTag('type', e.type);
            scope.setTag('version', e.version);
            scope.setTag('storyId', (storyId) ? storyId : '<not_set>');

            if (e.experienceId) {
                scope.setTag('experienceId', e.experienceId);
            }

            // Grab available axios error details
            if (e.axiosError) {
                if (typeof e.axiosError.response === 'object') {
                    scope.setExtra('response', e.axiosError.response);
                } else if (typeof e.axiosError.request === 'object') {
                    scope.setExtra('request', e.axiosError.request);
                    scope.setExtra('reuqestConfig', e.axiosError.config);
                } else {
                    scope.setExtra('axiosErrorMessage', e.axiosError.message);
                    scope.setExtra('reuqestConfig', e.axiosError.config);
                }
            }

            // Grab anything that can be helpful from the socket CloseEvent
            if (e.closeEvent) {
                scope.setExtra('socketCloseEvent', {
                    code: e.closeEvent.code,
                    type: e.closeEvent.type,
                    timestamp: e.closeEvent.timeStamp,
                    wsUrl: e.closeEvent.target.url,
                    wsBufferedAmount: e.closeEvent.target.bufferedAmount
                });
            }

            ExceptionPipe.hub.captureException(e);
        });
    }

    private static sentryClient: BrowserClient = new BrowserClient({
        dsn,
        beforeSend: (e: SentryEvent) => ExceptionPipe.beforeSend(e),
        release: `imposium--js-sdk@${version}`
    });

    private static hub: Hub = new Hub(ExceptionPipe.sentryClient);

    /*
        Clean up sentry payloads before capturing exceptions
     */
    private static beforeSend = (evt: SentryEvent): SentryEvent | Promise<SentryEvent> => {
        // Delete irrelevant default values from duck-typed errs to cut down on clutter in reports
        if (typeof evt.extra === 'undefined') {
            return evt;
        }

        if (evt.extra['Error']) {
            delete evt.extra['Error']['log'];
            delete evt.extra['Error']['logHeader'];
            delete evt.extra['Error']['setStoryId'];

            if (evt.extra['Error']['axiosError']) {
                delete evt.extra['Error']['axiosError'];
            }

            if (evt.extra['Error']['closeEvent']) {
                delete evt.extra['Error']['closeEvent'];
            }
        }

        return evt;
    }
}
