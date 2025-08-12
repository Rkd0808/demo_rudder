// cypress/support/pages/login.page.js

class LoginPage {
  // Selectors
  get emailInput() {
    return cy.get('input[type="email"], input[name="email"], #email');
  }

  get passwordInput() {
    return cy.get('input[type="password"], input[name="password"], #password');
  }

  get skip2FAButton() {
    return cy.get('a[href="/addmfalater"]');
  }
  get goToDashboardButton() {
    return cy.get('button[type="button"]');
  }
  get closeAlert() {
    return cy.get('button[title="Close"]');
  } 
  get loginButton() {
    return cy.get('button[type="button"]');
  }

  get forgotPasswordLink() {
    return cy.get('a:contains("Forgot"), a:contains("Reset")');
  }

  // Actions
  visit() {
    cy.visit('/');
    // Wait for the login form to be visible
    this.emailInput.should('be.visible');
  }

  login(email, password) {
    this.emailInput.clear().type(email);
    this.passwordInput.clear().type(password);
    this.loginButton.eq(0).click();
    this.skip2FAButton.click();
    this.goToDashboardButton.click();
    this.closeAlert.click();
    // Wait for successful login redirect
    cy.url({ timeout: 15000 }).should('not.include', '/login');
  }

  loginWithValidation(email, password) {
    this.emailInput.clear().type(email);
    this.passwordInput.clear().type(password);
    
    // Validate form fields before submitting
    this.emailInput.should('have.value', email);
    this.passwordInput.should('have.value', password);
    
    this.loginButton.click();
  }

  // Validations
  validateLoginFormExists() {
    this.emailInput.should('exist');
    this.passwordInput.should('exist');
    this.loginButton.should('exist');
  }

  validateEmailError() {
    cy.get('.error, .invalid, [data-testid="email-error"]')
      .should('be.visible')
      .and('contain.text', 'email');
  }

  validatePasswordError() {
    cy.get('.error, .invalid, [data-testid="password-error"]')
      .should('be.visible')
      .and('contain.text', 'password');
  }
}

export default new LoginPage();