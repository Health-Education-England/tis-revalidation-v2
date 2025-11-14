@connection @connections_layout
Feature: CONNECTION: The page displays the expected information
As a Reval administrator
I want to be able to view the current doctor's details including their current 
designated body and connection history
So that I have the necessary information on the screen to inform my decision
============================================================================

  Background:
    Given I am logged in to Reval

  Scenario: Show the relevant information on the screen
    When the 'Connection' page is open with id "7093800"
    Then the doctor detail panel should include
      | label                     |
      | Name                      |
      | GMC No                    |
      | Programme membership type |
      | Current programme name    |
      | Programme end date        |
      | Curriculum end date       |
      | Current grade             |
    And the main panel should include
      | label                                               |
      | Current designated body                             |
      | Connection history - including external GMC updates |
      | Update connection                                   |
