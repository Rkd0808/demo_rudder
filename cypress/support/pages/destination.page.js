class DestinationPage {
  // Selectors
  get refreshButton() {
    return cy.get('button:contains("Refresh"), [data-testid="refresh"], .refresh-btn');
  }

  // Actions
  getDeliveredCount() {
    return cy.contains('span', 'Delivered')
      .parent()
      .find('h2 span')
      .invoke('text')
      .then((text) => text.trim());
  }

  getFailedCount() {
    return cy.contains('span', 'Failed')
      .parent()
      .find('h2 span')
      .invoke('text')
      .then((text) => text.trim());
  }

  refreshEventMetrics() {
    cy.get('body').then(($body) => {
      if ($body.find('button:contains("Refresh"), .refresh-btn').length > 0) {
        this.refreshButton.click();
      }
      cy.reload();
    });
  }
}

export default new DestinationPage();