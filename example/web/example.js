var statusField  = document.getElementById('status'),
	captionInput = document.getElementById('caption'),
	imageInput   = document.getElementById('image'),
	submitBtn    = document.getElementById('submit-btn'),
	videoPlayer  = document.getElementById('dynamicVideo');

var config = {
    accessToken : 'eey6AhJei9tohsoitueQua6MoneYaiqu',
    storyId     : '6072569c-d4e7-43d8-ec7d-ec336ed8d6a8',
    actId       : 'ded03f40-ca60-4af5-8db8-8e8166994c02',
    sceneId     : 'e20f49c3-e036-42b1-8661-8a4e1a43892c',
    environment : 'staging'
};

var imposium = new Imposium.ImposiumClient(config);
var player = new Imposium.ImposiumPlayer(videoPlayer, imposium);

// Executes when a status message is delivered via web socket
imposium.on(imposium.events.STATUS_UPDATE, function(data) {
	setStatus(data.status, 'steelblue');
});

// Executes when a fresh experience was created 
imposium.on(imposium.events.EXPERIENCE_CREATED, function(data) {
    setStatus('Experience created', 'green');
    window.location.hash = '#' + data.id;
});

// Executes when experience data is received
imposium.on(imposium.events.GOT_EXPERIENCE, function(data) {
	setStatus('Got Scene', 'green');
});

// Executes when errors occur
imposium.on(imposium.events.ERROR, function(err) {
	setStatus('An error occured, please check console.', 'red');
});

// Click handler for the form button, creates a new Imposium experience
function createExperience() {
    if (!captionInput.value || imageInput.files.length < 1) {
        setStatus('Please finish filling in the form.', 'red');
    } else {
        var inventory = {
            text         : captionInput.value,
            image        : imageInput,
            callback_url : ''
        };
        
        setStatus('Creating Experience...', 'steelblue');
        imposium.createExperience({});
    }
}

// Helper that updates statusField div with incoming messages
function setStatus(status, color) {
	this.statusField.innerHTML = status;
	this.statusField.style.color = color;
}

// If there is a deeplink to an experience, connect to that experience
if (window.location.hash !== '') {
    var expId = window.location.hash.replace('#', '');

    if (expId) {
        imposium.getExperience(expId);
    }                   
}

// Bind the click event to the generate button
submitBtn.addEventListener('click', createExperience);