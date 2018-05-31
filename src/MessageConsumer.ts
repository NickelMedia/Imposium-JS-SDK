import API from './API';
import Stomp from './Stomp';
import ImposiumEvents from './ImposiumEvents';

export default class MessageConsumer {
	private job:any = null;
	private retried:number = 0;
	private maxRetries:number = 5;

	public constructor(job:any) {
		this.job = job;
		this.init();
	}

	/*
		Initialize WebStomp
	 */
	public init():void {
		const {expId} = this.job;

		Stomp.setHandlers(
			()        => this.invokeStreaming(),
			(msg:any) => this.routeMessageData(msg),
			(e:any)   => this.streamError(e)
		);

		Stomp.init(expId);
	}

	/*
		Sets up a websocket for the experience
	 */
	public reconnect(job:any):void {
		const {kill} = Stomp;

		kill()
		.then(() => {
			this.init();	
		}).catch(err => {
			console.error('something went wrong killing webstomp.');
		});
	}

	/*
		Initiates the streaming process on the Imposium web servers
	 */
	private invokeStreaming():void {
		const {invokeStream} = API;
		const {onError} = ImposiumEvents;
		const {expId, sceneId, actId} = this.job;

		invokeStream(expId, sceneId, actId)
		.catch((err) => {
			onError(err);
		});
	}

	/*
		Manage incoming messages. Depending on their state the websocket
		may be terminated.
	 */
	private routeMessageData(msg:any):void {
		try {
			const payload = JSON.parse(msg.body);

			switch(payload.event) {
				case 'actComplete':
					Stomp.disconnect();
					break;
				case 'gotMessage':
					this.emitMessageData(payload);
					break;
				case 'gotScene':
					this.emitSceneData(payload);
					break;
				default: break;
			}
		} catch (e) {
			// TO DO : propagate err
		}
	}

	/*
		Fire the gotMessage callback if the user is listening for this event
	 */
	private emitMessageData(message:any):void {
		const {gotMessage} = ImposiumEvents;
		if (gotMessage) gotMessage(message);
	}

	/*
		Parse the scene data and propagate if there aren't errors.
		If any error occurs, propagate the error.
	 */
	private emitSceneData(experienceData:any):void {
		const {gotScene, onError} = ImposiumEvents
		const rejected = (experienceData || {}).error;

		if (!rejected) {
			// Shorthand idioms for checking if required nested JSON data exists
			const isVideo = (((experienceData || {}).sceneData || {}).type === 'VideoScene01');
			const sceneId = ((experienceData || {}).sceneData || {}).id;
			const hasUrls = (((experienceData || {}).output || {})[sceneId] || {}).mp4Url;

			if (isVideo && hasUrls) {
				const {id, output} = experienceData;

				// Merge the scene data & experience ID
				const sceneData = {
					...output[sceneId],
					experience_id: id
				};

				gotScene(sceneData);
			} else {
				onError(experienceData);
			}
		} else {
			onError(new Error(rejected));
		}
	}

	/*
		Invoked if there's an err in the WebStomp client. Retries n times
		based on config. 
	 */
	private streamError(err:any):void {
		if (!err.wasClean) {
			++this.retried;

			if (this.retried < this.maxRetries) {
				const {expId} = this.job;
				console.error(`WebStomp error: (retrying: ${this.retried})`, err);
				Stomp.reconnect(expId);
			} else {
				this.job.onError(err);
			}
		}
	}
}