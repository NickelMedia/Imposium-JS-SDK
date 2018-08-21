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
    'browserstack.local': 'true'
};

const platforms = [
    {
        'os': 'OS X',
        'os_version': 'High Sierra',
        'browserName' : 'Safari',
        'browser_version' : '11.0',
        'resolution': '1024x768'
    },
    {
        'os': 'OS X',
        'os_version': 'High Sierra',
        'browserName' : 'Chrome',
        'browser_version' : '68.0',
        'resolution': '1024x768'
    },
    {
        'os': 'OS X',
        'os_version': 'High Sierra',
        'browserName' : 'Firefox',
        'browser_version' : '61.0',
        'resolution': '1024x768'
    },
    {
        'os': 'Windows',
        'os_version': '10',
        'browserName' : 'IE',
        'browser_version' : '11.0',
        'resolution': '1024x768'
    },
    {
        'os': 'Windows',
        'os_version': '8',
        'browserName' : 'IE',
        'browser_version' : '10.0',
        'resolution': '1024x768'
    },
    {
        'os': 'Windows',
        'os_version': '10',
        'browserName' : 'Edge',
        'browser_version' : '17.0',
        'resolution': '1024x768'
    },
    {
        'device' : 'iPhone 8',
        'os_version' : '11.0',
        'realMobile' : 'true',
        'browserName' : 'iPhone'
    },
    {
        'device' : 'iPhone 7',
        'os_version' : '10.3',
        'realMobile' : 'true',
        'browserName' : 'iPhone'
    },
    {
        'device' : 'Google Pixel 2',
        'os_version' : '8.0',
        'realMobile' : 'true',
        'browserName' : 'android'
    },
    {
        'device' : 'Samsung Galaxy S8',
        'os_version' : '7.0',
        'realMobile' : 'true',
        'browserName' : 'android'
    },
    {
        'device' : 'Samsung Galaxy S7',
        'os_version' : '6.0',
        'realMobile' : 'true',
        'browserName' : 'android'
    },
    {
        'device' : 'Samsung Galaxy S6',
        'os_version' : '5.0',
        'realMobile' : 'true',
        'browserName' : 'android'
    },
    {
        'device' : 'Google Nexus 5',
        'os_version' : '4.4',
        'realMobile' : 'true',
        'browserName' : 'android'
    },
];

const capabilities = platforms.map((platform) => {
    return {...baseCapability, ...platform};
});

const doQuit = (driver, cb, e = null) => {
    driver.quit()
    .then(() => {
        cb(e);
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
                    return new Promise((resolve, reject) => {
                        bsDriver.findElement(webdriver.By.id('dynamic-video'))
                        .then((player) => {
                            player.getAttribute('src')
                            .then((src) => {
                                resolve(src.length === 145);
                            });
                        });
                    });
                }, 5000)
                .then((v) => {
                    doQuit(bsDriver, done);
                })
                .catch((e) => {
                    doQuit(bsDriver, done, e);
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
                            driver.wait(() => {
                                return new Promise((resolve, reject) => {
                                    driver.findElement(webdriver.By.id('status'))
                                    .then((statusElement) => {
                                        statusElement.getText()
                                        .then((strippedText) => {
                                            resolve(strippedText === expect);
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