import { defineConfig } from "cypress";

export default defineConfig({
  chromeWebSecurity: false,
  defaultCommandTimeout: 15000,
  projectId: "eko18a",
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    experimentalSessionAndOrigin: true, //required to allow cross origin for hosted ui login
    setupNodeEvents(on, config) {
      return require("./cypress/plugins/index.js")(on, config);
    },
    baseUrl: "https://stage-revalidation.tis.nhs.uk/"
  }
});
