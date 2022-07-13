Feature: SPECIFY NUMBER OF EVENTS

  Scenario: No Number is specified
    Given the no number of events to be shown has been specified
    When the user starts a search
    Then the default amount of events will be listed

  Scenario: User has specified event count preference
    Given the event list is loaded
    When the user specifies a number of events shown
    Then the list of events will be as long as the user specified (or less, if less events are available)