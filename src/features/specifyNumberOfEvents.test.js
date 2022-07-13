import { loadFeature, defineFeature } from "jest-cucumber";
import React from "react";
import { mount } from "enzyme";
import NumberOfEvents from "../NumberOfEvents";
import App from "../App";

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, (test) => {
  let AppWrapper;

  /* Scenario 1: No Number is specified */
  test('No Number is specified', ({ given, when, then }) => {
    given('the no number of events to be shown has been specified', async () => {
      AppWrapper = await mount(<App />);
    });

    when('the user starts a search', () => {
      AppWrapper.update();
    });

    then('the default amount of events will be listed', (arg0) => {
      expect(AppWrapper.find('.event')).toHaveLength(2);
    });
  });

  /* Scenario 2: User has specified event count preference */
  test('User has specified event count preference', ({ given, when, then }) => {
    given('the event list is loaded', async () => {
      AppWrapper = await mount(<App />);
    });

    when('the user specifies a number of events shown', () => {
      const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents)
      NumberOfEventsWrapper.find('#number-input').simulate('change', { target: { value: 1 } });
    });

    then('the list of events will be as long as the user specified (or less, if less events are available)', () => {
      const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents)
      NumberOfEventsWrapper.find('#number-input').simulate('change', { target: { value: 1 } });
      expect(AppWrapper.state('numberOfEvents')).toEqual(1)
    });
  });

});