import Analytics from '../analytics/Analytics';
import {ImposiumError, UncaughtError} from './Exceptions';
import {version} from './Version';

const settings = require('../conf/settings.json').analytics;
const warnings = require('../conf/warnings.json');

export default class ExceptionPipe {
    public static logWarning = (type: string, messageKey: string): void => {
        console.warn(`IMPOSIUM\n${warnings[type][messageKey]}`);
    }

    public static trapError = (e: any, storyId: string, errorEvent: (e: any) => any = null): void => {
        if (errorEvent) {
            errorEvent(e);
        }

        if (e.log) {
            if (!e.networkError) {
                ExceptionPipe.logError(e, storyId);
            } else {
                if (e.networkError.hasOwnProperty('config')) {
                    ExceptionPipe.logError(e, storyId);
                } else if (e.networkError.hasOwnProperty('isTrusted')) {
                    ExceptionPipe.logError(e, storyId);
                } else {
                    const u = new UncaughtError('generic', e.networkError);
                    ExceptionPipe.logError(u, storyId);
                }
            }
        } else {
            const u = new UncaughtError('generic', e);
            ExceptionPipe.logError(u, storyId);
        }
    }

    private static readonly errorsProperty: string = settings.exceptionProp;

    private static logError = (e: any, storyId: string): void => {
        e.log();
        ExceptionPipe.traceError(e, storyId);
    }

    private static traceError = (e: any, storyId: string): void => {
        const {errorsProperty} = ExceptionPipe;

        let eventAction = `Version: ${version}*`;

        if (e.eventName) {
            eventAction += `Event name: ${e.eventName}*`;
        }

        if (e.experienceId) {
            eventAction += `Experience ID: ${e.experienceId}*`;
        }

        if (e.networkError) {
            const url: string = (e.networkError.config) ? e.networkError.config.url : 'stomp connection';
            eventAction += `Url: ${url}*Stack: ${e.networkError}`;
        } else if (e.uncaughtError) {
            eventAction += `Stack: ${e.uncaughtError}`;
        } else {
            eventAction += `Stack: ${e.stack}`;
        }

        Analytics.send({
            prp: errorsProperty,
            t: 'event',
            ec: e.type,
            ea: eventAction,
            el: storyId,
            ev: 0
        });
    }
}
