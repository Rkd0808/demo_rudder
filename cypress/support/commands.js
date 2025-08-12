
// Wait until a condition is met, with polling
Cypress.Commands.add('waitUntil', (checkFunction, options = {}) => {
  const { timeout = 30000, interval = 1000, errorMsg = 'Condition was not met within timeout' } = options;
  const startTime = Date.now();
  function check() {
    return cy.then(checkFunction).then((result) => {
      if (result) return cy.wrap(result);
      if (Date.now() - startTime < timeout) {
        cy.wait(interval);
        return check();
      }
      throw new Error(errorMsg);
    });
  }
  return check();
});

// Setup test environment
Cypress.Commands.add('setupTestEnvironment', () => {
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.window().then((win) => {
    win.localStorage.setItem('cypress-test-mode', 'true');
  });
  cy.log(`Test Environment: ${Cypress.env('NODE_ENV') || 'development'}`);
  cy.log(`Base URL: ${Cypress.config('baseUrl')}`);
  cy.log(`Browser: ${Cypress.browser.name} ${Cypress.browser.version}`);
});

// Screenshot with timestamp
Cypress.Commands.add('screenshotWithTimestamp', (name) => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  cy.screenshot(`${name}-${timestamp}`, { capture: 'fullPage' });
});

// Send event from fixture
Cypress.Commands.add('sendEventFromFixture', (eventName, payloadFile) => {
  const endpoint = `/v1/${eventName}`;
  const fileName = payloadFile || `${eventName}-payload`;
  cy.fixture('test-config').then((cfg) => {
    cy.fixture(`payload/${fileName}`).then((payload) => {
      cy.request({
        method: 'POST',
        url: `${cfg.dataPlaneURL}${endpoint}`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${btoa(cfg.writeKey + ':')}`,
        },
        body: payload,
      });
    });
  });
});

