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
test("playwright-bp-ufg", async ({ page }) => {
    const eyes = new Eyes(runner);
    eyes.setLogHandler(new FileLogHandler(true));
    const config = new Configuration();
    config.setAppName('bp');
    config.setTestName('bp');
    config.setBrowsersInfo([
        { name: 'chrome' , width: 1080, height: 1200 },
        { iosDeviceInfo: { deviceName: IosDeviceName.iPad_Pro_12_9_inch_3, screenOrientation: ScreenOrientation.PORTRAIT }} ,
    ]);
config.setDisableBrowserFetching(true);

    // config.setVisualGridOptions({ 'enableFrames': true });
    // Set API Key if not in Environment Variables
    // config.setApiKey('YOUR_API_KEY');
    eyes.setConfiguration(config);

    await eyes.open(page);

    try {
        const url="https://ufg-ssa.applitools.com/renderid/a72204d8-f9bf-4107-b31b-f5256178f78a/eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJleWVzYXBpLmFwcGxpdG9vbHMuY29tLGV5ZXNwdWJsaWN3dXNpMC5ibG9iLmNvcmUud2luZG93cy5uZXQiLCJzdWIiOiJGYUFJWEpBdUNFeVhSU2J0NHEzczlBX18iLCJpYXQiOjE3NzIxMTUwMDQsImV4cCI6MTc3MjEzNjYwNCwidmdzZXJ2aWNldXJsIjoiaHR0cHM6Ly91Zmctd3VzLmFwcGxpdG9vbHMuY29tIiwicHJ2IjoiMiIsImV5ZXNhcGl1cmwiOiJodHRwczovL2V5ZXNhcGkuYXBwbGl0b29scy5jb20ifQ.QahRELVsVgYurSgRm21K-DCS4uBvQ-LsSTy8OFCzhcHV7QTH4dYbhMPVDZ49a9tU_9GPs2AbE_Qo3oIgT4JetVD0HK362io3xCA2VcSJsvwBWtJIxKENt542O8FqzPPLITz9Zz2c2tzadSOBefceDtmCi--x8f05ICbmdSK100gcNufyXOW33GD2VP5COsEaUGWY22MggQir9VdY22R7-24BuuSVD7pflSdFjqqWCKeXTEwOzup6KGONAnIwMuCM-fWWauUDD6dtB3uSWSdO3r1lNu7mnr7J9Hnf0rU20RgXdh5rB4M_48pw0brJhswzz9pNTCMIrbKhF-u69gqrEA/?rg_namespace-override=c0zaicujWEWRpo5UJ7qbsg__"
           await page.goto(url)
        const nav = page.getByRole('navigation');

       await eyes.check('page ',Target.window().useDom(true))
       await eyes.check('page1 ',Target.window().layoutRegion(nav))

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