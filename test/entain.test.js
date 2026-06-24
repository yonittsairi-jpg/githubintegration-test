const { test } = require("@playwright/test");
const { Eyes, VisualGridRunner, Configuration, BrowserType, IosDeviceName, DeviceName, ScreenOrientation } = require("@applitools/eyes-playwright");

// 1. Initialize Runner and Batch OUTSIDE the test to ensure a single batch
const runner = new VisualGridRunner({ testConcurrency: 5 });
const configuration = new Configuration();

// Use a HARDCODED ID to force different project runs into the same batch
configuration.setBatch({ name: 'Device Compatibility Check', id: 'MONIKA_SYNC_BATCH_1' });
configuration.setAppName('ENTAIN');
configuration.setApiKey(process.env.APPLITOOLS_API_KEY);

test("playwright-entain-ufg", async ({ page }, testInfo) => {
    const eyes = new Eyes(runner);

    if (testInfo.project.name === 'iOS-Safari') {
        configuration.setBrowsersInfo([
            { iosDeviceInfo: { deviceName: IosDeviceName.iPhone_15, screenOrientation: ScreenOrientation.PORTRAIT } },
            { iosDeviceInfo: { deviceName: IosDeviceName.iPhone_15_Pro, screenOrientation: ScreenOrientation.PORTRAIT } }
        ]);
    }
    if (testInfo.project.name === 'Chrome-Mobile') {
        // This uses Chrome Emulation (The "clean" version)
        configuration.setBrowsersInfo([
            { chromeEmulationInfo: { deviceName: DeviceName.iPhone_15_Pro
                    , screenOrientation: ScreenOrientation.PORTRAIT }


            }

        ]);

    }

    eyes.setConfiguration(configuration);

    await eyes.open(page, 'monika', 'monika Test_2');
    await page.goto("https://www.ynet.co.il");
    await eyes.check("Main Page");

    await eyes.closeAsync();
});

test.afterAll(async () => {
    await runner.getAllTestResults(false);
});