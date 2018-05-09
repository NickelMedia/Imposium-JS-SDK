Imposium JavaScript SDK
====================================================

### 1. Install:

`npm i imposium-js-sdk`

### 2. Create an Imposium reference:

```javascript

// Choose one of the following:

// commonJS
var Imposium = require('imposium-js-sdk');

// ES6 modules 
import * as Imposium from 'imposium-js-sdk';

// Include
<script type = "text/javascript" src = "../lib/imposium.min.js"></script>
```

### 3. Set up your Imposium story values:

The following values are used to communicate with your project. You will receive the UpperCase values from your Imposium account manager. If you don’t have them yet, please contact support@imposium.com.

1. ACCESS_TOKEN: the access token provided by your account manager (required)
2. STORY_ID: the id of your story (required)
3.SCENE_ID: the id of the scene in your story (required)
4. ACT_ID: the id of the act in your story (required)
5. inventory - object, {text:string, image:file, callback_url:string} (required)
6. render - boolean, tells the API to start rendering immediately (required)

```javascript
var ACCESS_TOKEN = 'access_token', 
	STORY_ID  = 'story_id',
	SCENE_ID  = 'scene_id', 
	ACT_ID    = 'act_id',
	inventory = null,
	render    = false;
```

### 4. Initialize the Imposium client:

Pass in the ACCESS_TOKEN you received from your Imposium account manager.

```javascript
var client = new Imposium.ImposiumClient(ACCESS_TOKEN);
```

### 5. Define the data to be rendered

Dynamic data is defined in Imposium through the inventory object. This object lists all dynamic values to be used in the creation of the video. The property names are assigned based on the values in the story which come from your particular project set up by your Imposium account manager. You will find these values in an email from your Imposium account manager.
The callback_url property is the only optional value and can be an empty string unless you require the responses be sent to a custom callback url.

```javascript
inventory = {
	textPropertyName: 'some_user_input_string',
	imagePropertyName: someUserInputImageFile,
};
```

### 6. Create new experiences

An Imposium experience is the data record of the video that is being generated. You must first create the experience before generating the video. This loads the data into Imposium to be rendered when getVideo is called in the next step.
The parameters in this createExperience call are defined in your story values from step 3. The experienceCreated value is a callback function defined in your code for when the experience is created (shown in step 7).

```javascript
client.createExperience(
	STORY_ID, 
	inventory, 
	render, 
	experienceCreated
);
```

### 7. Receive experience data and listen to events

When the experience is created successfully, the experienceCreated callback is called and passes in the experienceId used to retrieve the render and stream messages related to processing.

```javascript
// Called once the experience has been created
function experienceCreated(data) {
	var job = {
		experienceId: data.id,
		sceneId: SCENE_ID,
		actId: ACT_ID
	};

	// Listen to status updates as the video is being processed and rendered
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
	var videoElement = document.getElementById('video_player_element');


// Stop listening to processing events for the video
	client.off(
		Imposium.events.STATUS, 
		statusHandler, 
		this
	);
	
// Choose the video format that fits your needs for this browser
	// TODO: List the video formats
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