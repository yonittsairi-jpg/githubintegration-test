const { test, expect} = require("@playwright/test");
const {
    Eyes,
    Target,
    VisualGridRunner,
    Configuration,
    IosDeviceName,
    BrowserType, ClassicRunner, FileLogHandler, IosDeviceTarget, ScreenOrientationPlain, ScreenOrientation
} = require("@applitools/eyes-playwright");

// 1. Initialize the Runner
const runner = new VisualGridRunner({ testConcurrency: 5 });
// const runner = new ClassicRunner();
test("playwright-vmware-ufg", async ({ page }) => {
    const eyes = new Eyes(runner);
    eyes.setLogHandler(new FileLogHandler(true));
    const config = new Configuration();
    config.setAppName('vmware_2');
    config.setTestName('vmware Test_2');
    config.addBrowser(1024, 768, BrowserType.CHROME);
    config.addBrowser(1920, 1080, BrowserType.CHROME);

    // config.setVisualGridOptions({ 'enableFrames': true });
    // Set API Key if not in Environment Variables
    // config.setApiKey('YOUR_API_KEY');
    eyes.setConfiguration(config);

    await eyes.open(page);

    try {
        const url="https://ufg-ssa.applitools.com/renderid/daf5a53a-b0d9-46b2-b3f8-e866d3efbbb9/eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJleWVzYXBpLmFwcGxpdG9vbHMuY29tLGV5ZXNwdWJsaWN3dXNpMC5ibG9iLmNvcmUud2luZG93cy5uZXQiLCJzdWIiOiJGYUFJWEpBdUNFeVhSU2J0NHEzczlBX18iLCJpYXQiOjE3Njk1MTA5MTQsImV4cCI6MTc2OTUzMjUxNCwidmdzZXJ2aWNldXJsIjoiaHR0cHM6Ly91Zmctd3VzLmFwcGxpdG9vbHMuY29tIiwicHJ2IjoiMiIsImV5ZXNhcGl1cmwiOiJodHRwczovL2V5ZXNhcGkuYXBwbGl0b29scy5jb20ifQ.UlccLM0rP7X-7pLO47IVL262Ippiak2AYd3lXUhpPAIsiPvxXCKNqcJNrUm8rALl-h7gKqPJQg38WQbFgduATNiMwShaY6uO4LGWj-VftYlytUIYe6-Tx2KgfbU184YKgeY_Pvtppcza-35thNeP0fPx60iAek1UZH-5DapTFu65KhIQNXP43QZNH_FAdeE4DOeSIQJbPZury3QOA8SNrdER21FemhZ1sHDmR1tk9WFZxJuu_hoAPwG3zpNpmBK90he4HqLxzbcY7YekNJGW9YoEaeRLmqFKuw2QNnzJUKDtrnfxyWXvyVUNJnIS7KmN6SNWpPjgOs55z6zJNOQYYA/?rg_namespace-override=D1nAdwA7IUuHHiK1D0WXyg__"
        await page.goto(url)
        const regionLocator = page.locator('.plugin-id\\(com\\.vmware\\.vcf\\.client\\).ng-star-inserted');

        await regionLocator.waitFor({state: 'visible'});

        await eyes.check('Checklist Page', Target.region(regionLocator)

        );

        const iframeLocator = page.locator('clr-modal.open plugin-iframe >> iframe');

        const frame = await iframeLocator.elementHandle().then(h => h.contentFrame());

        let newUrl
        if (frame) {
            const documentUrl = frame.url();
            console.log('The #document URL is:', documentUrl);
            newUrl = documentUrl

        } else {
            console.log('Frame not found or not yet loaded');
        }
        if (newUrl) {
            // 1. On the original page, extract all CSS content or <link> URLs
            const styles = await page.evaluate(() => {
                return Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
                    .map(el => el.outerHTML)
                    .join('\n');
            });



// 3. Inject the extracted styles into the new tab's head

            const newTab = await page.context().newPage();


            await newTab.goto(newUrl);
            await newTab.evaluate((cssContent) => {
                document.head.insertAdjacentHTML('beforeend', cssContent);
            }, styles);

            const labelLocator = newTab.locator('label[for="hostESXI"]');
            await labelLocator.waitFor({ state: 'visible' });


            await labelLocator.evaluate((el) => {
                const regex = /(\([^)]+\))/;
                if (regex.test(el.innerText)) {
                    el.innerHTML = el.innerHTML.replace(
                        regex,
                        '<span id="version" style="display:inline-block;">$1</span>'
                    );
                }
            });


            await eyes.check({
                name: 'New tab',
                page: newTab,
                fully: true,
                ignoreRegions: ['#version']
            });

            // await eyes.check({name: 'New tab', page: newTab, fully: true,ignoreRegions:[labelLocator]})

            await newTab.close();
        }

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