Imposium JavaScript SDK
====================================================

# Getting started

Run the following for development: 

* `npm i`
* `webpack --watch`

# How to use the SDK

##### Initializing the SDK

In order to initialize the client & you will need the following pre-requisite variables:

1. An access token 
2. An Imposium experience id
3. An Imposium act id

Instantiate a client by passing the auth token and an optional config object as parameters to a new client as such:

`const client = new Imposium.ImposiumClient(<token>, <options>);`

The following options can be passed in to overwrite the default configuration (aside from auth, this is only really useful in dev if you're testing instances of the imposium servers outside of production).

`
{
	xhrBaseURL: 'http://api/',
	auth: '',
	stompConfig: {
		'stompEndpoint':'ws://127.0.0.1:15674/ws',
		'stompUser': 'guest',
		'stompPass': 'guest',
		'exchangeRoute': '/exchange/imposium/',
		'onMessage': undefined,
		'onError': undefined
}
`

* xhrBaseURL - location of an imposium api
* auth - options: [jwt] currently the only flag supported here is jwt, you can pass in a relevant idToken here
* stompConfig
	* stompEndpoint - location of an imposium rabbitMQ/stomp endpoint
	* stompUser - stomp username
	* stompPass - stomp password
	* exchangeRoute - the default imposium exchange route on rabbitMQ
	* onMessage - possible to pass a delegate message function here for message parsing/handling.
	* onError - possible to pass a delegate error function here for custom error handling.

##### Using the SDK

To get started, you need to make a createExperience call: `imposium.createExperience(storyId, data, render, doneCallback, errorCallback, uploadingCallback);`

The params are as follows: 

* storyId - a valid Imposium storyId
* data - {text:string, image:file, callback_url:string}
* render - boolean
* doneCallback(data), errorCallback(err), uploadingCallback(data) - callback functions (optional)

To start listening to events pass in a doneCallback that contains the following: 
`
imposium.on(Imposium.events.STATUS, onStatusUpdate, this);
imposium.startEventProcessor({
    'expId' : data.id, 
    'actId' : actId (set globally),
}, onGotScene, onEventProcessorError);
`

errorCallback will allow you to handle errors wherever you invoke the client. 
uploadingCallback will allow you to monitor the experience creation request.




