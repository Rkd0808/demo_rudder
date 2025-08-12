// cypress.config.js

// 1) Load dotenv before anything else
const path = require('path');
const dotenv = require('dotenv');

// Pick up the env-file from cross-env or default to .env.dev
const envFileName = process.env.DOTENV_CONFIG_PATH || '.env.dev';
const envFilePath = path.resolve(__dirname, envFileName);
dotenv.config({ path: envFilePath });

const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const preprocessor = require('@badeball/cypress-cucumber-preprocessor');
const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild');

module.exports = defineConfig({
  e2e: {
    // 2) Point Cypress’ baseUrl to your loaded workspace
    baseUrl: process.env.RS_WORKSPACE || 'https://app.rudderstack.com',

    // 3) Glob pattern for your feature files
    specPattern: 'cypress/e2e/features/**/*.feature',
    
    setupNodeEvents(on, config) {
      preprocessor.addCucumberPreprocessorPlugin(on, config);
      on('file:preprocessor', /* your bundler setup */);
      return config;
    },

    // 4) Support file
    supportFile: 'cypress/support/e2e.js',

    // 5) Timeouts and browser size
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    requestTimeout: 15000,
    responseTimeout: 15000,

    // 6) Plugin setup
    setupNodeEvents(on, config) {
      // a) Cucumber preprocessor
      on(
        'file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin.default(config)],
        })
      );
      preprocessor.addCucumberPreprocessorPlugin(on, config);

      // b) Inject our env vars into Cypress.env
      config.env.RS_USER = process.env.RS_USER;
      config.env.RS_PASS = process.env.RS_PASS;
      config.env.RS_WORKSPACE = process.env.RS_WORKSPACE;

      return config;
    },
  },
});
