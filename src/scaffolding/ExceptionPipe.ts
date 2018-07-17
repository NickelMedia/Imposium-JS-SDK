import {ImposiumError} from './Exceptions';
import ImposiumEvents from '../client/ImposiumEvents';

export default class ExceptionPipe {

	public static routeError = (e:ImposiumError, breakFlow:boolean = true):void => {
		const {onError} = ImposiumEvents;

		if (onError && breakFlow) {
			onError(e);
		}
		
		e.log();
	}
}