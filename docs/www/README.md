#### Features

- Lightweight at 80kb
- Easy to set up with a few lines of code
- Integrates with a wide range of javascript build environments
- Easily handles video playback for you as well as recording playback analytics
- Designed for ease of use with both static websites and SPA applications in mind

#### Overview 

Imposium JS SDK is dedicated to providing tooling around the [Imposium API](https://docs.imposium.com). If you are new to using the library, its core functionality is split into two modules:

- [`Imposium.Client`](/client) handles consuming dynamic data and API access.
- [`Imposium.Player`](/player) provides video player functionality and handles processing experience data for playback.



#### Issues and Support

For more information about the Imposium product please email [info@imposium.com](mailto:info@imposium.com).

For suggestions or issues with the library please defer to our [GitHub issues page](https://github.com/NickelMedia/Imposium-JS-SDK/issues). If you are opening an issue related to a bug please include steps on how to reproduce the issue as well as an error log in your description.

#### Install

`npm i imposium-js-sdk -s`

#### Importing the library

```javascript
// ES6 / TypeScript 
import * as Imposium from 'imposium-js-sdk';

// commonJS
var Imposium = require('imposium-js-sdk');

// Include
<script type="text/javascript" src="../lib/imposium.min.js"></script>
```

#### Basic usage

```html
<!doctype html>

<html>
    <head>
        <meta charset="utf-8">
        <title>My Imposium App</title>
    </head>

    <body>
        <video id="my-video-element"></video>

        <script type="text/javascript" src="imposium.min.js"></script>
        <script type="text/javascript" src="my-app.js"></script>
    </body>
</html>
```

```javascript
// Reference to HTML5 video element
var htmlVideoElement = document.getElementById('my-video-element');

// Pass in access credential and story identifier to Imposium.client
var client = new Imposium.Client({
    accessToken: 'ieThohr0Jahyui9pohKookahkueZeizu',
    storyId: '2f34153d-4b54-4d14-9c08-37a94205bc3f'
});

// Bind video element and client to video player
var player = new Imposium.Player(htmlVideoElement, client);

// Dynamic data for an experience
var dynamicData = {
    randomNumber: Math.random()
};

// Create new experience
client.createExperience(dynamicData);
```