const fs = require('fs');
const Imposium = require('../../lib/imposium.js');

const [y, c, r, re] = ['\x1b[33m', '\x1b[36m', '\x1b[31m', '\x1b[0m'];

const client = new Imposium.Client({
   accessToken: 'zooch5ja8fiejoojoo6AeQuahmex1wes',
   storyId: '295a80d0-871c-4def-a579-8a375d6942fc'
});

const statusUpdate = (data) => {
    console.log(`${y}Got message:${re} ${data.status}`);
};

const gotExperience = (experience) => {
    const experiencePretty = JSON.stringify(experience, null, 4);
    console.log(`${c}Got experience:${re}\n${experiencePretty}`);
};

const onError = (error) => {
    console.error(`${r}Something went wrong:${re}`, error);
    process.exit(1);
};

const doRender = () => {
    const inventory = {
        'text': 'test',
        'image': fs.createReadStream(`${__dirname}/test.jpg`),
        'callback_url': ''
    };

    client.createExperience(inventory);
};

const bindEvents = () => {
    const {STATUS_UPDATE, GOT_EXPERIENCE, ERROR} = Imposium.Events;

    client.on(STATUS_UPDATE, statusUpdate);
    client.on(GOT_EXPERIENCE, gotExperience);
    client.on(ERROR, onError);
};

const main = () => {
    console.log(`${y}Starting processing... Thanks for using Imposium!${re}`);

    bindEvents();
    doRender();
};

main();
