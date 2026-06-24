const { test } = require("@playwright/test");
const { Eyes, VisualGridRunner, Configuration, BrowserType, IosDeviceName, DeviceName, ScreenOrientation } = require("@applitools/eyes-playwright");

// 1. Initialize Runner and Batch OUTSIDE the test to ensure a single batch
const runner = new VisualGridRunner({ testConcurrency: 5 });
const configuration = new Configuration();

// Use a HARDCODED ID to force different project runs into the same batch
configuration.setBatch({ name: 'Device Compatibility Check', id: 'ENTAIN_SYNC_BATCH_1' });
configuration.setAppName('ENTAIN');
configuration.setApiKey(process.env.APPLITOOLS_API_KEY);

test("playwright-entain-ufg", async ({ page }, testInfo) => {
    const eyes = new Eyes(runner);
    configuration.setBrowsersInfo([
        // Chrome Emulation (The "Clean" baseline)
        { chromeEmulationInfo: { deviceName: DeviceName.iPhone_15_Pro, screenOrientation: ScreenOrientation.PORTRAIT }
         },

        // iOS Safari Engine (To catch the Webkit scroll bug)
        { iosDeviceInfo: { deviceName: IosDeviceName.iPhone_15, screenOrientation: ScreenOrientation.PORTRAIT }} ,
        { iosDeviceInfo: { deviceName: IosDeviceName.iPhone_15_Pro, screenOrientation: ScreenOrientation.PORTRAIT } }
    ]);

    eyes.setConfiguration(configuration);

    await eyes.open(page, 'DEVICES', 'Devices Test');
    await page.goto("https://example.com/");
    await eyes.check("Main Page");

    await eyes.closeAsync();
});

test.afterAll(async () => {
    await runner.getAllTestResults(false);
});