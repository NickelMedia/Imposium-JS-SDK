const fs        = require('fs');
const assert    = require('assert');
const webdriver = require('selenium-webdriver');
const remote    = require('selenium-webdriver/remote');

const tempHost = 'http://patrickchisholm1.browserstack.com';
const example  = '/examples/web/basic-deeplink.html';
const caption  = 'This is a test.';
const imgPath  = `${process.cwd()}/test.jpg`;
const expect   = 'Video ready for viewing.'
const waitFor  = 40000;

const {findElement, wait} = bsDriver;
const {By: {id}} = webdriver;

/*
    Runs via selenium wait call (setInterval), strips the Imposium status message from DOM to validate if 
    
 */
const stripStatus = (cb) => {
    return findElement(id('status'))
    .then((e) => {
        e.getText()
        .then((t) => {
            try {
                assert.equal(t, expect);
                done();
            } catch(e) {

            }
        });
    });
}

describe('deeplink', () => {
    let driver;

    before(() => {
        /*
            TO DO: Put this into a conf file and add a helper function to make this easily configurable
            for parallel testing 
         */
        const capabilities = {
            'browserName': 'Chrome',
            'browser_version': '68.0',
            'os': 'OS X',
            'os_version': 'High Sierra',
            'resolution': '1024x768',
            'browserstack.user': 'patrickchisholm1',
            'browserstack.key': 'kqExpNPZDere7GszwkgL',
            'browserstack.local': 'true',
            'browserstack.localIdentifier': 'sdktest'
        };

        // Bind selenium driver with BS config
        bsDriver = new webdriver.Builder()
            .usingServer('http://hub-cloud.browserstack.com/wd/hub')
            .withCapabilities(capabilities)
            .build();

        // This will allow the driver to use local image files for testing
        bsDriver.setFileDetector(new remote.FileDetector);
    });

    // TO DO: Make this more descriptive once functionality is locked
    it('experience should load', (done) => {
        bsDriver.get(`${tempHost}${example}`)
        .then(() => {
            Promise.all([
                findElement(id('caption')).sendKeys(caption),
                findElement(id('image')).sendKeys(imgPath)
            ]).then(() => {
                findElement(id('btn-submit')).click()
                .then(() => {
                    wait(stripStatus, waitFor);
                });
            });
        });
    });

    after((done) => {
        bsDriver.quit()
        .then(() => {
            done();
        });
    });
});

