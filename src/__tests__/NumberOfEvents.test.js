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

  test('change state when number input changes', () => {
    NumberOfEventsWrapper.setState({
      numberOfEvents: 32
    });
    const eventObject = { target: { value: 16 } };
    NumberOfEventsWrapper.find('.number-of-events').simulate('change', eventObject);
    expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(16);
  });

  test('change state when number input too high', () => {
    NumberOfEventsWrapper.setState({
      numberOfEvents: 32
    });
    const eventObject = { target: { value: 50 } };
    NumberOfEventsWrapper.find('.number-of-events').simulate('change', eventObject);
    expect(NumberOfEventsWrapper.state('warningText')).toBe('Please choose a number between 1 and 32');
  });

});