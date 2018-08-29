#### Introduction

Imposium JS SDK is a client side library available through npm that provides tooling for working with [Imposium](https://imposium.com) and HTML5 media playback. The library is put forward by our team as an effort to help our clients easily leverage Imposium with both fresh projects and existing web applications. Whether your use case involves a complex SPA framework, a simple web page or managing data server side in NodeJS, our SDK is designed to do the heavy lifting for you. 

#### Overview 

The library consists of two main features:

[`Imposium.client`](/client) is an isomorphic, event based toolkit for generating and fetching Imposium generated experiences. The client offers a range of configurable events to help you set up control flows that best suit your use case. 

[`Imposium.player`](/player) is a toolkit designed to consume Imposium experience data with zero configuration and to serve content best suited to your users devices right out of the box. It also offers a range of events and controls for complex interface and design requirements.

#### Install

`npm i imposium-js-sdk -s`

#### Example

```javascript
// ES6 / TypeScript 
import * as Imposium from 'imposium-js-sdk';

// commonJS
var Imposium = require('imposium-js-sdk');

// Include
<script type="text/javascript" src="../lib/imposium.min.js"></script>
```