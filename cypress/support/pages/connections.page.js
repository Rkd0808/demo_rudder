class ConnectionsPage {
  // Selectors
  get destinationLink() {
    return cy.get('a[href="/destinations"]');
  }
  get events() {
    return cy.get('div[data-node-key="Events"]');
  }
  get connectionsNavLink() {
    return cy.get('a[href*="connections"], nav a:contains("Connections")');
  }

  // Actions
  navigateToConnections() {
    this.connectionsNavLink.click();
    cy.url().should('include', '/connections');
  }

  getDataPlaneURL() {
    return cy.contains('span', 'Data Plane')
      .closest('div')
      .find('button.dataplane-url-copy-cta') // button inside the same container
      .prev('span')                          // the span immediately before the button
      .invoke('text')
      .then(url => url.trim());
  }
  getWriteKey() {
      return cy.contains('span', 'Write key')
        .invoke('text')
        .then(text => {
          // Remove the "Write key" label and trim
          return text.replace('Write key', '').trim();
    });
  }

  clickWebhookDestination(webhookName) {
    this.destinationLink.click();
    cy.contains('div',webhookName).click();
    this.events.click(); 
  }
}

export default new ConnectionsPage();