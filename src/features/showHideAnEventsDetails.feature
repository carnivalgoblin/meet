Feature: SHOW/HIDE AN EVENT'S DETAILS

  Scenario: Collapsed by Default
    Given the event list is loaded
    When the user hasn’t clicked anything yet
    Then the event will be collapsed

  Scenario: Expanding the details
    Given the event element is collapsed
    When the user clicks an event
    Then the event will expand, revealing further info

  Scenario: Collapse the details
    Given the event element is expanded
    When the user again clicks the event
    Then the event will collapse again, hiding further info on the event

