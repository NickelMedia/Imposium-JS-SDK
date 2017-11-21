Imposium JavaScript SDK
====================================================

### Getting started

Run the following for development: 

* `npm i`
* `webpack --watch`


### Initializing the client

Include in your HTML:

```html
<script type = "text/javascript" src = "../lib/imposium.js"></script>
```

_Note_: In order for a consumer to communicate with the Imposium API via the client you must have the following credentials: 

1. An access token
2. An Imposium story id
3. An Imposium act id

To instantiate a client you must supply a valid access token and optionally you can pass endpoint configuration in JSON format (this is only used in dev, regular consumers won't need to adjust these options).

```javascript
var client = new Imposium.ImposiumClient(<token>, <options>);
```

_Options_: For dev purposes you can change the default Imposium endpoint, type of auth and WebStomp configuration.

```javascript
var options = {
	url: 'http://api/',
	auth: '',
	stompConfig: {
		'stompEndpoint':'ws://127.0.0.1:15674/ws',
		'user': 'guest',
		'password': 'guest',
		'exchangeRoute': '/exchange/imposium/',
		'onMessage': gotMessage(msg),
		'onError': errorHandler(err)
}
```

* url - location of an imposium api
* auth - `options: [jwt], i.e: auth: 'jwt'` currently the only flag supported here is jwt, you can pass in a relevant idToken here
* stompConfig
	* stompEndpoint - location of an Imposium WebStomp endpoint
	* user - stomp username
	* password - stomp password
	* exchangeRoute - default exchange
	* onMessage - possible to pass a delegate message function here for message parsing/handling.
	* onError - possible to pass a delegate error function here for custom error handling.

### Invoking new experiences

To get started, you need to make a createExperience call: 

```javascript
client.createExperience(
	storyId, 
	inventory, 
	render, 
	onSuccess, 
	onError, 
	onProgress
);
```

The parameters are as follows: 

_Note_: inventory content depends on the context of the specified story. 

* storyId - a valid Imposium storyId **(required)**
* inventory - `{ text:string, image:file, callback_url:string }` **(required)**
* render - boolean, tell the API to start rendering immediately **(required)**
* onSuccess(data), onError(err), onProgress(data) - callback functions **(optional)**

### Receiving scene data and listening to events

Experiences are identified by an experienceId. You'll need this id to fetch videos and stream messages related to processing. 

When creating a new experience this id will be returned by `client.createExperience` in the onSuccess callback. The following example demonstrates how you would get the experience id and listen for a finished video URL. 

```javascript
var accessToken = 'token', 
	storyId = 'storyId', 
	actId = 'actId',
	job,
	client;

client = new Imposium.ImposiumClient(accessToken);

client.createExperience(
	storyId, 
	data, 
	render, 
	experienceCreated
);

function experienceCreated(data) {
	job = {
		expId: data.id,
		actId: actId
	};

	client.getVideo(
		job, 
		onProcessed, 
		onError
	);
}

function onProcessed(data) {
	videoElement.src = data.mp4Url;
}

function onError(err) {
	console.error(err);
}
```

_Optional_: If you want to listen to intermediate messages related to processing steps you can pass a callback function to the client event bus. If you check the examples you can see a use case where this is used to update a UI with incoming messages to provide the user with live feedback. 

```javascript
function experienceCreated(data) {
	job = {
		expId: data.id,
		actId: actId
	};

	client.on(
		Imposium.events.STATUS, 
		statusHandler, 
		this
	);

	client.getVideo(
		job, 
		onProcessed, 
		onError
	);
}

function onProcessed(data) {
	client.off(
		Imposium.events.STATUS, 
		statusHandler, 
		this
	);

	videoElement.src = data.mp4Url;
}

function onError(err) {
	console.error(err);
}

function statusHandler(data) {
	console.log(data.msg);
}
```