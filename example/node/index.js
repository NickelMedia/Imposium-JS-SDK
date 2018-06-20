const fs = require('fs');
const path = require('path');
const Imposium = require('../../lib/imposium.min.js');

const YELLOW = "\x1b[33m",
	    CYAN = "\x1b[36m",
	     RED = "\x1b[31m",
	   RESET = "\x1b[0m";

const STORY_ID = '295a80d0-871c-4def-a579-8a375d6942fc',
	  SCENE_ID = 'f7a20d1f-96f2-4672-a7e3-3891b4a8ed25',
        ACT_ID = '11a8e3b8-d3c4-4232-80a7-e757fb18fa57',
    ACCESS_KEY = 'zooch5ja8fiejoojoo6AeQuahmex1wes';

const client = new Imposium.ImposiumClient(ACCESS_KEY);

const gotMessage = (data) => {
	const {msg} = data;
	console.log(`\n${YELLOW}Got message:${RESET} ${msg}`);
}

const gotScene = (data) => {
	console.log(`\n${CYAN}Got scene:${RESET}\n${JSON.stringify(data, null, 2)}`);
}

const onError = (error) => {
	console.log(`\n${RED}Got error:${RESET}\n${error}\n\n${RED}Exiting (1)...${RESET}`);
	process.exit(1);
}

const main = () => {
	client.on(Imposium.Events.GOT_MESSAGE, gotMessage);
	client.on(Imposium.Events.GOT_SCENE, gotScene);
	client.on(Imposium.Events.ERROR, onError);

	const inventory = {
		'text': 'Imposium && NodeJS',
		'some_bad_prop': false,
		'image': fs.createReadStream(__dirname + '/test.jpg'),
		'callback_url': undefined
	};

	console.log(`${YELLOW}Generating your Imposium experience...${RESET}`);

	client.renderVideo(STORY_ID, SCENE_ID, ACT_ID, inventory);
}

main();