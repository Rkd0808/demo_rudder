import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import LoginPage from '../pages/login.page';
import ConnectionsPage from '../pages/connections.page';
import DestinationPage from '../pages/destination.page';

// Background Steps
Given('I have valid RudderStack credentials', () => {
  ['RS_USER', 'RS_PASS', 'RS_WORKSPACE'].forEach((envVar) => {
    cy.log(`${envVar} is ${Cypress.env(envVar) ? 'set' : 'NOT set'}`);
    expect(Cypress.env(envVar)).to.be.a('string').and.not.be.empty;
  });
});

Given('the workspace is accessible', () => {
  cy.request({ url: Cypress.env('RS_WORKSPACE'), failOnStatusCode: false })
    .its('status')
    .should('be.oneOf', [200, 302]);
});

// Scenario Steps
Given('I log in to RudderStack workspace', () => {
  LoginPage.visit();
  LoginPage.login(Cypress.env('RS_USER'), Cypress.env('RS_PASS'));
});

When('I navigate to the connections page', () => {
  ConnectionsPage.navigateToConnections();
});

When('I capture and persist the Data Plane URL and HTTP source write key', () => {
  ConnectionsPage.getDataPlaneURL().then((dataPlaneURL) => {
    ConnectionsPage.getWriteKey().then((writeKey) => {
      cy.writeFile('cypress/fixtures/test-config.json', {
        dataPlaneURL: dataPlaneURL.trim(),
        writeKey: writeKey.trim(),
      });
    });
  });
});

When('I send all events via the HTTP API', () => {
  const events = ['track', 'alias', 'identify', 'page', 'screen', 'group', 'batch'];
  events.forEach((event) => {
    cy.sendEventFromFixture(event);
    DestinationPage.refreshEventMetrics();
  });
});

Then('I navigate to the Webhook destination', () => {
  ConnectionsPage.clickWebhookDestination('demo');
});

Then('I verify the event delivery metrics', () => {
  DestinationPage.refreshEventMetrics();
  cy.reload();
  DestinationPage.refreshEventMetrics();
  let failedCount, deliveredCount;
  DestinationPage.getFailedCount().then((fail) => {
    failedCount = fail.trim();
    DestinationPage.getDeliveredCount().then((delivered) => {
      deliveredCount = delivered.trim();
      cy.writeFile('cypress/fixtures/eventsDeliveryCount.json', {
        deliveredCount,
        failedCount,
      });
    });
  });
});
