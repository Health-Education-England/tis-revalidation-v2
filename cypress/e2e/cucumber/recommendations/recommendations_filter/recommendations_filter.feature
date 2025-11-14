@recommendations @recommendations_filter
Feature: RECOMMENDATIONS: Filter the recommendations list table by specific properties
As a Reval administrator
I want to be able to filter the list of all doctors' recommendations in my region
So that I can identify an individual doctor's recommendation.
============================================================

  Background:
    Given I am logged in to Reval
    And the 'Under notice' page is open
    And the filter panel is open

  Scenario: Filter by programme name
    When I select programme name "General Surgery KSS"
    And I click "Apply filters" button
    Then the table should display entries containing 'General Surgery KSS'

  Scenario: Filter by GMC status
    When I select list item "Under Review" from "GMC status"
    And I click "Apply filters" button
    Then the table should display entries containing 'Under Review'

  Scenario: Filter by TIS status
    When I select list item "Not started" from "TIS status"
    And I click "Apply filters" button
    Then the table should display entries containing 'Not Started'

  Scenario: Filter by Designated Body
    When I select list item "South London" from "Designated Body"
    And I click "Apply filters" button
    Then the table should display entries containing 'SL'

  Scenario: Filter by TIS Admin
    When I select TIS Admin "Reval EndToEndTester"
    And I click "Apply filters" button
    Then the table should display entries containing 'Reval EndToEndTester'

  Scenario: Filter by 2 properties
    When I select list item "South London" from "Designated Body"
    And I select list item "Not started" from "TIS status"
    And I click "Apply filters" button
    Then the table should display entries containing 'SL'
    And the table should display entries containing 'Not started'

  Scenario: Clear filters when applied
    Given I have applied a filter
    When I click "Clear filters" button
    Then no filters are applied
