const fs = require('fs');
const path = require('path');
const Imposium = require('../../lib/imposium.min.js');

const YELLOW = "\x1b[33m",
	    CYAN = "\x1b[36m",
	     RED = "\x1b[31m",
	   RESET = "\x1b[0m";

const config = {
   accessToken : 'eey6AhJei9tohsoitueQua6MoneYaiqu',
   storyId     : '6072569c-d4e7-43d8-ec7d-ec336ed8d6a8',
   environment : 'staging'
};

const imposium = new Imposium.ImposiumClient(config);

const statusUpdate = (data) => {
	console.log(`${YELLOW}Got message:${RESET} ${data.status || data.msg}`);
}

const experienceCreated = (data) => {
	console.log(`\n${CYAN}Experience Created!${RESET}\n`);
}

const gotExperience = (data) => {
	const prettyData = JSON.stringify(data, null, 2);
	console.log(`\n${CYAN}Got scene:${RESET}\n${prettyData}\n\n${YELLOW}Test complete! Exiting (0)...${RESET}`);
}

const onError = (error) => {
	console.error(`\n${RED}Something went wrong:${RESET}\n`, error);
	process.exit(1);
}

const doRender = () => {
	imposium.createExperience();
}

const bindEvents = () => {
	const {STATUS_UPDATE, EXPERIENCE_CREATED, GOT_EXPERIENCE, ERROR} = imposium.events;

	imposium.on(STATUS_UPDATE, statusUpdate);
	imposium.on(EXPERIENCE_CREATED, experienceCreated);
	imposium.on(GOT_EXPERIENCE, gotExperience);
	imposium.on(ERROR, onError);
}

const main = () => {
	console.log(`${YELLOW}Thanks for using Imposium!${RESET}`);

	bindEvents();
	doRender();
}

main();