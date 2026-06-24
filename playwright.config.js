const { devices } = require("@playwright/test");

module.exports = {
    projects: [
        {
            name: 'ipad-pro',
            use: { ...devices['iPad Pro 11'] },
        },
    ],



};