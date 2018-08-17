const fs        = require('fs');
const assert    = require('assert');
const parallel  = require('mocha.parallel');
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

/*
`   Returns a new browserstack driver instance (per browser spec)
 */
const getBsDriver = (capabilities) => {
    let bsDriver = new webdriver.Builder()
        .usingServer('http://hub-cloud.browserstack.com/wd/hub')
        .withCapabilities(capabilities)
        .build();

    // This will allow the driver to use local image files for testing
    bsDriver.setFileDetector(new remote.FileDetector);

    return bsDriver;
}

parallel('Deeplink Test Suite', () => {
    capabilities.forEach((c) => {
        it('Experience should be generated', (done) => {
            const bsDriver = getBsDriver(c);
            const {findElement, wait} = bsDriver;

            bsDriver.get(`${tempHost}${example}`)
            .then(() => {
                Promise.all([
                    bsDriver.findElement(webdriver.By.id('caption')).sendKeys(caption),
                    bsDriver.findElement(webdriver.By.id('image')).sendKeys(imgPath)
                ]).then(() => {
                    bsDriver.findElement(webdriver.By.id('btn-submit')).click()
                    .then(() => {
                        wait(
                            () => {
                                return bsDriver.findElement(webdriver.By.id('status'))
                                .then((e) => {
                                    e.getText()
                                    .then((t) => {
                                        try {
                                            assert.equal(t, expect);

                                            bsDriver.quit(() => {
                                                done();
                                            });
                                        } catch(e) {

                                        }
                                    });
                                });
                            },
                            waitFor
                        );
                    });
                });
            });
        });
    });
});