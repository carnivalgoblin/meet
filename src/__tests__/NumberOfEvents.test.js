import React from "react";
import { shallow } from "enzyme";
import NumberOfEvents from "../NumberOfEvents";

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents />);
  });

  test('textbox rendered correctly', () => {
    expect(NumberOfEventsWrapper.find('.number-of-events')).toHaveLength(1);
  });

  test('renders integer input correctly', () => {
    const number = NumberOfEventsWrapper.state('numberOfEvents');
    expect(NumberOfEventsWrapper.find('.number-of-events').prop('value')).toBe(number);
  });

  test('change state when text input changes', () => {
    NumberOfEventsWrapper.setState({
      numberOfEvents: 32
    });
    const eventObject = { target: { value: 16 } };
    NumberOfEventsWrapper.find('.number-of-events').simulate('change', eventObject);
    expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(16);
  });

});