@connections @connections_filter
Feature: CONNECTIONS: Filter the connections list table by specific properties
As a Reval administrator
I want to be able to filter the list of all doctors' connections in my region
So that I can identify an individual doctor's connection.
============================================================

  Background:
    Given I am logged in to Reval
    And the 'Discrepancies' page is open
    And the filter panel is open

  Scenario: Filter by programme name
    When I select programme name "General Surgery KSS"
    And I click "Apply filters" button
    Then the table should display entries containing 'General Surgery KSS'

  Scenario: Filter by Ready for disconnection from
    When I select list item "North West London" from "Ready for disconnection from"
    And I click "Apply filters" button
    Then the table should display entries containing 'NWL'

  Scenario: Filter by Ready for connection to
    When I select list item "North West London" from "Ready for connection to"
    And I click "Apply filters" button
    Then the table should display entries containing 'NWL'

  Scenario: Clear filters when applied
    Given I have applied a filter
    When I click "Clear filters" button
    Then no filters are applied
