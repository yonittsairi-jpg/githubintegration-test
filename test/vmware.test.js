const { test } = require("@playwright/test");
const { Eyes, Target, ClassicRunner } = require("@applitools/eyes-playwright");

const runner = new ClassicRunner();

test("playwright-vmware", async ({ page }) => {
    const eyes = new Eyes(runner);

    // Set the key configuration
    await eyes.open(page, 'vmware', 'vmware Test');

    try {

        await page.goto("https://ufg-ssa.applitools.com/renderid/16cd3a87-178d-4564-87fc-d79e910bddd0/eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJleWVzYXBpLmFwcGxpdG9vbHMuY29tLGV5ZXNwdWJsaWN3dXNpMC5ibG9iLmNvcmUud2luZG93cy5uZXQiLCJzdWIiOiJGYUFJWEpBdUNFeVhSU2J0NHEzczlBX18iLCJpYXQiOjE3NjU5NjEyMjIsImV4cCI6MTc2NTk4MjgyMiwidmdzZXJ2aWNldXJsIjoiaHR0cHM6Ly91Zmctd3VzLmFwcGxpdG9vbHMuY29tIiwicHJ2IjoiMiIsImV5ZXNhcGl1cmwiOiJodHRwczovL2V5ZXNhcGkuYXBwbGl0b29scy5jb20ifQ.1rawoEi8Pm8cn3XD0j6zwUZDFQkZS6nnRLJfOtV1bV6SxNF15M9fJBTRz2xBltEp4ETpouiT5fi_Ug50GMfVJI6aziqyy_200xMVoSU8bRfN2i7uwR5luCkuhyUnM-PnLHFjOvXcDdLslr1WV5dno_VByWBFJn07KIqxqz3hpycZhp9GnfzvDnrdhJsQxcU2ZttW7k2NpTOY3FjnAmxWYFMZ4DBzBdc8ZciWAYZLIJIFrMzN84MrMtRjNTVkpXWCPr6OtfxrEBM-5ZLVFZ8XOB5O5ZUOfPcu553vqYgeHKzn5RCUBF7Ywiva7BwkOAbGqHyBpvMDsb1eqvHQWdj9yQ/?rg_namespace-override=D1nAdwA7IUuHHiK1D0WXyg__");
        await eyes.check("Main Page", Target.window());

        // 1. Close Eyes & Get Results
         await eyes.close(false);


    } catch (error) {
        await eyes.abortIfNotClosed();
        throw error;
    }

});