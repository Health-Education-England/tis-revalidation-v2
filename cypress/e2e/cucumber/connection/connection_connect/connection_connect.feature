@connection @connections_disconnect
Feature: CONNECTION: Connect an individual doctor
As a Reval administrator
I want to be able to connect a doctor to a designated body
So that I can maintain an accurate record of connections within my region
==========================================================================

  Background:
    Given I am logged in to Reval
    And the 'Discrepancies' page is open
    And the filter panel is open

  Scenario: Connect an individual doctor from a designated body
    Given I have filtered the list by "Ready for connection to" equal to "Kent, Surrey and Sussex"
    And I select a row from the table
    When I select "Add connection" from "Action"
    And I select "Conflict of interest" from "Reason"
    And I select "KSS" from "Dbc"
    And click "Submit" button
    And click "Yes" button
    Then the dialog box should show "Success"
    And Current designated body should show "NHSE Education Kent, Surrey and Sussex"
    And the Connection history should include
      | label        | value                |
      | New DBC      | KSS                  |
      | Request type | ADD                  |
      | Reason       | Conflict of Interest |
      | Updated by   | Reval EndToEndTester |
