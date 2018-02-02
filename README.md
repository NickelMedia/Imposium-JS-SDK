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

_Important Note_: You need the variable in order to use the client.

1. **accessToken** - authenticates with the api **(required)**

Pass the token as a parameter to the client constructor.

```javascript
var client = new Imposium.ImposiumClient(accessToken);
```

### Initializing the client - Analytics

_Important Note_: You need to declare the following variables in order to use the client with analytics.

1. **accessToken** - authenticates with the api **(required)**
2. **trackingId** - a google analytics tracking ID **(optional)**
3. **video** - a reference to your HTML5 video element **(optional)**

Pass the token, trackingId and HTML5 video reference as parameters to the client constructor.

```javascript
var client = new Imposium.ImposiumClient(accessToken, trackingId, video);
```

### Creating new experiences

To get started, you need to make a createExperience call. The parameters are as follows: 

1. **storyId** - a valid Imposium storyId **(required)**
2. **inventory** - object, `{text:string, image:file, callback_url:string}` **(required)**
3. **render** - boolean, tells the API to start rendering immediately **(required)**
4. **onSuccess(data)** - callback function **(required)**
5. **onError(err)** - callback function **(optional)**

_Note_: The content of inventory depends on the story you're attempting to reference.

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

client.createExperience(
	storyId, 
	data, 
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

client.createExperience(
	storyId, 
	data, 
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