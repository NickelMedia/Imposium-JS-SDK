import * as Sentry from '@sentry/browser';
import {ImposiumError, UncaughtError} from './Exceptions';

const warnings = require('../conf/warnings.json');
const {sentry: {dsn}} = require('../conf/errors.json');

export default class ExceptionPipe {
    public static init = (): void => {
        // Initialize the Sentry client for error tracing
        Sentry.init({dsn});
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

        // Log to browser console
        e.log();

        // Stringify internal errs and trace via Sentry
        e.stringifyInternalError();
        Sentry.captureException(e);
    }
}
