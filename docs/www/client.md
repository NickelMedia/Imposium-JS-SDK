#### constructor

`new Imposium.Client(config: Object)`

This class provides simple tooling around the Imposium API and can also be configured to record playback analytics in place of [`Imposium.Player`](/player). New clients require a configuration object containing your access credentials and project settings. These values will be provided to you by the Imposium team when your account and new projects are created.

**Example**

```javascript
// For this use case only an access token and story id are required to begin working
var config = {
    accessToken: 'ieThohr0Jahyui9pohKookahkueZeizu',
    storyId: '2f34153d-4b54-4d14-9c08-37a94205bc3f'
};

var client = new Imposium.Client(config);
```

**Configuration Options**

| Property    | Description                                                                              | Type   | Optional   |
| ----------- | ---------------------------------------------------------------------------------------- | ------ | ---------- |
| accessToken | An access token provided by your Imposium account manager.                               | String | no         |
| storyId     | The story id associated with your project.                                               | String | no         |
| compositionId | The composition within your project that you want to render.                          | String | no         |
| environment | Controls the Imposium environment being used. Options: 'production' (default), 'staging' | String | yes        |


#### setup

`Imposium.Client.setup(config: Object): void`

Calling setup will re-configure the client using the same properties described above.

**Example** 

```javascript
var client = new Imposium.Client({...});

var newConfig = {
    accessToken: 'ieThohr0Jahyui9pohKookahkueZeizu',
    storyId: '4228d2af-8368-431e-8497-60a92bca0a42',
    environment: 'staging'
};

client.setup(newConfig);
```

#### on

`Imposium.Client.on(eventName: String, callback: Function): void`

Binds a callback function to an Imposium event.

##### GOT_EXPERIENCE

**Callback Signature:** `function gotExperience(experience: Object)`

Triggered when experience data is delivered to the client.

Note: If you are not using [`Imposium.Player`](/player) this event is required to be set in order to call [`getExperience`](#getExperience). 

**Sample JSON** 

```json
{
    "id": "bdc8ca2e-6c68-4c37-8396-bae2c65964d9",
    "moderation_status": "approved",
    "rendering": false,
    "date_created": 1535465716,
    "output": {
        "videos": [{
                "format": "mp4",
                "width": "1920",
                "height": "1080",
                "duration": 4.033333,
                "rate": 30,
                "url": "https:\/\/d14ffwo9wh5yh2.cloudfront.net\/P-03F3M6s7R9P6K1A723DbB0a3e7Ub91L5u9N1n3WbbaL-qfK55eUaj1T89199\/m9s21-weB7b6p648k-p4tfo5vak078G2YaX5.mp4"
            },{
                "format": "mp4",
                "width": "1280",
                "height": "720",
                "duration": 4.033333,
                "rate": 30,
                "url": "https:\/\/d14ffwo9wh5yh2.cloudfront.net\/P-03F3M6s7R9P6K1A723DbB0a3e7Ub91L5u9N1n3WbbaL-qfK55eUaj1T89199\/x1I8MeI3Y-N8y8ycm2E043y9hbIancT84eI1.mp4"
            },{
                "format": "mp4",
                "width": "854",
                "height": "480",
                "duration": 4.033333,
                "rate": 30,
                "url": "https:\/\/d14ffwo9wh5yh2.cloudfront.net\/P-03F3M6s7R9P6K1A723DbB0a3e7Ub91L5u9N1n3WbbaL-qfK55eUaj1T89199\/Q8uexchaP2tbxdL5h6fa95ZdC843Lc027aW-.mp4"
            }
        ]
    }
}
```

**Example**

```javascript
var client = new Imposium.Client({...});

function gotExperience(experience) {
    console.log('Got experience: ', experience);
}

client.on(Imposium.Events.GOT_EXPERIENCE, gotExperience);
```

##### UPLOAD_PROGRESS

**Callback Signature:** `function gotUploadProgress(percent: Number)`

Triggers as dynamic data is progressively uploaded. This is generally useful for controling loading markup when a project requires that large files be uploaded to our web servers as part of the [`createExperience`](#createExperience) call. 

**Example** 

```javascript
var client = new Imposium.Client({...});

function gotUploadProgress(percent) {
    console.log('Got upload progress: ', percent);
}

client.on(Imposium.Events.UPLOAD_PROGRESS, gotUploadProgress);
```

##### ERROR

**Callback Signature:** `function errorHandler(error: Error)`

Triggers when critical errors occur. This is useful to perform actions (showing error markup on a page, etc.) when breaking exceptions (repeated network failure, etc) occur. 

**Example**

```javascript
var client = new Imposium.Client({...});

function errorHandler(error) {
    // Show markup informing the user failure occured
}

client.on(Imposium.Events.ERROR, errorHandler);
```

##### EXPERIENCE_CREATED

**Callback Signature:** `function experienceCreated(experience: Object)`

Triggered when an experience record is first created. This is helpful in SPA environments for use cases where writing the id for an experience to a url can be used for SEO purposes, sharing, etc. This event can also be useful for updating loading markup (i.e: uploading has finished, moving on to processing...) since it means any dynamic data that was submitted to our web servers by a consumer was effectively transmitted. 

Note: This event is only fired if you're using [`createExperience`](#createExperience) vs. [`renderExperience`](#renderExperience).
    
**Sample JSON** 

```json
{
    "id": "bdc8ca2e-6c68-4c37-8396-bae2c65964d9",
    "moderation_status": "approved",
    "rendering": true,
    "date_created": 1535465716,
    "output": {}
}
```

**Example**

```javascript
var client = new Imposium.Client({...});

function experienceCreated(experience) {
    // Create a deeplink to the experience
    window.location.hash = '#' + experience.id;
}

client.on(Imposium.Events.EXPERIENCE_CREATED, experienceCreated);
```

#### off

`Imposium.Client.off(eventName: String): void`

Removes existing callback references from memory.

**Example**

```javascript
var client = new Imposium.Client({...});

function gotExperience(experience) {
    client.off(Imposium.Events.GOT_EXPERIENCE);
}

client.on(Imposium.Events.GOT_EXPERIENCE, gotExperience);
```
#### renderExperience

`Imposium.Client.renderExperience(inventory: Object): void`

[`renderExperience`](#renderExperience) Is the easiest way to render a dynamic video and immediately use the rendered video files. It creates a new instance of an experience, automatically kicks off the render, and will fire [`GOT_EXPERIENCE`](#GOT_EXPERIENCE) once the render is complete. [`renderExperience`](#renderExperience) is essentially a combination of [`createExperience`](#createExperience) and [`getExperience`](#getExperience), in a single easy to use call. 

**Example (with player)**

```javascript
var client = new Imposium.Client({...});
var player = new Imposium.Player({...});

var textInput = document.getElementById('my-text-input');
var fileInput = document.getElementById('ny-file-input');

// Create a map containing inventory
var inventory = {
    text: textInput.value,
    image: fileInput.files[0]
};

// Pass inventory to createExperience
client.renderExperience(inventory);
```

**Example (no player)**

```javascript
var client = new Imposium.Client({...});

var videoElement = document.getElementById('my-video-element');
var textInput = document.getElementById('my-text-input');
var fileInput = document.getElementById('ny-file-input');

// Executes when the experience is retrieved or done processing
function gotExperience(experience) {
    videoElement.src = data.output.videos[0].url;
}

// Set up the got experience event
client.on(Imposium.Events.GOT_EXPERIENCE, gotExperience);

// Create a map containing inventory
var inventory = {
    text: textInput.value,
    image: fileInput.files[0]
};

// Pass inventory to createExperience 
client.renderExperience(inventory);
```

#### createExperience

`Imposium.Client.createExperience(inventory: Object, render: Boolean [optional]): void`

Creates a new instance of an experience. Rendering will be automatically started but can optionally be turned off by passing in a second parameter of `false` for certain use cases where rendering on demand is preferred.

Note: If you want to immediately get the output of your experince, it may be easier to use the 1 step [`renderExperience`](#renderExperience) call. If not, you'll need to call [`getExperience`](#getExperience) using the experience ID included in the  [`EXPERIENCE_CREATED`](#EXPERIENCE_CREATED) callback. Please refer to the "two-stage-rendering.html" example for more details. 

**Example (with player)**

```javascript
var client = new Imposium.Client({...});
var player = new Imposium.Player({...});

var textInput = document.getElementById('my-text-input');
var fileInput = document.getElementById('ny-file-input');

// Create a map containing inventory
var inventory = {
    text: textInput.value,
    image: fileInput.files[0]
};

client.on(Imposium.Events.EXPERIENCE_CREATED, experienceCreated);

function experienceCreated(expData){

    client.getExperience(expData.id);
}

// Pass inventory to createExperience
client.createExperience(inventory);
```

**Example (no player)**

```javascript
var client = new Imposium.Client({...});

var videoElement = document.getElementById('my-video-element');
var textInput = document.getElementById('my-text-input');
var fileInput = document.getElementById('ny-file-input');

// Executes when the experience is retrieved or done processing
function gotExperience(experience) {
    videoElement.src = data.output.videos[0].url;
}

// Set up the got experience event
client.on(Imposium.Events.GOT_EXPERIENCE, gotExperience);
client.on(Imposium.Events.EXPERIENCE_CREATED, experienceCreated);

function experienceCreated(expData){

    client.getExperience(expData.id);
}

// Create a map containing inventory
var inventory = {
    text: textInput.value,
    image: fileInput.files[0]
};

// Pass inventory to createExperience 
client.createExperience(inventory);
```

#### getExperience

`Imposium.Client.getExperience(experienceId: String): void`

Returns an experience via its unique experience ID, and triggers the [`GOT_EXPERIENCE`](#GOT_EXPERIENCE) event on success. If processing an experience is intentionally deferred until after an experience is created (i.e. rendering is invoked by the first visit to a deeplink) making this call will invoke processing.

Note: If you are using [`Imposium.Player`](/player) to handle playback then you can skip setting [`GOT_EXPERIENCE`](#GOT_EXPERIENCE) since the player will always consume processed experiences for you. It should be said though that setting this event can still be useful when using the player if you wish to update application state or markup when an experience becomes ready (i.e: hiding a 'loading' or 'now processing' view).

**Example (with player)**

```javascript
var client = new Imposium.Client({...});
var player = new Imposium.Player({...});

// Existing experience ID
var myExperienceId = 'bdc8ca2e-6c68-4c37-8396-bae2c65964d9';

// Retrieve the data for 'myExperienceId'
client.getExperience(experienceId);
```

**Example (no player)**

```javascript
var client = new Imposium.Client({...});

// Existing experience ID
var myExperienceId = 'bdc8ca2e-6c68-4c37-8396-bae2c65964d9';
var videoElement = document.getElementById('my-video-element');

// Executes when the experience is retrieved or done processing
function gotExperience(experience) {
     videoElement.src = data.output.videos[0].url;
}

// Set up the got experience event
client.on(Imposium.Events.GOT_EXPERIENCE);

// Retrieve the data for 'myExperienceId'
client.getExperience(experienceId);
```

#### captureAnalytics

`Imposium.Client.captureAnalytics(player: HTMLVideoElement): void`

Enables performance tracking to assist with reporting and project analytics. Passing in an HTML5 video element will configure a range of common browser events that are used to push supporting metrics. This call is designed for use cases where [`Imposium.Player`](/player) is not used.

**Example (no player)**

```javascript
var client = new Imposium.Client({...});
var videoElement = document.getElementById('my-video-element');

client.captureAnalytics(videoElement);
```
