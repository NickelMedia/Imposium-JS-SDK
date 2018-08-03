Imposium JavaScript SDK
====================================================

Basic Example
======

### 1. Install:

`npm i imposium-js-sdk -s`

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

### 3. Set up your Imposium configuration:

The following values are used to communicate with your project. You will receive these from your Imposium account manager. If you don’t have them yet, please contact support@imposium.com.

```javascript
var config = {
	accessToken: 'your_access_token',
	storyId: 'your_story_id'
};
```

### 4. Initialize the Imposium client:

Create a new instance of an Imposium client using the configuration object you just declared.

```javascript
var client = new Imposium.Client(config);
```

### 5. Initialize the Imposium video player:

Create a new instance of an Imposium video player using an html5 video element and the instance of the client you just declared. Using our player will auto configure the media element to work best with our API and also handle the entire rendering process for you!

```javascript
var videoElement = document.getElementById('my-video-player');
var player = new Imposium.Player(videoElement, client);
```

### 5. Define events you want to listen for:

The Imposium client has a number of events you can listen for to help you control functionality around our SDK. For this example, let's say you want to receive status updates related to processing. To do this, you must set a callback function for the `STATUS_UPDATE` event. 

```javascript
function statusUpdate(event) {
	console.log(event.status);
}

client.on(Imposium.Events.STATUS_UPDATE, statusUpdate);
```

### 6. Define the data to be rendered

Dynamic data is defined in Imposium through the inventory object. This object lists all dynamic values to be used in the creation of the video. The property names are assigned based on the values in the story which come from your particular project set up by your Imposium account manager. You will find these values in an email from your Imposium account manager.

The `callback_url` property is the only optional value and can be an empty string unless you require the responses be sent to a custom callback url.

```javascript
var fileInput = document.getElementById('my-file-input');
var imageFile = fileInput.files[0];

var inventory = {
	text: 'hello_world',
	image: imageFile,
	callback_url: ''
};
```

### 7. Create new experiences

An Imposium experience is the data record of the video that is being generated. You must first create the experience before generating the video. This loads the data into Imposium and started the rendering process. Once the video has been rendered, our player will auto load the most appropriate video quality for the user.

```javascript
client.createExperience(inventory);
);
```

### 8. More Information

There are lots of other features built into our SDK that are not described in this example so we can keep this short and informative. For more advanced examples of control flows and other features, take a look at our examples.

