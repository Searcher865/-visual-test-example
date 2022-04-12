require("ts-node").register({ files: true });
const { join } = require('path');
const allure = require('allure-commandline')
const fs = require('fs').promises;
const path = require('path');
const allureReporter = require('@wdio/allure-reporter').default
const uniqid = require('uniqid');
const expectChai = require('chai').expect;

exports.config = {

    runner: 'local',

    maxInstances: 10,
    
    capabilities: [
       
        {
            browserName: 'chrome',
            'goog:chromeOptions': {
            args: ['--window-size=1920,1080']},
            specs: [
                './test/specs/visual/desktop/**/**.ts'  
            ]
        },
        {
            maxInstances: 5,
            browserName: 'chrome',
            "goog:chromeOptions": {
                "mobileEmulation": {
                    deviceMetrics:{
                    "width": 768,
                    "height": 1024,
                    "pixelRatio": 3.0}  
                    },
            },
            specs: [
                './test/specs/visual/touch/**/**.ts'  
            ]
        },
        {
            browserName: 'chrome',
            "goog:chromeOptions": {
                "mobileEmulation": {
                    deviceMetrics:{
                    "width": 375,
                    "height": 667,
                    "pixelRatio": 2.0}  
                    },
            },
            specs: [
                './test/specs/visual/touch/**/**.ts'  
            ]
        }
    ],

    logLevel: 'info',
    bail: 0,
    baseUrl: "https://bgb.tw1.ru/",
    waitforTimeout: 5000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: [
        ['chromedriver'],
        ['devtools'],
        ['image-comparison', 
        {
            baselineFolder: join(process.cwd(), './test/visual test/baseline/'),
            formatImageName: '{tag}-{logName}-{width}x{height}',
            screenshotPath: join(process.cwd(), './test/visual test/chekc/'),
            savePerInstance: true,
            autoSaveBaseline: true,
            blockOutStatusBar: true,
            blockOutToolBar: true,
            clearRuntimeFolder: true,
            returnAllCompareData: true,
        }],
    ],
    
    framework: 'mocha',
    reporters:
    ['spec',
    ['allure', {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: true,
    }]
    ],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000,
        // retries: 2
    },
    //
    // =====
    // Hooks
    // =====
    // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
    // it and to build services around it. You can either apply a single function or an array of
    // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
    // resolved to continue.
    /**
     * Gets executed once before all workers get launched.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     */
    // onPrepare: async function (config, capabilities) {

    // },
    // onPrepare: function (config, capabilities) {

    //     reportAggregator = new ReportAggregator({
    //         outputDir: './reports/html-reports/',
    //         filename: 'master-report.html',
    //         reportTitle: 'Master Report',
    //         browserName : capabilities.browserName,
    //         collapseTests: true
    //       });
    //     reportAggregator.clean() ;
    // },
    /**
     * Gets executed before a worker process is spawned and can be used to initialise specific service
     * for that worker as well as modify runtime environments in an async fashion.
     * @param  {String} cid      capability id (e.g 0-0)
     * @param  {[type]} caps     object containing capabilities for session that will be spawn in the worker
     * @param  {[type]} specs    specs to be run in the worker process
     * @param  {[type]} args     object that will be merged with the main configuration once worker is initialised
     * @param  {[type]} execArgv list of string arguments passed to the worker process
     */
    // onWorkerStart: async function (cid, caps, specs, args, execArgv) {
    // },
    /**
     * Gets executed just before initialising the webdriver session and test framework. It allows you
     * to manipulate configurations depending on the capability or spec.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
    // beforeSession: function (config, capabilities, specs) {
    // },
    /**
     * Gets executed before test execution begins. At this point you can access to all global
     * variables like `browser`. It is the perfect place to define custom commands.
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs        List of spec file paths that are to be run
     * @param {Object}         browser      instance of created browser/device session
     */
    before: async function (capabilities, specs) {
        await browser.addCommand('distanceDown', async function (oneElement, twoElement, expect, difference, message) {

            const heightOne = await oneElement.getSize('height')
            const locationYOne = await oneElement.getLocation('y') + heightOne
            const locationYTwo = await twoElement.getLocation('y');

            const viewPort = await browser.execute(function() {
                return window.innerHeight
            })
            const locationYforScreenshot = locationYTwo - (viewPort/2)
            await browser.execute(function(locationYforScreenshot) {
                return window.scrollTo(0, locationYforScreenshot);
            }, locationYforScreenshot)

            const distance =  Math.trunc(locationYTwo - locationYOne)
            await expectChai(distance).to.be.closeTo(expect, difference, message);
        })
        await browser.addCommand('distanceRight', async function (oneElement, twoElement, expect, difference, message) {
            const widthOne = await oneElement.getSize('width')
            const locationYOne = await oneElement.getLocation('x') + widthOne
            const locationYTwo = await twoElement.getLocation('x');
            const distance =  Math.trunc(locationYTwo - locationYOne)
            await expectChai(distance).to.be.closeTo(expect, difference, message);
        })
        await browser.addCommand('visualCheck', async function (checkResult, expect, difference, message ) {
            browser.finishedVisualCheck = true
            browser.foldersScreenshot = await checkResult.folders
            await expectChai(checkResult.misMatchPercentage).to.be.closeTo(expect, difference, message);
            browser.finishedVisualCheck = false
        })
        await browser.addCommand('visualCheckBlock', async function (arrayObject, checkElement, path) {
            delete (arrayObject[checkElement])
            const array = await Object.values(await arrayObject);
            browser.finishedVisualCheck = true
            const checkResult = await browser.checkFullPageScreen( `${path}${checkElement}/${checkElement}`, {removeElements:array})
            browser.foldersScreenshot = await checkResult.folders
            await expectChai(checkResult.misMatchPercentage).to.be.closeTo(0, 0);
            browser.finishedVisualCheck = false
        })
        await browser.addCommand('visualCheckHeader', async function (arrayObject, checkElement, path) {
            delete (arrayObject[checkElement])
            const array = await Object.values(await arrayObject);
            browser.finishedVisualCheck = true
            let checkResult = await browser.checkFullPageScreen( `${path}${checkElement}/${checkElement}`, {hideElements:array})
            browser.foldersScreenshot = await checkResult.folders
            await expectChai(checkResult.misMatchPercentage).to.be.closeTo(0, 0);
            browser.finishedVisualCheck = false
        })
       
    },
    /**
     * Runs before a WebdriverIO command gets executed.
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     */
    // beforeCommand: function (commandName, args) {
    // },
    /**
     * Hook that gets executed before the suite starts
     * @param {Object} suite suite details
     */
    // beforeSuite: function (suite) {
    // },
    /**
     * Function to be executed before a test (in Mocha/Jasmine) starts.
     */
    beforeTest: async function (test, context) {
        browser.finishedVisualCheck = false

        const Height = await browser.execute(function() {
            return window.innerHeight
        })
        const Width = await browser.execute(function() {
            return window.innerWidth
        })
        await allureReporter.addArgument('Высота:', Height)
        await allureReporter.addArgument('Ширина:', Width)

    },
    /**
     * Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
     * beforeEach in Mocha)
     */
    // beforeHook: function (test, context) {
    // },
    /**
     * Hook that gets executed _after_ a hook within the suite starts (e.g. runs after calling
     * afterEach in Mocha)
     */
    // afterHook: function (test, context, { error, result, duration, passed, retries }) {
    // },
    /**
     * Function to be executed after a test (in Mocha/Jasmine).
     */
    afterTest: async function (test, context, result) {
        if (!result.passed && await browser.finishedVisualCheck === true) {
            await allureReporter.addAttachment("Фактический результат", await(await fs).readFile(await browser.foldersScreenshot.actual), "image/png") 
            await allureReporter.addAttachment("Ожидаемый результат", await(await fs).readFile(await browser.foldersScreenshot.baseline), "image/png") 
            await allureReporter.addAttachment("Фактический результат с разницей", await(await fs).readFile(await browser.foldersScreenshot.diff), "image/png") 
            await allureReporter.addAttachment("Директория эталонного скриншота", await browser.foldersScreenshot.baseline) 
            const url = await browser.getUrl()
            await allureReporter.addArgument('URL:', url)
        } else if (!result.passed) {
            const id = await uniqid()
            const path = './temp/screenshot'+id+'.png'
            await browser.saveScreenshot(path);
            await allureReporter.addAttachment("Фактический результат", await(await fs).readFile(path), "image/png")
            const url = await browser.getUrl()
            await allureReporter.addArgument('URL:', url)  
            await(await fs).unlink(path)
        }
    },


    /**
     * Hook that gets executed after the suite has ended
     * @param {Object} suite suite details
     */
    // afterSuite: function (suite) {
    // },
    /**
     * Runs after a WebdriverIO command gets executed
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     * @param {Number} result 0 - command success, 1 - command error
     * @param {Object} error error object if any
     */
    // afterCommand: function (commandName, args, result, error) {
    // },
    /**
     * Gets executed after all tests are done. You still have access to all global variables from
     * the test.
     * @param {Number} result 0 - test pass, 1 - test fail
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // after: function (result, capabilities, specs) {
    // },
    /**
     * Gets executed right after terminating the webdriver session.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // afterSession: function (config, capabilities, specs) {
    // },
    /**
     * Gets executed after all workers got shut down and the process is about to exit. An error
     * thrown in the onComplete hook will result in the test run failing.
     * @param {Object} exitCode 0 - success, 1 - fail
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {<Object>} results object containing test results
     */

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
    // onComplete: function(exitCode, config, capabilities, results) {
    //     (async () => {
    //         await reportAggregator.createReport();
    //     })();
    // }
    //  onComplete: function (exitCode, config, capabilities, results) {
    //     const mergeResults = require('wdio-mochawesome-reporter/mergeResults')
    //     mergeResults('./Results', "results-*")
    //   },
    /**
    * Gets executed when a refresh happens.
    * @param {String} oldSessionId session ID of the old session
    * @param {String} newSessionId session ID of the new session
    */
    //onReload: function(oldSessionId, newSessionId) {
    //}
}
