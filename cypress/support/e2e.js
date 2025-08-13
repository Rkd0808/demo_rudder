import './commands';
import 'cypress-mochawesome-reporter/register';

// Set up global configurations
before(() => {
  cy.setupTestEnvironment();
});

beforeEach(() => {
  // Clear cookies and local storage before each test
  cy.clearCookies();
  cy.clearLocalStorage();
  
  // Set up request interceptors for better debugging
  cy.intercept('POST', '**/v1/track', (req) => {
    console.log('RudderStack Track Event:', req.body);
  }).as('trackEvent');
  
  cy.intercept('POST', '**/v1/batch', (req) => {
    console.log('RudderStack Batch Events:', req.body);
  }).as('batchEvents');
});

// Global error handling
Cypress.on('uncaught:exception', (err, runnable) => {
  // Log the error but don't fail the test for certain types
  if (err.message.includes('ResizeObserver loop limit exceeded')) {
    return false;
  }
  
  console.error('Uncaught exception:', err);
  return true;
});

// Custom global configurations
Cypress.on('window:before:load', (win) => {
  // Set up any window-level configurations
  win.cypressTest = true;
});

// After each test
afterEach(() => {
  // Take screenshot on failure
  if (Cypress.currentTest.state === 'failed') {
    cy.screenshotWithTimestamp(Cypress.currentTest.title);
  }
});