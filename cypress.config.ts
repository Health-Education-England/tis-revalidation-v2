import { defineConfig } from "cypress";

export default defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  chromeWebSecurity: false,
  defaultCommandTimeout: 15000,
  projectId: "7r2r65",
  blockHosts: ["*.google-analytics.com", "*.hotjar.com"],
  retries: {
    runMode: 3,
    openMode: 0
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    //experimentalSessionAndOrigin: true, //required to allow cross origin for hosted ui login
    experimentalRunAllSpecs: true,
    setupNodeEvents(on, config) {
      return require("./cypress/plugins/index.js")(on, config);
    },
    baseUrl: "https://stage-revalidation.tis.nhs.uk/"
  }
});
