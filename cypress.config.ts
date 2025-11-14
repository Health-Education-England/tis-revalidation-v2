import { defineConfig } from "cypress";
import cypressOtp from "cypress-otp";

import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import { createEsbuildPlugin } from "@badeball/cypress-cucumber-preprocessor/esbuild";

export default defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  chromeWebSecurity: false,
  defaultCommandTimeout: 30000,
  blockHosts: ["*.google-analytics.com", "*.hotjar.com"],
  retries: {
    runMode: 2,
    openMode: 0
  },
  e2e: {
    specPattern: ["./cypress/e2e/cucumber/**/*.feature"],

    async setupNodeEvents(
      on: Cypress.PluginEvents,
      config: Cypress.PluginConfigOptions
    ): Promise<Cypress.PluginConfigOptions> {
      await addCucumberPreprocessorPlugin(on, config);
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)]
      });
      on("file:preprocessor", bundler);

      on("task", { generateOTP: cypressOtp });

      return config;
    },
    experimentalRunAllSpecs: true,

    baseUrl: "https://stage-revalidation.tis.nhs.uk/"
  }
});
