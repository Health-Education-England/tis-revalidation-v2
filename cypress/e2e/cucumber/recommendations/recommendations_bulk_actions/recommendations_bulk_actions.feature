@recommendations @recommendations_bulk_actions
Feature: RECOMMENDATIONS: Perform bulk actions on recommendations from list page
As a Reval administrator
I want to be able to bulk allocate admins to recommendation records in my region
So that I can save time by avoiding repeating the same action for individual doctors' recommendations.
==================================================================================================

  Background:
    Given I am logged in to Reval
    And the 'Under notice' page is open

  Scenario: Bulk allocate admin
    When I click the Allocate admin button
    And I Select Admin "Reval EndToEndTester"
    And I select the first "3" rows
    And click "Save" button
    Then the dialog box should show "Successfully assigned admins"
