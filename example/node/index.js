const fs = require('fs');
const path = require('path');
const Imposium = require('../../lib/imposium.js');

const STORY_ID    = '295a80d0-871c-4def-a579-8a375d6942fc',
	SCENE_ID      = 'f7a20d1f-96f2-4672-a7e3-3891b4a8ed25',
    ACT_ID        = '11a8e3b8-d3c4-4232-80a7-e757fb18fa57',
    ACCESS_KEY    = 'zooch5ja8fiejoojoo6AeQuahmex1wes';

const client = new Imposium.ImposiumClient(ACCESS_KEY);

client.on(Imposium.Events.GOT_MESSAGE, (data) => {
	const {msg} = data;
	console.log(`\nGot message: ${msg}`);
});

client.on(Imposium.Events.GOT_SCENE, (data) => {
	console.log(`\nGot scene:\n${JSON.stringify(data, null, 2)}`);
});

console.log('Generating your Imposium experience...!');

const imgBuffer = fs.createReadStream(__dirname + '/test.jpg');

const inventory = {
	'text': 'Imposium && NodeJS',
	'image': imgBuffer,
	'callback_url': undefined
};

client.renderVideo(STORY_ID, SCENE_ID, ACT_ID, inventory);