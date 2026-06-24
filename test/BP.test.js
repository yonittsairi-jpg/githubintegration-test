const { test, expect} = require("@playwright/test");
const {
    Eyes,
    Target,
    VisualGridRunner,
    Configuration,
    IosDeviceName,
    BrowserType, ClassicRunner, FileLogHandler, IosDeviceTarget, ScreenOrientationPlain, ScreenOrientation, DeviceName,
} = require("@applitools/eyes-playwright");

// 1. Initialize the Runner
const runner = new VisualGridRunner({ testConcurrency: 5 });
// const runner = new ClassicRunner();
test("playwright-bp-ufg", async ({ page }) => {
    const eyes = new Eyes(runner);
    eyes.setLogHandler(new FileLogHandler(true));
    const config = new Configuration();
    config.setAppName('bp');
    config.setTestName('bp');
    config.setBrowsersInfo([

        { iosDeviceInfo: { deviceName: IosDeviceName.iPad_Pro_12_9_inch_3, screenOrientation: ScreenOrientation.PORTRAIT }} ,
    ]);

    // config.setVisualGridOptions({ 'enableFrames': true });
    // Set API Key if not in Environment Variables
    // config.setApiKey('YOUR_API_KEY');
    eyes.setConfiguration(config);

    await eyes.open(page);

    try {
        const url="https://ufg-ssa.applitools.com/renderid/a72204d8-f9bf-4107-b31b-f5256178f78a/eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJleWVzYXBpLmFwcGxpdG9vbHMuY29tLGV5ZXNwdWJsaWN3dXNpMC5ibG9iLmNvcmUud2luZG93cy5uZXQiLCJzdWIiOiJGYUFJWEpBdUNFeVhSU2J0NHEzczlBX18iLCJpYXQiOjE3NzAxOTU2NzksImV4cCI6MTc3MDIxNzI3OSwidmdzZXJ2aWNldXJsIjoiaHR0cHM6Ly91Zmctd3VzLmFwcGxpdG9vbHMuY29tIiwicHJ2IjoiMiIsImV5ZXNhcGl1cmwiOiJodHRwczovL2V5ZXNhcGkuYXBwbGl0b29scy5jb20ifQ.l0B7MHq-FD4Lss9IrOhoj14i6F-tH7MwgyxlyBs4kWovymY6eYDJSitrsHvP7Vddtqsh8jr4DBA4WpP6irI8fYBIdnZoZEpG86tY6XyZTok-oyg1YU4uWFfGvPzmBHT459CBfYMu_SOnNFm_3thziorp_gjGyEiiR_r7KPG1Vgw_o3CGz9-VXK4N7kLyKwXI6nEb8QiqrpP_6i8BzwtNgBgY_aETS5nYk_FMqdzVq75p1laU8aDirugvKWc17z2IAP02U5DUNOXiUFpcF4NalNtJPPmLDElBWlkg7z33O48fkBHR6KXPjjOz-vZoGEqWNaE1Li7YHqMCYRtLCM_Fwg/?rg_namespace-override=c0zaicujWEWRpo5UJ7qbsg__"
        await page.goto(url)
       await eyes.check('page ',Target.window().fully(true))

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