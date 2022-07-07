import React from "react";
import { shallow } from "enzyme";
import { mockData } from "../mock-data";
import Event from "../Event";

describe('<Event /> comcponent', () => {
  let EventWrapper;
  beforeEach(() => {
    EventWrapper = shallow(<Event event={mockData[0]} />);
  });

  test('render event summary', () => {
    expect(EventWrapper.find('.summary')).toHaveLength(1);
  });

  test('render event date/time', () => {
    expect(EventWrapper.find('.dateTime')).toHaveLength(1);
  });

  test('render event location', () => {
    expect(EventWrapper.find('.location')).toHaveLength(1);
  });

  test('render details button', () => {
    expect(EventWrapper.find('.button-details')).toHaveLength(1);
  });

  test('change state with button click', () => {
    EventWrapper.setState({ visible: false });
    EventWrapper.find('.button').simulate('click');
    expect(EventWrapper.state('visible')).toBe(true);
  });

  test('render event description', () => {
    EventWrapper.setState({ visible: true });
    expect(EventWrapper.find('.description')).toHaveLength(1);
    expect(EventWrapper.find('.description').text()).toBe(mockData[0].description);
  });

  test('hide event description', () => {
    EventWrapper.setState({ visible: true });
    EventWrapper.find('.button').simulate('click');
    expect(EventWrapper.state('visible')).toBe(false);
  });

  test('Show details button renders when collapsed', () => {
    EventWrapper.setState({ visible: false });
    expect(EventWrapper.find('.button').text()).toBe('Show Details');
  });

  test('Hide details button renders when expanded', () => {
    EventWrapper.setState({ visible: true });
    expect(EventWrapper.find('.button').text()).toBe('Hide Details');
  });

});
