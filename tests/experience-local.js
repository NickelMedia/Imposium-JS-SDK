const fs        = require('fs');
const parallel  = require('mocha.parallel');
const webdriver = require('selenium-webdriver');
const remote    = require('selenium-webdriver/remote');

// URL data
const base = `file://${process.cwd()}/examples/web/basic-deeplink.html`;
const hash = '#e8bb7871-3c60-4af5-9666-ca7d328da4c8';

// Existing experience test props
const srcLengthExpected = 46;
const existingTimeout = 5000;

// New experience test props
const caption         = 'This is a test.';
const imgPath         = `${process.cwd()}/tests/test.jpg`;
const captionExpected = 'Video ready for viewing.';
const freshTimeout    = 50000;

// Local drivers to test with
const drivers = [
    'chrome',
    'firefox'
];

// Exit with or without an error 
const doQuit = (driver, cb, e = null) => {
    driver.quit()
    .then(() => {
        cb(e);
    });
}

// Do local tests in parallel
parallel('Experience Handling', () => {
    drivers.forEach((driverType) => {

        // Get existing experience via deeplink example
        it(`Driver: ${driverType} - Existing experience should load.`, (done) => {
            const driver = new webdriver.Builder()
                .forBrowser(driverType)
                .build();

            driver.get(`${base}${hash}`)
            .then(() => {
                driver.wait(() => {
                    return new Promise((resolve, reject) => {
                        driver.findElement(webdriver.By.id('dynamic-video'))
                        .then((videoElement) => {
                            videoElement.getAttribute('src')
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

        // Generate a new experience via deeplink example
        it(`Driver: ${driverType} - New experience should be generated.`, (done) => {
            const driver = new webdriver.Builder()
                .forBrowser(driverType)
                .build();

            // This will allow the driver to use local image files for uploading
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
