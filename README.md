# RudderStack E2E Automation Framework

A comprehensive end-to-end testing framework for RudderStack using Cypress and Cucumber BDD.

## 🚀 Features

- **Cypress + Cucumber BDD**: Modern testing framework with behavior-driven development
- **Multi-environment support**: Separate configurations for dev, qa, and prod
- **API Testing**: Built-in HTTP API testing for RudderStack events
- **CI/CD Ready**: GitHub Actions workflow for automated testing
- **Page Object Pattern**: Maintainable and scalable test structure
- **Environment Variables**: Secure credential management with dotenv

## 📁 Project Structure

```
rudderstack-e2e-cypress/
├── .github/
│   └── workflows/
│       └── nightly.yml              # GitHub Actions workflow
├── cypress/
# RudderStack E2E Cypress Automation Framework

│   ├── e2e/
│   │   └── features/
│   │       └── rudderstack.feature  # Gherkin scenarios
│   ├── support/
│   │   ├── step_definitions/
│   │   └── e2e.js                   # Global test setup
│   └── fixtures/                    # Test data files
├── .env.dev                         # Development environment variables
├── .env.qa                          # QA environment variables  
├── .env.prod                        # Production environment variables
├── cypress.config.js                # Cypress configuration
├── package.json                     # Node.js dependencies
└── README.md                        # This file
```

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd rudderstack-e2e-cypress
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create your local environment file**
   ```bash
   cp .env.dev .env.local
   ```
   Edit `.env.local` with your credentials:
   ```env
   # RudderStack credentials and environment config
   RS_USER=your_rudderstack_username
   RS_PASS=your_rudderstack_password
   RS_WORKSPACE=https://app.rudderstack.com

   # Data Plane URL and Write Key (captured or set for testing)
   DATA_PLANE_URL=
   WRITE_KEY=

   # Optional: Webhook URL for testing
   WEBHOOK_URL=https://demo.requestcatcher.com/

   # Test configuration
   TEST_TIMEOUT=30000
   API_RETRY_COUNT=3

## ⚙️ Configuration

### Environment Variables

Create `.env.*` files for each environment:

```bash
# .env.dev (example)
RS_USER=your-email@company.dev
RS_PASS=your-password
WEBHOOK_URL=https://your-subdomain.requestcatcher.com
```


1. **Sign up** for RudderStack Cloud at https://app.rudderstack.com
2. **Create HTTP Source**: 
   - Go to Connections → Sources → Add Source → HTTP
   - Copy the Write Key
   - Go to Connections → Destinations → Add Destination → Webhook
   - Use RequestCatcher URL: https://requestcatcher.com
4. **Connect Source to Destination**

## 🧪 Running Tests
```bash
# Development environment
DOTENV_CONFIG_PATH=.env.dev npm run cy:run

DOTENV_CONFIG_PATH=.env.qa npm run cy:run

# Production environment
DOTENV_CONFIG_PATH=.env.prod npm run cy:run
```

## 🔄 CI/CD Pipeline

The framework includes a GitHub Actions workflow that:

- **Runs automatically**: Every night at 1 AM UTC
- **Multi-environment**: Tests both QA and Production
- **Multi-browser**: Chrome and Edge support
- **Parallel execution**: Faster test completion
- **Artifact collection**: Screenshots and videos on failure
- **Flexible triggering**: Manual workflow dispatch available

### Setting up GitHub Secrets

Add these secrets to your repository:

```
RS_USER=your-email@company.com
RS_PASS=your-password  
RS_WORKSPACE=https://app.rudderstack.com
CYPRESS_RECORD_KEY=your-cypress-cloud-key (optional)
```

## 📋 Test Scenarios

### Primary Test Flow

1. **Authentication**: Login to RudderStack workspace
2. **Data Extraction**: Capture Data Plane URL and HTTP source write key
3. **API Testing**: Send test events via RudderStack HTTP API
4. **Verification**: Check event delivery metrics in destination
5. **Validation**: Ensure delivered count increases and failed count remains 0

### API Testing Features

- **HTTP Event Tracking**: Send individual track events
- **Batch Event Processing**: Send multiple events in one request
- **Response Validation**: Verify API response status and payload
- **Error Handling**: Graceful handling of API failures

## 🔧 Customization

### Adding New Test Scenarios

1. **Update Gherkin**: Add scenarios in `cypress/e2e/features/rudderstack.feature`
2. **Implement Steps**: Add step definitions in `cypress/support/step_definitions/`
3. **Extend Pages**: Add new page objects in `cypress/support/pages/`

### Custom Commands

The framework includes several custom Cypress commands:

```javascript
cy.sendRudderStackEvent(dataPlane, writeKey)
cy.sendBatchRudderStackEvents(dataPlane, writeKey, events)
cy.loginWithRetry(email, password, maxRetries)
cy.waitUntil(condition, options)
cy.screenshotWithTimestamp(name)
```

### Environment-Specific Configurations

Each environment can have unique settings in `cypress.config.js`:

```javascript
// Environment-specific timeouts, retries, etc.
if (process.env.ENVIRONMENT === 'prod') {
  config.defaultCommandTimeout = 15000;
}
```

## 🐛 Debugging

### Local Debugging

```bash
# Open Cypress Test Runner for visual debugging
npm run cy:open

# Run with additional logging
DEBUG=cypress:* npm run cy:run

# Run specific test file
npx cypress run --spec "cypress/e2e/features/rudderstack.feature"
```

### CI/CD Debugging

- Check GitHub Actions logs for detailed error messages
- Download screenshot and video artifacts from failed runs
- Review Cypress Cloud dashboard (if configured)

## 📊 Reporting

- **Console Output**: Real-time test results in terminal
- **Screenshots**: Automatic capture on test failures
- **Videos**: Full test execution recording
- **Cucumber Reports**: BDD-style reporting (can be extended)
- **GitHub Summary**: Test results in GitHub Actions summary

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-test`
3. Make your changes and add tests
4. Run tests locally: `npm run cy:run`
5. Commit changes: `git commit -am 'Add new test scenario'`
6. Push to branch: `git push origin feature/new-test`
7. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

- **Documentation**: [Cypress Docs](https://docs.cypress.io/)
- **Cucumber**: [Cypress Cucumber Preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor)
- **RudderStack API**: [HTTP API Documentation](https://www.rudderstack.com/docs/api/http-api/)

## 🔗 Useful Links

- [RudderStack Documentation](https://www.rudderstack.com/docs/)
- [RequestCatcher (Webhook Testing)](https://requestcatcher.com/)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)