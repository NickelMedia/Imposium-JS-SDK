var STORY_ID    = '295a80d0-871c-4def-a579-8a375d6942fc',
	SCENE_ID    = 'f7a20d1f-96f2-4672-a7e3-3891b4a8ed25',
    ACT_ID      = '295a80d0-871c-4def-a579-8a375d6942fc',
    ACCESS_KEY  = 'zooch5ja8fiejoojoo6AeQuahmex1wes',
    TRACKING_ID = 'UA-113079866-1';

var statusField  = document.getElementById('status'),
	captionInput = document.getElementById('caption'),
	imageInput   = document.getElementById('image'),
	submitBtn    = document.getElementById('submit-btn'),
	videoPlayer  = document.getElementById('dynamicVideo');

var imposium = new Imposium.ImposiumClient(ACCESS_KEY);

imposium.on(Imposium.Events.GOT_MESSAGE, function(data) {
	setStatus(data.msg, 'steelblue');
});

imposium.on(Imposium.Events.GOT_SCENE, function(data) {
	setStatus('Got Scene', 'green');
	window.location.hash = '#' + data.experience_id;
	videoPlayer.src = data.mp4Url;
});

imposium.on(Imposium.Events.GOT_EXPERIENCE, function(data) {
	setStatus('Got Scene', 'green');
	videoPlayer.src = data.experience.video_url_mp4_720;
});

imposium.on(Imposium.Events.ERROR, function(err) {
	setStatus('Something went wrong processing your experience.', 'red');
});

// Creates an experience on Imposium, passing in the caption and/or image 
function createExperience() {
    // here you can specify a callback URL to hit once the video has rendered
    var inventory = {
        text         : captionInput.value,
        image        : imageInput,
        callback_url : ''
    };
    
    imposium.renderVideo(
        STORY_ID, 
        SCENE_ID,
        ACT_ID,
        inventory
    );

    setStatus('Creating Experience', 'steelblue');
}

// Helper that updates statusField div with incoming messages
function setStatus(status, color) {
	this.statusField.innerHTML = status;
	this.statusField.style.color = color;
}

// Bind the click event to the generate button
submitBtn.addEventListener('click', createExperience);

//If there is a deeplink to an experience, connect to that experience
if (window.location.hash !== '') {
    var expId = window.location.hash.replace('#', '');

    if (expId) {
        var job = {
        	sceneId : SCENE_ID, 
        	actId   : ACT_ID,
        	expId   : expId
        };

        imposium.getExperience(expId);
    }                   
}
