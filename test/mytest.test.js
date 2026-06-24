const { test, expect} = require("@playwright/test");
const {
    Eyes,
    Target,
    VisualGridRunner,
    Configuration,
    IosDeviceName,
    BrowserType, ClassicRunner, FileLogHandler, IosDeviceTarget, ScreenOrientationPlain, ScreenOrientation, DeviceName,
    BrowserTypePlain,
} = require("@applitools/eyes-playwright");

// 1. Initialize the Runner
const runner = new VisualGridRunner({ testConcurrency: 5 });
// const runner = new ClassicRunner();
test("playwright-test", async ({ page }) => {
    const eyes = new Eyes(runner);
    eyes.setLogHandler(new FileLogHandler(true));
    const config = new Configuration();
    config.setAppName('mytest');
    config.setTestName('mytest');
    config.setBrowsersInfo([
        { name: 'chrome' , width: 1080, height: 1200 },
    ]);

    // config.setVisualGridOptions({ 'enableFrames': true });
    // Set API Key if not in Environment Variables
    // config.setApiKey('YOUR_API_KEY');
    eyes.setConfiguration(config);

    await eyes.open(page);

    try {
        const url="https://www.yahoo.com";
        await page.goto(url)

       await eyes.check('page ',Target.window())

        await eyes.closeAsync();
    } catch (error) {
        console.error("Test failed during execution:", error);
        await eyes.abortAsync();
        throw error;
    } finally {
        const results = await runner.getAllTestResults(false);
        console.log(results);
    }
})