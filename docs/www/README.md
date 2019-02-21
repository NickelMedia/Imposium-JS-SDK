#### Introduction

Imposium JS SDK is a client side library available through npm that provides tooling for working with [Imposium](https://imposium.com) technology. The library is put forward by our team as an effort to help our clients easily build their own integrations.

#### Overview 

The library consists of two main features:

[`Imposium.client`](/client) is an event based toolkit for generating and fetching Imposium generated experiences. The client offers a range of configurable events to help you set up control flows that best suit your use case. 

[`Imposium.player`](/player) is a wrapper for HTML5 Video elements designed to take care of consuming Imposium experience data and to help serve video content from our API.

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