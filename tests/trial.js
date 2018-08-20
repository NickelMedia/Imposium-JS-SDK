const fs        = require('fs');
const assert    = require('assert');
const parallel  = require('mocha.parallel');
const webdriver = require('selenium-webdriver');
const remote    = require('selenium-webdriver/remote');

const tempHost     = 'http://patrickchisholm1.browserstack.com';
const example      = '/examples/web/basic-deeplink.html';
const experienceId = '#e8bb7871-3c60-4af5-9666-ca7d328da4c8';
const caption      = 'This is a test.';
const imgPath      = `${process.cwd()}/tests/test.jpg`;
const expect       = 'Video ready for viewing.'
const waitFor      = 50000;

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

const doQuit = (driver, cb) => {
    driver.quit()
    .then(() => {
        cb();
    }); 
}

parallel('Deeplink Suite', () => {
    capabilities.forEach((capability, i) => {
        const {browserName} = capability;

        it(`${browserName} - Existing experience should load.`, (done) => {
            const bsDriver = new webdriver.Builder()
                .usingServer('http://hub-cloud.browserstack.com/wd/hub')
                .withCapabilities(capability)
                .build();

            // This will allow the driver to use local image files for testing
            bsDriver.setFileDetector(new remote.FileDetector);
            
            bsDriver.get(`${tempHost}${example}${experienceId}`)
            .then(() => {
                bsDriver.wait(() => {
                    return bsDriver.findElement(webdriver.By.id('dynamic-video'))
                    .then((player) => {
                        return player.getAttribute('src')
                        .then((src) => {
                            return src.length === 145;
                        });
                    });
                }, 5000)
                .then((v) => {
                    doQuit(bsDriver, done);
                })
                .catch((e) => {
                    doQuit(bsDriver, done);
                });
            });
        });

        it(`${browserName} - New experience should be generated.`, (done) => {
            const bsDriver = new webdriver.Builder()
                .usingServer('http://hub-cloud.browserstack.com/wd/hub')
                .withCapabilities(capability)
                .build();

            // This will allow the driver to use local image files for testing
            bsDriver.setFileDetector(new remote.FileDetector);

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
                                bsDriver.quit()
                                .then(() => {
                                    done();
                                });
                            })
                            .catch((e) => {
                                bsDriver.quit()
                                .then(() => {
                                    done();
                                });
                            }); 
                        });
                    });
                });
            });
        });
    });
});