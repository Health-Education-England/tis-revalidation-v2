@recommendations @recommendations_list
Feature: RECOMMENDATIONS: Identify a specific doctor's connection from a list of all recommendations in the local office
As a Reval administrator
I want to be able to view, sort, navigate and search a list of all doctors' recommendations in my region
So that I can identify an individual doctor's recommendation to update.
===================================================================

  Background:
    Given I am logged in to Reval
    And the 'Recommendations' page is open

  Scenario: Display a list table of doctors' recommendations with the correct columns
    When the page is loaded
    Then the table should display the column headings
      | columns                   |
      | First name                |
      | Last name                 |
      | GMC No                    |
      | Designated body           |
      | GMC Submission due date   |
      | GMC Status                |
      | TIS Status                |
      | Current programme name    |
      | Programme membership type |
      | Curriculum end date       |
      | Admin                     |
      | Last updated              |
    And the table should be sortable by the column headings
      | columns                 |
      | First name              |
      | Last name               |
      | GMC No                  |
      | GMC Submission due date |

  Scenario: Navigate to next page of results
    Given there is more than 1 page of doctors
    When I navigate to the next page
    Then the next page is displayed

  Scenario: Navigate to previous page of results
    Given the current page number is greater than 1
    When I navigate to the previous page
    Then the previous page is displayed

  Scenario: Search for doctor
    When I search for doctors with the query 'Smith'
    Then the table should display entries matching the query 'Smith'

  Scenario: Display record detail
    When I search for doctors with the query '7756501'
    And I select a row from the table
    Then the details page for doctor with name of 'Harry Smith' should be displayed
