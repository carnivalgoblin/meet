import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { extractLocations, getEvents } from './api';
import './App.css';
import CitySearch from './CitySearch';
import EventList from './EventList';
import NumberOfEvents from './NumberOfEvents';


class App extends Component {

  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    locationSelected: 'all'
  }

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (location, eventCount) => {
    if (eventCount === undefined) {
      eventCount = this.state.numberOfEvents;
    } else { this.setState({ numberOfEvents: eventCount }) }
    if (location === undefined) {
      location = this.state.locationSelected;
    }
    getEvents().then((events) => {
      const locationEvents = (location === 'all') ?
        events :
        events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents.slice(0, eventCount),
        numberOfEvents: eventCount,
        locationSelected: location
      });
    });
  }

  render() {
    return (
      <div className="App">
        <Container>
          <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
          <EventList events={this.state.events} />
          <NumberOfEvents updateEvents={this.updateEvents} />
        </Container>
      </div >
    );
  }
}

export default App;
