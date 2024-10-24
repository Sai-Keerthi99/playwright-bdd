Feature: Policy Issue

Scenario: Issue a Policy
    When user creates a new Account with given credentials
    And creates a Submission for the same account
    And user proceeds to Quote
    And proceeds to issue the Policy
    Then user should see a successful policy issue

Scenario: Issue and Cancel a Policy
    And user creates a new Account with given credentials
    When creates a Submission for the same account
    And user proceeds to Quote
    And proceeds to issue the Policy
    And user wants to Cancel the Policy
    Then user should see a success message of policy Cancellation
