const { join } = require('path')
const allure = require('allure-commandline')
const video = require('wdio-video-reporter')

exports.config = {
    user: 'oauth-carollyne.guim-53577',
    key: '1ab06b5f-7a61-4865-b740-ba9175a2aac0',
    hostname: 'ondemand.us-west-1.saucelabs.com',
    port: 443,
    baseUrl: 'wd/hub',

    specs: [
        './test/specs/**/*.spec.js'
    ],
    framework: 'mocha',
    capabilities: [
        {
            platformName: 'Android',
            'appium:app': 'storage:filename=loja-ebac.apk', // The filename of the mobile app
            'appium:deviceName': 'Samsung.*',
            'appium:platformVersion': '10',
            'appium:automationName': 'UiAutomator2',
            "appium:disableIdLocatorAutoconpletion": true,
            'sauce:options': {
               build: 'appium-build-teste-ebacshop',
               name: 'EBAC Shop Test',
               deviceOrientation: 'PORTRAIT',
               appiumVersion: "2.0.0"
             },
        }
        
    ],
    waitForTimeout: 30000,
    mochaOpts: {
        timeout: 600000
    },
    reporters: ['spec',
        ['video', {
            saveAllVideos: true,       // If true, also saves videos for successful test cases
            videoSlowdownMultiplier: 3, // Higher to get slower videos, lower for faster videos [Value 1-100]
          }],
        ['allure', {
            outputDir: './_results_/allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: true,
        }],
    ],
    onComplete: function() {
        const reportError = new Error('Could not generate Allure report')
        const generation = allure(['generate', 'allure-results', '--clean'])
        return new Promise((resolve, reject) => {
            const generationTimeout = setTimeout(
                () => reject(reportError),
                5000)

            generation.on('exit', function(exitCode) {
                clearTimeout(generationTimeout)

                if (exitCode !== 0) {
                    return reject(reportError)
                }

                console.log('Allure report successfully generated')
                resolve()
            })
        })
    },
    afterTest: async function(test, context, { error, result, duration, passed, retries }) {
        await driver.takeScreenshot()
    }
}