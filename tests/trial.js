const assert = require('assert');
const fs = require('fs');
const webdriver = require('selenium-webdriver');
const remote = require('selenium-webdriver/remote');

describe('deeplink', () => {
    let driver, server;

    before(() => {
        var capabilities = {
            'browserName': 'Chrome',
            'browser_version': '68.0',
            'os': 'OS X',
            'os_version': 'High Sierra',
            'resolution': '1024x768',
            'browserstack.user': 'patrickchisholm1',
            'browserstack.key': 'kqExpNPZDere7GszwkgL'
        };

        driver = new webdriver.Builder()
            .usingServer('http://hub-cloud.browserstack.com/wd/hub')
            .withCapabilities(capabilities)
            .build();

        driver.setFileDetector(new remote.FileDetector);
    });

    it('experience should load', (done) => {
        driver.get('https://sdk-test.staging.k8s.nickel.media/examples/web/basic-deeplink.html')
        .then(() => {
            driver.findElement(webdriver.By.id('caption')).sendKeys('this is a test!')
            .then(() => {
                driver.findElement(webdriver.By.id('image')).sendKeys(process.cwd() + '/test.jpg')
                .then(() => {
                    driver.findElement(webdriver.By.id('btn-submit')).click()
                    .then(() => {
                        driver.wait(() => {
                            return driver.findElement(webdriver.By.id('status'))
                            .then((statusElement) => {
                                statusElement.getText()
                                .then((strippedText) => {
                                    try {
                                        assert.equal(strippedText, 'Video ready for viewing.');
                                        done();
                                    } catch(e) {

                                    }
                                });
                            });
                        }, 40000);
                    });
                });
            });
        });
    });

    after((done) => {
        driver.quit()
        .then(() => {
            done();
        });
    });
});