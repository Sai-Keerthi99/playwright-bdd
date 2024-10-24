Feature: User Authentication tests

@noauth
  Scenario: Successful Login
    Given super-user navigates to landing-page
    When the user logs in
    Then the page should display in logged in state

@noauth
  Scenario: Unsuccessful Login
    Given invalid-user navigates to landing-page
    When the user logs in
    But the page should display an error message