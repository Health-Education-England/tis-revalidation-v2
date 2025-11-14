@connection @connections_disconnect
Feature: CONNECTION: Disconnect an individual doctor
As a Reval administrator
I want to be able to disconnect a doctor from a designated body
So that I can maintain an accurate record of connections within my region
==========================================================================

  Background:
    Given I am logged in to Reval
    And the 'Discrepancies' page is open
    And the filter panel is open

  Scenario: Disconnect an individual doctor from a designated body
    Given I have filtered the list by "Ready for disconnection from" equal to "Kent, Surrey and Sussex"
    And I select a row from the table
    When I select "Remove connection" from "Action"
    And I select "Doctor has retired" from "Reason"
    And click "Submit" button
    And click "Yes" button
    Then the dialog box should show "Success"
    And Current designated body should show "No current connection"
    And the Connection history should include
      | label        | value                |
      | New DBC      |                      |
      | Old DBC      | KSS                  |
      | Request type | REMOVE               |
      | Reason       | Doctor has retired   |
      | Updated by   | Reval EndToEndTester |
