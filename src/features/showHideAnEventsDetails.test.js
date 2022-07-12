import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount } from 'enzyme';
import App from '../App';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
  let AppWrapper;
  /* Scenario: Collapsed by Default */
  test('Collapsed by Default', ({ given, when, then }) => {
    given('the event list is loaded', () => {
      AppWrapper = mount(<App />);
    });

    when('the user hasn’t clicked anything yet', () => {

    });

    then('the event will be collapsed', () => {
      expect(AppWrapper.find('description')).toHaveLength(0);
    });
  });

  /* Scenario: Expanding the details */
  test('Expanding the details', ({ given, when, then }) => {
    given('the event element is collapsed', async () => {
      AppWrapper = await mount(<App />);
    });

    when('the user clicks an event', () => {
      AppWrapper.update();
      AppWrapper.find('.details-btn').at(0).simulate('click');
    });

    then('the event will expand, revealing further info', () => {
      expect(AppWrapper.find('.description.card-text')).toHaveLength(1);
    });
  });

  /* Scenario: Collapse the details */
  test('Collapse the details', ({ given, when, then }) => {
    given('the event element is expanded', async () => {
      AppWrapper = await mount(<App />);
      AppWrapper.update();
      AppWrapper.find('.details-btn').at(0).simulate('click');
      expect(AppWrapper.find('.description.card-text')).toHaveLength(1);
    });

    when('the user again clicks the event', () => {
      AppWrapper.find('.details-btn').at(0).simulate('click');
    });

    then('the event will collapse again, hiding further info on the event', () => {
      expect(AppWrapper.find('.description.card-text')).toHaveLength(0);
    });
  });

});