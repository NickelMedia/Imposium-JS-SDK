Imposium JavaScript SDK
====================================================

### Getting started

Install:

`npm i imposium-js-sdk`

Create a reference:

```javascript
// require
var Imposium = require('imposium-js-sdk');

// es6 
import * as Imposium from 'imposium-js-sdk';

```

or

```html
<script type = "text/javascript" src = "../lib/imposium.js"></script>
```

### Initializing the client - Basic

_Important Note_: You will need an access token to use the client.

```javascript
var accessToken = 'my_access_token';

var client = new Imposium.ImposiumClient(accessToken);
```

### Initializing the client - Analytics

_Important Note_: You need to provide optional parameters as shown to use the client with analytics:

1. **trackingId** - a google analytics tracking ID
2. **video** - a reference to your HTML5 video element

```javascript
var accessToken = 'my_access_token',
	trackingId = 'my_ga_tracking_id,
	video = document.getElementById('video');

var client = new Imposium.ImposiumClient(accessToken, trackingId, video);
```

### Creating new experiences

To get started, you need to make a createExperience call. The parameters are as follows: 

1. **storyId** - a valid Imposium storyId **(required)**
2. **inventory** - object, `{text:string, image:file, callback_url:string}` **(required)**
3. **render** - boolean, tells the API to start rendering immediately **(required)**
4. **onSuccess(data)** - callback function **(required)**
5. **onError(err)** - callback function **(optional)**

_Note_: The content of inventory depends on the story you're attempting to reference, callback_url is also optional and can be an empty string unless you require the video metadata be sent to a custom callback url.

```javascript
client.createExperience(
	storyId, 
	inventory, 
	render, 
	onSuccess, 
	onError 
);

// Called once the experience has been created
function onSuccess(data) {
	// References your new experience
	console.log(data.id);
}
```

### Receiving scene data and listening to events

New experiences are identified by the id returned in the onSuccess callback passed to createExperience (shown below). You'll need this id to fetch the render and stream messages related to processing. 

The following example demonstrates how to set up the full flow (without listening for processing events):

_Important Note_: Your code needs access to the following strings, you can arrange
this however you like. If these details are provided incorrectly, you will generate errors. For the sake of this demo, let's assume these are declared globally.

1. **storyId** - Imposium story reference
2. **sceneId** - Imposium scene reference
3. **actId** - reference to an act of a story 

```javascript
var accessToken = 'access_token', 
	storyId = 'story_id', 
	sceneId = 'scene_id',
	actId = 'act_id',
	render = false,
	job = null,
	client = null;

client = new Imposium.ImposiumClient(accessToken);

var inventory = {
    text: 'some_string',
    image: someImageFile,
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
	render = false,
	job = null,
	client = null;

client = new Imposium.ImposiumClient(accessToken);

var inventory = {
    text: 'some_string',
    image: someImageFile,
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