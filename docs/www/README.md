#### Features

- Lightweight at 170kb
- Easy to set up with a few lines of code
- Integrates with a wide range of javascript build environments and frameworks
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
