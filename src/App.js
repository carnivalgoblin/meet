import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { extractLocations, getEvents, checkToken, getAccessToken } from './api';
import './App.css';
import CitySearch from './CitySearch';
import EventList from './EventList';
import NumberOfEvents from './NumberOfEvents';
import { OfflineAlert } from './Alert';
import WelcomeScreen from './WelcomeScreen';

class App extends Component {

  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    locationSelected: 'all',
    offlineText: '',
    showWelcomeScreen: undefined
  }

  async componentDidMount() {
    this.mounted = true;

    const accessToken = localStorage.getItem('access_token');
    let isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({ events, locations: extractLocations(events) });
        }
      });
    }

    if (!navigator.onLine) {
      this.setState({
        offlineText: "Your're offline! The data was loaded from the cache."
      });
    } else {
      this.setState({
        offlineText: '',
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (location, eventCount) => {
    if (eventCount === undefined) {
      eventCount = this.state.numberOfEvents;
    } else { this.setState({ numberOfEvents: eventCount }) }
    if (location === undefined) {
      location = 'all';
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
    /*     if (this.state.showWelcomeScreen) return <div className="App" />; */

    return (
      <div className="App">
        <h1>Meet App</h1>
        <Container>
          <OfflineAlert text={this.state.offlineText} />
          <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
          <EventList events={this.state.events} />
          <NumberOfEvents updateEvents={this.updateEvents} />
        </Container>
        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={getAccessToken} />
      </div >
    );
  }
}

export default App;
