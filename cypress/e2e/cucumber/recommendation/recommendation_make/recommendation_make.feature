@recommendation @recommendation_make
Feature: RECOMMENDATION: Make a recommendation
As a Reval administrator
I want to be able to make a recommendation to defer, revalidation or non-engagement for a doctor in my local region
So that I can comply with the legal obligations of the organisation
===================================================================

  Background:
    Given I am logged in to Reval
    And the 'Recommendations' page is open
    And the filter panel is open

  Scenario: Hide create/edit button for recommendations submitted to GMC
    Given I have filtered the list by "TIS status" equal to "Submitted to GMC"
    When I select a row from the table
    Then neither the "Create recommendation" nor "Edit recommendation" buttons are visible

  @skip
  Scenario: Save a draft revalidation
    Given I have filtered the list by "TIS status" equal to "Not started"
    And I select a row from the table
    When I click "Create recommendation" button
    And I select "Revalidate" from "Make a recommendation"
    And I enter "Lorem ipsum dolor sit amet, consectetur adipiscing elit" to "Leave a comment"
    And I click "Save draft" button
    Then the dialog box should show "Your recommendation was successfully saved"

  @skip
  Scenario: Highlight required fields when saving a draft deferral
    Given I have filtered the list by "TIS status" equal to "Not started"
    And I select a row from the table
    When I click "Create recommendation" button
    And I select "Defer" from "Make a recommendation"
    And I click "Save draft" button
    Then the required fields are highlighted
      | label         | type     |
      | Choose a date | material |
      | Reason        | material |

  @skip
  Scenario: Display sub reason as required when "Insufficient evidence for a positive recommendation" selected as deferral reason
    Given I want to make a deferral
    And I select "Insufficient evidence for a positive recommendation" from "Reason"
    And I click "Save draft" button
    And the required fields are highlighted
      | label         | type     |
      | Choose a date | material |
      | Sub reason    | material |

  @skip
  Scenario: Save a draft deferral
    Given I have filtered the list by "TIS status" equal to "Not started"
    And I select a row from the table
    When I click "Create recommendation" button
    And I select "Defer" from "Make a recommendation"
    And I select the default focus date from the calendar
    And I select "Insufficient evidence for a positive recommendation" from "Reason"
    And I select "Patient feedback" from "Sub reason"
    And I enter "Lorem ipsum dolor sit amet, consectetur adipiscing elit" to "Leave a comment"
    And I click "Save draft" button
    Then the dialog box should show "Your recommendation was successfully saved"

  @skip
  Scenario: Submit a recommendation to GMC
    Given I have filtered the list by "TIS status" equal to "Draft"
    And I have filtered the list by "Designated Body" equal to "Kent, Surrey and Sussex"
    And I select a row from the table
    When I click "Edit recommendation" button
    And I click "Make recommendation" button
    And I toggle "I confirm all relevant information has been considered" button
    And I click "Submit to GMC" button
    Then the dialog box should show "Your recommendation was successfully submitted to GMC"
