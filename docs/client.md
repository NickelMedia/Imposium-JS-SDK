#### constructor

`Imposium.Client(config: Object)`

Clients provide simple tooling around the Imposium API and can also be configured to carry out performance monitoring sub-tasks in place of [`Imposium.Player`](/player). New clients require a configuration object containing your credentials and project settings. The required properties for your project will be outlined by our team and there is an additional setting that enables staging API access to assist with development envrionments.

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

| Property    | Description                                                                              | Type   |
| ----------- | ---------------------------------------------------------------------------------------- | ------ |
| accessToken | An access token provided by your Imposium account manager.                               | String |
| storyId     | The story id associated with your project.                                               | String |
| actId       | An id related to a specific act in your project.                                         | String |
| sceneId     | An id related to a specific scene in your project.                                       | String |
| environment | Controls the Imposium environment being used. Options: 'production' (default), 'staging' | String |


#### setup

`Imposium.Client.setup(config: Object)`

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

`Imposium.Client.on(eventName: String, callback: Function)`

Binds a callback function to an Imposium event. Depending on your use case, you may need to set callbacks for one or more of these events. Event names are referenced in `Imposium.Events`. See below for event details.

##### EXPERIENCE_CREATED

**Callback Signature:** `function experienceCreated(experience: Object)`

Executes when an experience record is first created. This is helpful in SPA environments for use cases where writing the id for an experience to a url can be used for SEO purposes, sharing, etc. This event can also be useful for updating loading markup (i.e: uploading has finished, moving onto processing...) as it means any data that was submitted to our web servers by the user was effectively transmitted. 

Note: If you are not using [`Imposium.Player`](/player) or [`GOT_EXPERIENCE`](#GOT_EXPERIENCE) to consume data returned by our web servers, this event as a minimum is required to be set in order to call [`createExperience`](#createExperience).

    
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

##### GOT_EXPERIENCE

**Callback Signature:** `function gotExperience(experience: Object)`

Executes when either existing experience data is retrieved or if processing has finished while the client has a WebSocket open. 

Note: If you are not using [`Imposium.Player`](/player) this event is required to be set in order to call [`getExperience`](#getExperience). 

**Sample JSON** 

```json
{
    "id": "bdc8ca2e-6c68-4c37-8396-bae2c65964d9",
    "moderation_status": "approved",
    "rendering": false,
    "date_created": 1535465716,
    "output": {
        "videos": {
            "mp4_1080": {
                "format": "mp4",
                "width": "1920",
                "height": "1080",
                "duration": 4.033333,
                "rate": 30,
                "url": "https:\/\/d14ffwo9wh5yh2.cloudfront.net\/P-03F3M6s7R9P6K1A723DbB0a3e7Ub91L5u9N1n3WbbaL-qfK55eUaj1T89199\/m9s21-weB7b6p648k-p4tfo5vak078G2YaX5.mp4"
            },
            "mp4_720": {
                "format": "mp4",
                "width": "1280",
                "height": "720",
                "duration": 4.033333,
                "rate": 30,
                "url": "https:\/\/d14ffwo9wh5yh2.cloudfront.net\/P-03F3M6s7R9P6K1A723DbB0a3e7Ub91L5u9N1n3WbbaL-qfK55eUaj1T89199\/x1I8MeI3Y-N8y8ycm2E043y9hbIancT84eI1.mp4"
            },
            "mp4_480": {
                "format": "mp4",
                "width": "854",
                "height": "480",
                "duration": 4.033333,
                "rate": 30,
                "url": "https:\/\/d14ffwo9wh5yh2.cloudfront.net\/P-03F3M6s7R9P6K1A723DbB0a3e7Ub91L5u9N1n3WbbaL-qfK55eUaj1T89199\/Q8uexchaP2tbxdL5h6fa95ZdC843Lc027aW-.mp4"
            },
            "m3u8": {
                "format": "m3u8",
                "duration": 4.033333,
                "rate": 30,
                "url": "https:\/\/d14ffwo9wh5yh2.cloudfront.net\/P-03F3M6s7R9P6K1A723DbB0a3e7Ub91L5u9N1n3WbbaL-qfK55eUaj1T89199\/stream_5b8559064f2b09.85753737\/playlist.m3u8"
            }
        }
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

##### STATUS_UPDATE

**Callback Signature:** `function gotStatusUpdate(status: Object)`

Executes each time a processing step has finished, status updates are transmitted via WebSocket and are delivered as follows:

**Sample JSON** 

```json
{
    "id": "bdc8ca2e-6c68-4c37-8396-bae2c65964d9",
    "status": "Priming assets...",
    "event": "gotMessage"
}
```

**Example**

```javascript
var client = new Imposium.Client({...});

function gotStatusUpdate(message) {
    console.log('Got status update: ', message.status);
}

client.on(Imposium.Events.STATUS_UPDATE, gotStatus);
```

##### UPLOAD_PROGRESS

**Callback Signature:** `function gotUploadProgress(percent: Number)`

Executes while user inputs are being uploaded. This is generally useful for controling loading markup when a project requires that large files be uploaded to our web servers as part of the [`createExperience`](#createExperience) call. 

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

Executes when critical errors occur. The client will handling logging out errors but it is good practice to use this event to help update markup, redirect users, or alert the user in the case of a breaking exception (repeated network failure, etc). 

**Example**

```javascript
var client = new Imposium.Client({...});

function errorHandler(error) {
    // Show markup informing the user failure occured
}

client.on(Imposium.Events.ERROR, errorHandler);
```
#### off

`Imposium.Client.off(eventName: String)`

Unbinds a callback function from an Imposium event if it has already has been set. 

**Example**

```javascript
var client = new Imposium.Client({...});

function gotExperience(experience) {
    client.off(Imposium.Events.GOT_EXPERIENCE);
}

client.on(Imposium.Events.GOT_EXPERIENCE, gotExperience);
```

#### getExperience

`Imposium.Client.getExperience(experienceId: String)`

Gets experiences by id and triggers the [`GOT_EXPERIENCE`](#GOT_EXPERIENCE) event on success. If processing the experience has not finished yet or is intentionally deferred until this call is made (i.e: rendering is invoked by the first visit to a deeplink) the client will open a WebSocket instead. The WebSocket will trigger [`STATUS_UPDATE`](#STATUS_UPDATE) until processing has finished and trigger [`GOT_EXPERIENCE`](#GOT_EXPERIENCE) before ending the connection.

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
     videoElement.src = data.output.videos['mp4_720'].url;
}

// Set up the got experience event
client.on(Imposium.Events.GOT_EXPERIENCE);

// Retrieve the data for 'myExperienceId'
client.getExperience(experienceId);
```

#### createExperience

`Imposium.Client.createExperience(inventory: Object, render: Boolean [optional])`

Creates a new instance of an experience. Once an experience record has been saved, the client opens a WebSocket and begins triggering [`STATUS_UPDATE`](#STATUS_UPDATE) until processing has finished and eventually triggers [`GOT_EXPERIENCE`](#GOT_EXPERIENCE) before ending the connection.

createExperience also has an optional boolean parameter which defaults to true. Passing a falsy value will disable creating WebSockets. You will need to setup the [`EXPERIENCE_CREATED`](#EXPERIENCE_CREATED) event as a minimum to use this flow as processed data will not be delivered. This use case is not common but is available to support flows where video delivery is deferred to a later time or particular scenario.

Note:  If you are using [`Imposium.Player`](/player) you will not need to setup any events to capture experience data. If not, you will need to set either the [`GOT_EXPERIENCE`](#GOT_EXPERIENCE) and / or [`EXPERIENCE_CREATED`](#EXPERIENCE_CREATED) events depending on your use case.

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
     videoElement.src = data.output.videos['mp4_720'].url;
}

// Set up the got experience event
client.on(Imposium.Events.GOT_EXPERIENCE);

// Create a map containing inventory
var inventory = {
    text: textInput.value,
    image: fileInput.files[0]
};

// Pass inventory to createExperience 
client.createExperience(inventory);
```

#### captureAnalytics

`Imposium.Client.captureAnalytics(player: HTMLVideoElement)`

Enables performance tracking to assist with reporting and project analytics. Passing in an HTML5 video element will configure a range of common browser events that are used to push supporting metrics. This call is designed for use cases where [`Imposium.Player`](/player) is not used.

**Example (no player)**

```javascript
var client = new Imposium.Client({...});
var videoElement = document.getElementById('my-video-element');

client.captureAnalytics(videoElement);
```
