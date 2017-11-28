Imposium JavaScript SDK
====================================================

### Getting started

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

1. accessToken [hmac] - authenticates with the api
2. storyId [uuid] - Imposium story reference
3. actId [uuid] - refernece to an act of a story 

Pass the token as the first parameter in the client constructor, the uses for storyId and actId are shown below. 

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

_Note_: inventory contains the relevant assets needed to render an experience. 

* storyId - a valid Imposium storyId **(required)**
* inventory - `{text:string, image:file, callback_url:string}` **(required)**
* render - boolean, tell the API to start rendering immediately **(required)**
* onSuccess(data) - callback function **(required)**
* onError(err) - callback function (handle errors creating the experience) **(optional)**

### Receiving scene data and listening to events

Experiences are identified by the id returned in the onSuccess callback in passed to createExperience (see below). You'll need this id to fetch videos and stream messages related to processing. 

The following example demonstrates how to set up the full flow (without listening for processing events):

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

_Optional_: The following example demonstrates how to set up the full flow (listening for processing events):

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

For more example code see the example directory.