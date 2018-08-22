const fs        = require('fs');
const assert    = require('assert');
const parallel  = require('mocha.parallel');
const platforms = require('./platforms.json');
const webdriver = require('selenium-webdriver');
const remote    = require('selenium-webdriver/remote');

const base = 'http://patrickchisholm1.browserstack.com/examples/web/basic-deeplink.html';
const hash = '#e8bb7871-3c60-4af5-9666-ca7d328da4c8';

// Existing experience test props
const srcLengthExpected = 145;
const existingTimeout = 5000;

// New experience test props
const caption         = 'This is a test.';
const imgPath         = `${process.cwd()}/tests/test.jpg`;
const captionExpected = 'Video ready for viewing.';
const freshTimeout    = 50000;

// Base capability that all Browserstack test specs need to share
const baseCapability = {
    'browserstack.user': 'stub',
    'browserstack.key': 'stub',
    'browserstack.localIdentifier': 'sdktest',
    'browserstack.local': 'true'
};

// Merge up all the platform objs with a copy of the 
const capabilities = platforms.map((platform) => {
    return {...baseCapability, ...platform};
});

// Exit with or without an error 
const doQuit = (driver, cb, e = null) => {
    driver.quit()
    .then(() => {
        cb(e);
    });
}

// Do remote tests in parallel
parallel('Deeplink Suite', () => {
    capabilities.forEach((capability, i) => {
        const {browserName} = capability;

        // Get an existing experience on the remote via deeplink example
        it(`${browserName} - Existing experience should load.`, (done) => {
            const driver = new webdriver.Builder()
                .usingServer('http://hub-cloud.browserstack.com/wd/hub')
                .withCapabilities(capability)
                .build();

            // This will allow the driver to use local image files for uploading
            driver.setFileDetector(new remote.FileDetector);
            
            driver.get(`${base}${hash}`)
            .then(() => {
                driver.wait(() => {
                    return new Promise((resolve, reject) => {
                        driver.findElement(webdriver.By.id('dynamic-video'))
                        .then((player) => {
                            player.getAttribute('src')
                            .then((src) => {
                                resolve(src.length === srcLengthExpected);
                            });
                        });
                    });
                }, existingTimeout)
                .then((v) => {
                    doQuit(driver, done);
                })
                .catch((e) => {
                    doQuit(driver, done, e);
                });
            });
        });

        // Run experience generation test on remote via deeplink example
        it(`${browserName} - New experience should be generated.`, (done) => {
            const driver = new webdriver.Builder()
                .usingServer('http://hub-cloud.browserstack.com/wd/hub')
                .withCapabilities(capability)
                .build();

            // This will allow the driver to use local image files for testing
            driver.setFileDetector(new remote.FileDetector);

            driver.get(base)
            .then(() => {
                driver.findElement(webdriver.By.id('caption')).sendKeys(caption)
                .then(() => {
                    driver.findElement(webdriver.By.id('image')).sendKeys(imgPath)
                    .then(() => {
                        driver.findElement(webdriver.By.id('btn-submit')).click()
                        .then(() => {
                            driver.wait(() => {
                                return new Promise((resolve, reject) => {
                                    driver.findElement(webdriver.By.id('status'))
                                    .then((statusElement) => {
                                        statusElement.getText()
                                        .then((strippedText) => {
                                            resolve(strippedText === captionExpected);
                                        });
                                    });
                                });
                            }, freshTimeout)
                            .then((v) => {
                                doQuit(driver, done);
                            })
                            .catch((e) => {
                                doQuit(driver, done, e);
                            }); 
                        });
                    });
                });
            });
        });
    });
});