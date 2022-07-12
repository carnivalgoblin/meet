import React from "react";
import { shallow, mount } from "enzyme";
import App from "../App";
import EventList from "../EventList";
import Event from "../Event";
import CitySearch from "../CitySearch";
import NumberOfEvents from "../NumberOfEvents";
import { mockData } from '../mock-data';
import { extractLocations, getEvents } from '../api';


describe('<App /> component', () => {
  let AppWrapper;
  beforeAll(() => {
    AppWrapper = shallow(<App />);
  });

  test('render EventList', () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });

  test('render CitySearch', () => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });

  test('render NumberOfEvents', () => {
    expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
  })
});

describe('<App /> integration', () => {
  /* let AppWrapper;
  beforeAll(() => {
    AppWrapper = mount(<App />);
  }); */

  test('App passes "events" state as a prop to EventList', () => {
    const AppWrapper = mount(<App />);
    const AppEventState = AppWrapper.state('events');
    expect(AppEventState).not.toEqual(undefined);
    expect(AppWrapper.find(EventList).props().events).toEqual(AppEventState);
    AppWrapper.unmount();
  });

  test('App passes "locations" state as a prop to CitySearch', () => {
    const AppWrapper = mount(<App />);
    const AppLocationsState = AppWrapper.state('locations');
    expect(AppLocationsState).not.toEqual(undefined);
    expect(AppWrapper.find(CitySearch).props().locations).toEqual(AppLocationsState);
    AppWrapper.unmount();
  });

  test('get list of events matching the city selected by the user', async () => {
    const AppWrapper = mount(<App />);
    const CitySearchWrapper = AppWrapper.find(CitySearch);
    const locations = extractLocations(mockData);
    CitySearchWrapper.setState({ suggestions: locations });
    const suggestions = CitySearchWrapper.state('suggestions');
    const selectedIndex = Math.floor(Math.random() * (suggestions.length));
    const selectedCity = suggestions[selectedIndex];
    await CitySearchWrapper.instance().handleItemClicked(selectedCity);
    const allEvents = await getEvents();
    const eventsToShow = allEvents.filter(event => event.location === selectedCity);
    expect(AppWrapper.state('events')).toEqual(eventsToShow);
    AppWrapper.unmount();
  });

  test('get list of all events when user selects "See all cities"', async () => {
    const AppWrapper = mount(<App />);
    const suggestionItem = AppWrapper.find(CitySearch).find('.suggestions li');
    await suggestionItem.at(suggestionItem.length - 1).simulate('click');
    const allEvents = await getEvents();
    expect(AppWrapper.state('events')).toEqual(allEvents);
    AppWrapper.unmount();
  });

  test('load default list of 32 events', async () => {
    const AppWrapper = mount(<App />);
    const allEvents = await getEvents();
    expect(AppWrapper.state('numberOfEvents')).not.toEqual(undefined);
    const sliceNumber = AppWrapper.state('numberOfEvents');
    expect(AppWrapper.state('events')).toEqual(allEvents.slice(0, sliceNumber));
    AppWrapper.unmount();
  });

  test('input change in NumberOFEvnts updates state in App component', async () => {
    const AppWrapper = mount(<App />);
    const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
    const selectedCity = "London, UK";
    const selectedNumber = 1;
    await NumberOfEventsWrapper.instance().handleInputChanged({ target: { value: selectedNumber } });
    const eventsToShow = mockData
      .filter((e) => e.location = selectedCity)
      .slice(0, selectedNumber);
    AppWrapper.setState({ events: eventsToShow });
    expect(AppWrapper.state('events')).toEqual(eventsToShow);
    expect(AppWrapper.state('events')).not.toEqual(undefined);
    expect(AppWrapper.state('events')).toHaveLength(selectedNumber);
    AppWrapper.unmount();
  });

  test('input change in NumberOfEvents and city change ind CitySearch updates state in app component', async () => {
    const AppWrapper = mount(<App />);
    const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
    const CitySearchWrapper = AppWrapper.find(CitySearch);
    const location = extractLocations(mockData)[0];
    await CitySearchWrapper.instance().handleItemClicked(location);
    const selectedNumber = 1;
    await NumberOfEventsWrapper.instance().handleInputChanged({ target: { value: selectedNumber } });
    AppWrapper.setState({ locationSelected: location });
    expect(AppWrapper.state('events')).not.toEqual(undefined);
    expect(AppWrapper.state('events')).toHaveLength(selectedNumber);
    AppWrapper.unmount();
  });

  test('input change in NumberOfEvents being passed to EventList', async () => {
    const AppWrapper = mount(<App />);
    const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
    const selectedNumber = 2;
    await NumberOfEventsWrapper.instance().handleInputChanged({ target: { value: selectedNumber } });
    AppWrapper.setState({ locationSelected: 'all' });
    expect(AppWrapper.find(EventList).props().events).toHaveLength(selectedNumber);
    AppWrapper.unmount();
  });
});