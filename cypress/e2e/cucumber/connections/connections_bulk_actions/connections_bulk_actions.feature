@connections @connections_bulk_actions
Feature: CONNECTIONS: Perform bulk actions on connections from list page
As a Reval administrator
I want to be able to perform specific actions for multiple doctors' connection records in my region
So that I can save time by avoiding repeating the same action for individual doctors' connections.
==================================================================================================

  Background:
    Given I am logged in to Reval
    And the 'Discrepancies' page is open
    And the filter panel is open

  Scenario: Bulk disconnect 2 doctors
    Given I have filtered the list by "Ready for disconnection from" equal to "Kent, Surrey and Sussex"
    And clicked the Bulk update connection button
    When I select "Remove connection" from "Action"
    And I select "Doctor has retired" from "Reason"
    And I select the first "2" rows
    And click "Submit" button
    And click "Yes" button
    Then the dialog box should show "Success"

  Scenario: Bulk connect 2 doctors
    Given I have filtered the list by "Ready for connection to" equal to "South London"
    And clicked the Bulk update connection button
    When I select "Add connection" from "Action"
    And I select "The doctor has a connection with this designated body" from "Reason"
    And I select "SL" from "Dbc"
    And I select the first "2" rows
    And click "Submit" button
    And click "Yes" button
    Then the dialog box should show "Success"
