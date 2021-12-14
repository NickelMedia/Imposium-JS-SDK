#### Getting Started

This tutorial is an example of how to use user input to create a dynamic video. This can be done however you would like in your application. In this example, we'll use a form and vanilla JavaScript to keep things simple. This flow can be applied in a variety of JavaScript frameworks.

#### Adding markup to your page

We'll start out with an index.html file that contains markup for a form and video element. It also needs to have references to the Imposium JS SDK and our custom javascript. 

In this use case, we want the user to upload a caption and their profile picture to be used in a personalized video. Once the user submits the form, their video will be processed and played back once it becomes ready.


```html
<!doctype html>

<html>
    <head>
        <meta charset="utf-8">
        <title>My Imposium App</title>

        <style>
            form {
                display: flex;
                flex-direction: column;
            }

            label {
                margin-top: 10px;
            }

            input {
                width: 200px;
            }

            input[type="submit"] {
                width: 100px;
                margin-top: 15px;
            }

            video {
                margin-top: 35px;
                background-color: rgba(0, 0, 0, 0.09);
            }
        </style>
    </head>

    <body>
        <form id="form">
            <label for="caption">Enter Caption:</label>
            <input type="text" name="caption" placeholder="Enter a caption" />

            <label for="image">Upload an image:</label>
            <input type="file" name="image" accept=".jpg, .jpeg, .png" />

            <input type="submit" value="Generate Video" />
        </form>

        <video id="imposium-player"></video>

        <script type="text/javascript" src="imposium.min.js"></script>
        <script type="text/javascript" src="my-imposium-integration.js"></script>
    </body>
</html>
```

#### Building your first integration

Once you have finished writing the markup, you will need to add some glue code to handle plugging Imposium JS SDK into your page. We'll call this file `my-imposium-integration.js` as referenced in the markup above. First we'll make a reference to the form so we can add an event handler for form submits. We also need a reference to the video element shown above. 

The next step is to create a new instance of [`Imposium.client`](client.md) using a configuration provided by our team. Then we create a new instance of [`Imposium.player`](player.md) to handle playing back the video automically.

Finally we will add an event handler to the form that will generate the video by calling [`Imposium.client.renderExperience`](/client?id=renderExperience) on submit.

```javascript
// References to mark up
var form = getElementById('form');
var videoElement = getElementById('imposium-player');

// Imposium project settings
var imposiumSettings = {...};

// Create an Imposium Client and Player
var client = new Imposium.Client(imposiumSettings);
var player = new Imposium.Player(videoElement, client);

// Setup the form submit event
form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Store form input values in an object called "dynamicData"
    var captionInput = form.elements[0];
    var pictureInput = form.elements[1];

    var dynamicData = {
        caption: captionInput.value,
        profile_picture: pictureInput.files[0];
    };

    // Consumes dynamicData and begins process of listening for video data 
    client.renderExperience(dynamicData);
});
```

The above snippet will handle the end to end flow of creating a video with Imposium, including playback. When `Imposium.client.renderExperience` is called the client begins listening for processed video data. Once the data becomes available, the video player will begin streaming it.