@connections @connections_list
Feature: CONNECTIONS: Identify a specific doctor's connection from a list of all connections in the local office
As a Reval administrator
I want to be able to view, sort, navigate and search a list of all doctors' connections in my region
So that I can identify an individual doctor's connection to update.
===================================================================

  Background:
    Given I am logged in to Reval
    And the 'Connections' page is open

  Scenario: Display a list table of doctors' connections with the correct columns
    When the page is loaded
    Then the table should display the column headings
      | columns                |
      | First name             |
      | Last name              |
      | GMC No                 |
      | Current programme name |
      | GMC Submission date    |
      | GMC Designated body    |
      | Programme owner        |
      | Programme membership   |
    And the table should be sortable by the column headings
      | columns              |
      | First name           |
      | Last name            |
      | GMC No               |
      | GMC Submission date  |
      | GMC Designated body  |
      | Programme owner      |
      | Programme membership |

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
