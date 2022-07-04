# meet

This app  will provide access to a list of events for searchable cities. The info provided will include time, location as well as a chart for info on all events in a specific city.

This is a serverless, progressive web application (PWA) with React using a
test-driven development (TDD) technique. The application uses the Google
Calendar API to fetch upcoming events.

# Technologies used
- React


# User stories and scenarios

## FEATURE 1: FILTER EVENTS BY CITY

As a user
I should be able to “filter events by city”
So that I can see the list of events that take place in that city

### Scenario 1
Given user hasn’t searched for any city
When the user opens the app
Then the user should see a list of all upcoming events

### Scenario 2
Given the main page is open
When user starts typing in the city textbox
Then the user should see a list of cities (suggestions) that match what they’ve typed

### Scenario 3
Given the user was typing “Berlin” in the city textbox
And the list of suggested cities is showing
When the user selects a city (e.g., “Berlin, Germany”) from the list
Then their city should be changed to that city (i.e., “Berlin, Germany”)
And the user should receive a list of upcoming events in that city

## FEATURE 2: SHOW/HIDE AN EVENT'S DETAILS

As a user,
I should be able to expand an event element by clicking on it,
So that I can see further details of the event.

### Scenario 1
Given the user is on the starting page
When the user hasn’t clicked anything yet
Then the event will be collapsed

### Scenario 2
Given the user has searched for a city and events are listed
When the user clicks an event
Then the event will expand, revealing further info

### Scenario 3
Given the user has clicked an event and expanded it
When the user again clicks the event
Then the event will collapse again, hiding further info on the event


## FEATURE 3: SPECIFY NUMBER OF EVENTS

As a user,
I should be able to type in a number to specify the number of events shown,
So that I can only see as many events as I have specified.

### Scenario 1
Given the user hasn’t specified a number of events to be shown
When the user starts a search
Then the default amount (32) of events will be listed

### Scenario 2
Given the user sees a list of events
When the user specifies a number of events shown
Then the list of events will be as long as the user specified (or less, if less events are available)


## FEATURE 4: USE THE APP WHEN OFFLINE

As a user,
I should be able use basic app functions offline,
So that I can still use the app's basic features (i.e. showing events), despite having a live internet connection.

### Scenario 1
Given the user has opened the app and lost internet connection
When the user uses the app
Then the user will see a cached version of the app

### Scenario 2
Given the user has lost internet connection
When the user changes settings (i.e. city or time range)
Then the user will get an error message


## FEATURE 5: DATA VISUALIZATION

As a user,
I should be able to select a specific city to open up data visualization about its upcoming events,
So that I can see organized  statistics about the events in that specific city.

### Scenario 1
Given the user has searched for a city
When the user clicks on a city’s name
Then the user will see a expanded view with further infos about events of that city
