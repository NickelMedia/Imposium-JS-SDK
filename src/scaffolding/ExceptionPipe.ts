import * as Sentry from '@sentry/browser';
import {ImposiumError, UncaughtError} from './Exceptions';
import {version} from './Version';

const {...warnings} = require('../conf/warnings.json');
const {sentry} = require('../conf/settings.json');

export default class ExceptionPipe {
    private static isInitialized = false;

    /*
        Initialize Sentry client
     */
    private static initializeSentry(): void {
        if (!ExceptionPipe.isInitialized) {
            Sentry.init({
                debug: false,
                dsn: sentry.dsn,
                integrations: [],
                beforeSend: (event, hint) => ExceptionPipe.cleanDucktype(event, hint),
                release: `${sentry.projectName}@${version}`
            });
            ExceptionPipe.isInitialized = true;
        }
    }

    /*
        Log out warnings
     */
    public static logWarning = (type: string, messageKey: string): void => {
        console.warn(`IMPOSIUM\n${warnings[type][messageKey]}`);
    }

    /*
        Process the exception and trace
     */
    public static trapError = (e: any, storyId: string, callback: (evt: ImposiumError) => () => any = null): void => {
        // Initialize Sentry if not already done
        ExceptionPipe.initializeSentry();

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

        // Trace err with Sentry.io using the new v10 API
        Sentry.withScope((scope) => {
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

            Sentry.captureException(e);
        });
    }

    /*
        Clean up sentry payloads before capturing exceptions
     */
    private static cleanDucktype = (evt: Sentry.ErrorEvent, hint: Sentry.EventHint): Sentry.ErrorEvent | null => {
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
