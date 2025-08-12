Feature: RudderStack Event Pipeline Verification

 Background:
  Given I have valid RudderStack credentials
  And the workspace is accessible

Scenario: Verify events are delivered to Webhook destination
  Given I log in to RudderStack workspace
  And I capture and persist the Data Plane URL and HTTP source write key
  And I send all events via the HTTP API
  Then I navigate to the Webhook destination
  And I verify the event delivery metrics
