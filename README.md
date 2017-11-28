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

### Initializing the client

_Important Note_: You need the following strings in order to use the client.

1. **accessToken [hmac]** - authenticates with the api
2. **storyId [uuid]** - Imposium story reference
3. **actId [uuid]** - refernece to an act of a story 

Pass the token as a parameter in the client constructor. Uses for storyId and actId are shown below. 

```javascript
var client = new Imposium.ImposiumClient(accessToken);
```

### Creating new experiences

To get started, you need to make a createExperience call: 

```javascript
client.createExperience(
	storyId, 
	inventory, 
	render, 
	onSuccess, 
	onError 
);
```

The parameters are as follows: 

* storyId - a valid Imposium storyId **(required)**
* inventory - `{text:string, image:file, callback_url:string}` **(required)**
* render - boolean, tell the API to start rendering immediately **(required)**
* onSuccess(data) - callback function **(required)**
* onError(err) - callback function (handle errors creating the experience) **(optional)**

_Note_: The content of inventory depends on the story you're attempting to reference.

### Receiving scene data and listening to events

New experiences are identified by the id returned in the onSuccess callback passed to createExperience (shown below). You'll need this id to fetch the render and stream messages related to processing. 

The following example demonstrates how to set up the full flow (without listening for processing events):

```javascript
var accessToken = 'access_token', 
	storyId = 'story_id', 
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