#### constructor

`new Imposium.Player(videoElement: HTMLVideoElement, client: Imposium.Client, config: Object [optional])`

The Imposium player is used alongside [`Imposium.client`](/client) to handle things like streaming, consuming data returned by our API, emitting custom / HTML5 media events and recording performance metrics. It requires a JavaScript reference to an HTML5 video element, a reference an Imposium client and configuration can be be passed in optionally (see below).

**Example (default configuration)**

```javascript
var client = new Imposium.Client({...});

// Create a reference to a video element
var videoElement = document.getElementById('my-video-player');

// Create the player with default config
var player = new Imposium.Player(videoElement, client);
```

**Example (custom configuration)**

```javascript
var client = new Imposium.Client({...});

// Create a reference to a video element
var videoElement = document.getElementById('my-video-player');

// Set configuration options in a map
var customConfig = {
	loop: true,
	controls: false
};

// Create the player with customized config
var player = new Imposium.Player(videoElement, client, customConfig);
```

**Configuration Options**

| Property        | Description                                                                              | Type    | Default     |
| --------------- | ---------------------------------------------------------------------------------------- | ------- | ----------- |
| volume          | The default volume level for the media element. (0.0 - 1.0)                              | Number  | 1           |
| preload         | The default preload setting for the media element.                                       | String  | 'auto'      |
| loop            | Controls whether the media should loop on end or not.                                    | Boolean | false       |
| muted           | Controls whether or not the media should be muted on load.                               | Boolean | false       |
| autoPlay        | Controls whether or not the media element should auto play on load.                      | Boolean | true        |
| controls        | Controls whether or not the media element should display native player controls.         | Boolean | true        |
| crossOrigin     | Sets the default CORS setting for the media element.                                     | String  | 'anonymous' |
| qualityOverride | Can be used to always serve a certain video quality.                                     | String  | null        |

#### on

` Imposium.Player.on(eventName: String, callback: Function): void`

Binds a callback function to an player event. Depending on your use case, you may need to set callbacks for one or more of these events. Event names are referenced by constants held in `Imposium.PlayerEvents`. See below for specific event examples.

##### PLAY

Executes when media starts or resumes playback. 

**Example**

```javascript
var player = new Imposium.Player({...});

function onPlay() {
	// Hide custom play button, show custom pause button
}

player.on(Imposium.PlayerEvents.PLAY, onPlay);
```

##### PAUSE

Executes when media is paused.

**Example**

```javascript
var player = new Imposium.Player({...});

function onPause() {
	// Hide custom pause button, show custom play button
}

player.on(Imposium.PlayerEvents.PAUSE, onPause);
```

##### COMPLETE

Executes when media has finished playing.

**Example**

```javascript
var player = new Imposium.Player({...});

function onComplete() {
	// Show replay markup
}

player.on(Imposium.PlayerEvents.COMPLETE, onComplete);
```

##### SEEK

Executes when seeking through media.

**Example**

```javascript
var player = new Imposium.Player({...});

function onSeek() {
	// Update progress bar markup
}

player.on(Imposium.PlayerEvents.SEEK, onSeek);
```

##### TIME

Executes on an interval if set in sync with the playback rate of the media. 

**Example**

```javascript
var player = new Imposium.Player({...});

function onTimeChanged() {
	// Update progress bar markup
}

player.on(Imposium.PlayerEvents.TIME, onTimeChanged);
```

##### VOLUME

Executes when the volume level is adjusted.

**Example**

```javascript
var player = new Imposium.Player({...});

function onVolumeChange() {
	// Update volume level markup
}

player.on(Imposium.PlayerEvents.VOLUME, onVolumeChange);
```

##### MUTE

Executes when the mute property is toggled.

**Example**

```javascript
var player = new Imposium.Player({...});

function onMute() {
	// Hide the mute button, show the unmute button
}

player.on(Imposium.PlayerEvents.MUTE, onMute);
```

##### CONTROLS

Executes when native media controls are toggled.

**Example**

```javascript
var player = new Imposium.Player({...});

function onControlsToggled() {
	// Show native controls on custom control failure
}

player.on(Imposium.PlayerEvents.CONTROLS, onControlsToggled);
```

##### ERROR

Executes when media element level errors occur.

**Example**

```javascript
var player = new Imposium.Player({...});

function onError() {
	// Show error markup
}

player.on(Imposium.PlayerEvents.ERROR, onError);
```

#### play

`Imposium.Player.play(): void`

Starts or resumes media playback. 

**Example**

```javascript
var player = new Imposium.Player({...});

player.play();
```

#### pause

`Imposium.Player.pause(): void`

Pauses media playback. 

**Example**

```javascript
var player = new Imposium.Player({...});

player.pause();
```

#### getPlaybackState

`Imposium.Player.getPlaybackState(): String`

Returns a string indicating the playback status of the media element. Returns `'paused'` or `'playing'`.

**Example**

```javascript
var player = new Imposium.Player({...});

var currentState = player.getPlaybackState();
```

#### getPosition

` Imposium.Player.getPosition(): Number`

Returns a number representing the current playback time in seconds.

**Example**

```javascript
var player = new Imposium.Player({...});

var cursor = player.getPosition();
```

#### getDuration

`Imposium.Player.getDuration(): Number`

Returns a number representing the length of the video in seconds.

**Example**

```javascript
var player = new Imposium.Player({...});

var videoDuration = player.getDuration();
```

#### seek

`Imposium.Player.seek(seekTo: number): void`

Sets the current time of the video to a number in seconds if within the range of 0 - length of video in seconds.

**Example**

```javascript
var player = new Imposium.Player({...});

var duration = player.getDuration();

// Seek to half way point of the video
player.seek(duration / 2);
```

#### getMute

`Imposium.Player.getMute(): Boolean`

Returns a boolean value `true` if media is muted and `false` if volume is active.

**Example**

```javascript
var player = new Imposium.Player({...});

var mutedState = player.getMuted();
```

#### setMute

` Imposium.Player.setMute(mute: Boolean): void`

Sets the mute property for the html video element.

**Example**

```javascript
var player = new Imposium.Player({...});

var mutedState = player.getMuted();
```

#### getVolume

` Imposium.Player.getVolume(): Number`

Returns the current volume setting for the html video element.

**Example**

```javascript
var player = new Imposium.Player({...});

var currentVolume = player.getVolume();
```

#### setVolume

`Imposium.Player.setVolume(volume: Number): void`

Sets the volume for the html video element if value is between 0.0 - 1.0.

**Example**

```javascript
var player = new Imposium.Player({...});

player.setVolume(0.5);
```

#### getControls

`Imposium.Player.getControls(): void`

Returns the controls setting for the html video element.

**Example**

```javascript
var player = new Imposium.Player({...});

var controlsState = player.getControls();
```

#### setControls

`Imposium.Player.setControls(toggle: Boolean): void`

Sets the controls setting for the html video element. 

**Example**

```javascript
var player = new Imposium.Player({...});

player.setControls(false)
```


#### replay

`Imposium.Player.replay(): void`

Replays the media.

**Example**

```javascript
var player = new Imposium.Player({...});

player.replay();
```

#### remove

`Imposium.Player.remove(): void`

Cleans up player context and prepares it for garbage collection. 

**Example**

```javascript
var player = new Imposium.Player({...});

player.remove();
```