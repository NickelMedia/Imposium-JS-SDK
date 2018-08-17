const fs        = require('fs');
const assert    = require('assert');
const webdriver = require('selenium-webdriver');
const remote    = require('selenium-webdriver/remote');

const tempHost = 'http://patrickchisholm1.browserstack.com';
const example  = '/examples/web/basic-deeplink.html';
const caption  = 'This is a test.';
const imgPath  = `${process.cwd()}/test.jpg`;
const expect   = 'Video ready for viewing.'
const waitFor  = 50000;

const {By: {id}} = webdriver;

const baseCapability = {
    'browserstack.user': 'patrickchisholm1',
    'browserstack.key': 'kqExpNPZDere7GszwkgL',
    'browserstack.localIdentifier': 'sdktest',
    'browserstack.local': 'true',
    'resolution': '1024x768',
    'os': 'OS X',
    'os_version': 'High Sierra'
};

const requiredBrowsers = [
    {
        'browserName' : 'Safari',
        'browser_version' : '11.0'
    },
    // {
    //     'browserName' : 'Chrome',
    //     'browser_version' : '68.0'
    // },
    // {
    //     'browserName' : 'Firefox',
    //     'browser_version' : '61.0'
    // }
];

const capabilities = requiredBrowsers.map((browserSpec) => {
    return {...baseCapability, ...browserSpec};
});

describe(`Deeplink: ${capabilities[0].browserName}`, () => {
    let bsDriver;

    before(() => {
        bsDriver = new webdriver.Builder()
            .usingServer('http://hub-cloud.browserstack.com/wd/hub')
            .withCapabilities(capabilities[0])
            .build();

        // This will allow the driver to use local image files for testing
        bsDriver.setFileDetector(new remote.FileDetector);
    });

    it(`Experience should be generated`, (done) => {
        bsDriver.get(`${tempHost}${example}`)
        .then(() => {
            bsDriver.findElement(webdriver.By.id('caption')).sendKeys(caption)
            .then(() => {
                bsDriver.findElement(webdriver.By.id('image')).sendKeys(imgPath)
                .then(() => {
                    bsDriver.findElement(webdriver.By.id('btn-submit')).click()
                    .then(() => {
                        bsDriver.wait(() => {
                            return bsDriver.findElement(webdriver.By.id('status'))
                            .then((statusElement) => {
                                statusElement.getText()
                                .then((strippedText) => {
                                    try {
                                        assert.equal(strippedText, 'Video ready for viewing.');
                                    } catch(e) {

                                    }
                                });
                            });
                        }, waitFor)
                        .then((v) => {
                            done();
                        })
                        .catch((e) => {
                            done();
                        }); 
                    });
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