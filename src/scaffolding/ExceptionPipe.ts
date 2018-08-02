import Analytics from '../analytics/Analytics';
import {ImposiumError} from './Exceptions';

const warnings = require('../conf/warnings.json');

export default class ExceptionPipe {
    public static logWarning = (type: string, messageKey: string): void => {
        console.warn(`IMPOSIUM\n${warnings[type][messageKey]}`);
    }

    public static trapError = (e: ImposiumError, errorEvent: (e: any) => any = null): void => {
        if (errorEvent) {
            errorEvent(e);
        }

        if (e.log) {
            e.log();
            // ExceptionPipe.traceError(e);
        } else {
            // do throw uncaught exception
        }
        // ExceptionPipe.gaEmit(e)
    }

    private static traceError = (e): void => {
        const gaProp = 'UA-113079866-1';

        Analytics.send({
            prp: gaProp,
            t: 'event',
            ec: e.type,
            ea: e.stack,
            el: '6072569c-d4e7-43d8-ec7d-ec336ed8d6a8',
            ev: 0
        });
    }
}
