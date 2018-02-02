Imposium JavaScript SDK
====================================================

### Getting started

Install:

`npm i imposium-js-sdk`

Create a reference:

```javascript
// commonJS
var Imposium = require('imposium-js-sdk');

// es6 
import * as Imposium from 'imposium-js-sdk';

```

or

```html
<script type = "text/javascript" src = "../lib/imposium.min.js"></script>
```

### Initializing the client - Basic

_Important Note_: You will need an access token to use the client.

```javascript
var accessToken = 'access_token';

var client = new Imposium.ImposiumClient(accessToken);
```

### Initializing the client - With Analytics

_Important Note_: You need to provide optional parameters as shown to use the client with analytics:

1. **trackingId** - a google analytics tracking ID
2. **video** - a reference to your HTML5 video element

```javascript
var accessToken = 'access_token',
	trackingId = 'ga_tracking_id',
	video = document.getElementById('video');

var client = new Imposium.ImposiumClient(accessToken, trackingId, video);
```

### Creating new experiences

To get started, you need to make a createExperience call. The parameters are as follows: 

1. **storyId** - a valid Imposium storyId **(required)**
2. **inventory** - object, `{text:string, image:file, callback_url:string}` **(required)**
3. **render** - boolean, tells the API to start rendering immediately **(required)**
4. **onSuccess(data)** - success callback function **(required)**
5. **onError(err)** - error callback function **(optional)**

_Note_: The content of inventory is structured by the inputs defined by the experience requirements. The callback_url property is also optional and can be an empty string unless you require that metadata be sent to a custom callback url.

```javascript
var accessToken = 'access_token', 
	storyId = 'story_id',
	inventory = null,
	render = false,
	client = null;

var client = new Imposium.ImposiumClient(accessToken);

// For the sake of simplicity let's eschew input handling code 
// and assume we already have references to user inputs.
inventory = {
    text: 'some_user_input_string',
    image: someUserInputImageFile,
    callback_url: ''
};

client.createExperience(
	storyId, 
	inventory, 
	render, 
	onSuccess, 
	onError 
);

function onSuccess(data) {
	console.log(data.id);
}

function onError(err) {
	console.error('Something went wrong...', err);
}
```

### Receiving scene data and listening to events

New experiences are identified by the id returned in the onSuccess callback passed to createExperience (as shown above). You'll need this id to fetch the render and stream messages related to processing. 

The following example demonstrates how to set up the full flow (without listening for processing events):

_Important Note_: Your client code needs access to the following strings. If these details are provided incorrectly, you will generate errors. For the sake of this demo, let's assume these are declared globally.

1. **storyId** - Imposium story reference
2. **sceneId** - Imposium scene reference
3. **actId** - reference to an act of a story 

```javascript
var accessToken = 'access_token', 
	storyId = 'story_id',
	sceneId = 'scene_id',
	actId = 'act_id',
	inventory = null,
	render = false,
	job = null,
	client = null;

client = new Imposium.ImposiumClient(accessToken);

// For the sake of simplicity let's eschew input handling code 
// and assume we already have references to user inputs.
inventory = {
    text: 'some_user_input_string',
    image: someUserInputImageFile,
    callback_url: ''
};

client.createExperience(
	storyId, 
	inventory, 
	render, 
	experienceCreated
);

// Called once the experience has been created
function experienceCreated(data) {
	job = {
		expId: data.id,
		sceneId: sceneId,
		actId: actId
	};

	client.getVideo(
		job, 
		onProcessed, 
		onError
	);
}

// Called once the video related to the experience has been rendered and saved
function onProcessed(data) {
	var videoElement = document.getElementById('my-video');
	videoElement.src = data.mp4Url;
}

// Called if an error occurs during processing
function onError(err) {
	console.error(err);
}
```

_Optional_: The following example demonstrates how to set up the full flow (listening for processing events):

```javascript
var accessToken = 'access_token', 
	storyId = 'story_id',
	sceneId = 'scene_id', 
	actId = 'act_id',
	inventory = null,
	render = false,
	job = null,
	client = null;

client = new Imposium.ImposiumClient(accessToken);

// For the sake of simplicity let's eschew input handling code 
// and assume we already have references to user inputs.
inventory = {
    text: 'some_user_input_string',
    image: someUserInputImageFile,
    callback_url: ''
};

client.createExperience(
	storyId, 
	inventory, 
	render, 
	experienceCreated
);

// Called once the experience has been created
function experienceCreated(data) {
	job = {
		expId: data.id,
		sceneId: sceneId,
		actId: actId
	};

	// This will set up an event bus that allows you to listen to processing events
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

// Called once the video related to the experience has been rendered and saved
function onProcessed(data) {
	var videoElement = document.getElementById('my-video');

	client.off(
		Imposium.events.STATUS, 
		statusHandler, 
		this
	);

	videoElement.src = data.mp4Url;
}

// Called if an error occurs during processing
function onError(err) {
	console.error(err);
}

// Called when processing events get emitted 
function statusHandler(data) {
	console.log(data.msg);
}
```

For more example code see the example directory.